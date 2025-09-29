const Profile = require("../models/Profile");
const CourseProgress = require("../models/CourseProgress");
const RatingAndReview = require("../models/RatingAndRaview");

const Course = require("../models/Course");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const mongoose = require("mongoose");
const { convertSecondsToDuration } = require("../utils/secToDuration");

// Method for updating a profile
exports.updateProfile = async (req, res) => {
  try {
    // get data
    const {
      firstName,
      lastName,
      dateOfBirth = "",
      about = "",
      contactNumber,
      gender,
    } = req.body;

    // get user ID
    const id = req.user.id;

    // validation
    if(!contactNumber || !gender || !id){
      return res.status(400).json({
        success:false,
        message:"All fields are required",
      });
    }

    // Find the profile by id
    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    if (!profileDetails) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Update user
    userDetails.firstName = firstName;
    userDetails.lastName = lastName;

    // Update the profile fields
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;

    // Save the updated profile
    await profileDetails.save();
    await userDetails.save();

    // Find the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });

  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Server error while updating profile",
      error: error.message,
    });
  }
}


exports.deleteAccount = async (req, res) => {
  try {
    // get id
    const id = req.user.id;
    console.log(id);

    // validation
    const userDetails = await User.findById({ _id: id });
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete Assosiated Profile with the User and unenroll from course
    await Profile.findByIdAndDelete({
      _id: userDetails.additionalDetails,
    });


    for (const courseId of userDetails.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnroled: id } },
        { new: true }
      )
      // delete rating and review if that user
      const review = await RatingAndReview.findOne({
        course: courseId,
        user: id,
      });
      if(review){
          await Course.findByIdAndUpdate(courseId, {
            $pull: { ratingAndReviews: review._id },
          });

          await RatingAndReview.findByIdAndDelete(review._id);
      }
      // delete course progress 
      const progress = await CourseProgress.findOne({
        courseID: courseId,
        userId: id,
      });

      if(progress){
        await CourseProgress.findByIdAndDelete(progress._id);
      }

    }

    // Now Delete User
    await User.findByIdAndDelete({ _id: id });

    // return response
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

    // await CourseProgress.deleteMany({ userId: id });

  } 
  catch (error) {
    console.log(error)
    return res.status(500).json({ 
      success: false, 
      message: "User Cannot be deleted successfully" 
    });
  }
}


exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    console.log(userDetails);

    return res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });

  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    if(!displayPicture || !userId){
      return res.status(404).json({
        success:false,
        message:"Could not fetch files or userId properly"
      })
    }
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    // console.log("IMAGE URL",image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    ).populate("additionalDetails").exec();
    
    return res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


exports.getEnrolledCourses = async (req, res) => {
  try {
    console.log("INSIDE GET ENROLLED COURSES");
    const userId = req.user.id;
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    
    userDetails = userDetails.toObject();

    var SubsectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      })
      courseProgressCount = courseProgressCount?.completedVideos.length
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } 
      else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats;
    })

    return res.status(200).json({ 
      success:true,
      courses: courseData 
    });

  } catch (error) {
    console.error(error)
    return res.status(500).json({ 
      success:false,
      message: "Server Error" 
    });
  }
}
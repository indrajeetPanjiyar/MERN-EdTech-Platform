const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
	try {
		// get email from request body
		const email = req.body.email;

		// check user for this mail
		const user = await User.findOne({ email: email });

		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}

		// generate token
		const token = crypto.randomBytes(20).toString("hex");
		// const token = crypto.randomUUID;

		// update user by adding token and expiration time
		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 3600000,
			},
			{ new: true }
		);
		console.log("DETAILS", updatedDetails);

		// Create url
		const url = `http://localhost:3000/update-password/${token}`;

		// send mail containing the url
		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		// return response
		return res.json({
			success: true,
			message:
				"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} 
	catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}
};

// reset password
exports.resetPassword = async (req, res) => {
	try {
		// fetch data from request body
		const { password, confirmPassword, token } = req.body;

		// validation
		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}

		// get user details using token
		const userDetails = await User.findOne({ token: token });

		// if no user -> invalid token
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}

		// token timout check
		if (userDetails.resetPasswordExpires < Date.now()) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}

		//  hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// update password
		await User.findOneAndUpdate(
			{ token: token },
			{ password: hashedPassword },
			{ new: true }
		);
		
		// return response
		return res.status(200).json({
			success: true,
			message: `Password Reset Successful`,
		});
	} 
	catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};
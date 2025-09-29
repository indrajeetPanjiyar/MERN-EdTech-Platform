const { contactUsEmail } = require("../mail/templates/contactFormRes");
const mailSender = require("../utils/mailSender");

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } = req.body;
  console.log(req.body);
  try {
    const querryMail = await mailSender(
      "indrajeetkr825@gmail.com",
      `${firstname} ${lastname} have some querry, resolve it soon`,
      `<h1>Querry from user ${firstname} ${lastname}</h1> <br/> <p>${message}</p>`,
    )

    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode),
    )

    console.log("Email Res ", emailRes);

    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } 
  catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}
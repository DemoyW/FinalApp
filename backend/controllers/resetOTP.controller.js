import ResetOTP from '../models/resetOTP.model.js'; 
import dotenv from "dotenv";
import nodeMailer from "nodemailer";

dotenv.config();


export const createResetOTP = async (req, res) => {
    const { email, otp } = req.body; 

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Please provide email and OTP" });
    }

    try {

        await ResetOTP.deleteMany({ email }); // Delete any existing OTP for the email

        const newResetOTP = new ResetOTP({ email, otp });
        await newResetOTP.save();
        res.status(201).json({ success: true, data: newResetOTP });
    } catch (error) {
        console.error("Error in creating reset OTP", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const verifyResetOTP = async (req, res) => {
    const { email, otp } = req.body; 

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Please provide email and OTP" });
    }

    try {
        const resetOTP = await ResetOTP.findOne({ email, otp });

        if (!resetOTP) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        res.status(200).json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error in verifying reset OTP", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const recoverPasswrod = async (req, res) => {
    const { email, otp } = req.body;


    const html = `
    <h1>Reset Password</h1>
    <p>${otp}</p>
    <p>Use the code below to reset your password</p>
    <p>The code will only be valid for 5 minutes</p>
    `

    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    transporter.sendMail({  
        to: email,
        subject: 'Password Recovery',
        html: html
    }).then(() => {
        console.log("Email sent successfully")
        res.status(200).json({ success: true, message: "Email sent successfully" });
    }).catch((error) => {
        console.log("Error sending email", error)
        res.status(500).json({ success: false, message: "Error sending email" });
    })

}
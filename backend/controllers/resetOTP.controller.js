import ResetOTP from '../models/resetOTP.model.js'; 

export const createResetOTP = async (req, res) => {
    const { email, otp } = req.body; 

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Please provide email and OTP" });
    }

    try {
        const newResetOTP = new ResetOTP({ email, otp });
        await newResetOTP.save();
        res.status(201).json({ success: true, data: newResetOTP });
    } catch (error) {
        console.error("Error in creating reset OTP", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
import { create } from "zustand";

export const useOTPStore = create((set) => ({
    otp: null,
    setOTP: (otp) => set({ otp }),
    
    
   createOTP: async (email, otp) => {
        if (!email) {
            return { success: false, message: "Please provide an email" };
        }
        else if (!otp) {
            return { success: false, message: "Failed to create otp" };
        }
        const res = await fetch("http://localhost:8000/api/resetOTP", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, otp: otp }),
        });
        const data = await res.json();
        console.log(data);
        return { success: true, message: data };
    }, 
    
    
    verifyOTP: async (email, otp) => {
        if (!otp) {
            return { success: false, message: "Please provide an OTP" };
        } 
        else if (!email) {
            return { success: false, message: "Failed to verify otp" };
        }
        const res = await fetch("http://localhost:8000/api/verifyResetOTP", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, otp: otp }),
        });
        const data = await res.json();
        console.log("api response", data);
        return { success: true, message: data };
    },

    sendEmail: async (email, otp) => {
        if (!otp) {
            return { success: false, message: "Please provide an OTP" };
        } 
        else if (!email) {
            return { success: false, message: "Failed to send email" };
        }
        const res = await fetch("http://localhost:8000/api/recoverPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, otp: otp }),
        });
        const data = await res.json();
        console.log(data);
        return { success: true, message: data };
    },
}));
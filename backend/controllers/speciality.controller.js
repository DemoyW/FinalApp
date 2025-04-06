 import Speciality from "../models/speciality.model.js";

 export const createSpeciality = async (req, res) => {
    const speciality = req.body;

    if(!speciality.name) {
        return res.status(400).json({ success: false, message: "Please provide a speciality name" });
    }

    const newSpeciality = new Speciality(speciality);

    try {
        await newSpeciality.save();
        res.status(201).json({ success: true, data: newSpeciality });
    } catch (error) {
        console.error("Error in create speciality", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getSpecialities = async (req, res) => {
    try {
        const specialities = await Speciality.find({});

        res.status(200).json({ success: true, data: specialities });
    } catch (error) {
        console.error("Error in fetching specialities", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    } 
}
import mongoose from "mongoose";

const specialitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true 
    }, 
    description : {
        type: String,
        trim: true
    },
});

const Speciality = mongoose.model("Speciality", specialitySchema);

export default Speciality;


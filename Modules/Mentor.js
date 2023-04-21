import mongoose from "mongoose";

const mentorSchema = mongoose.Schema(
    {
        MentorName:{
            type:String,
            required:true,
            unique:true
        },
        MentorEmail:{
            type:String,
            required:true,
            unique:true
        },
        Students:{
            type:[]
        }
    }
)

export const Mentor = mongoose.model("Mentor",mentorSchema)
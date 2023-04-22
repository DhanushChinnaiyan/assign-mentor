import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
    {
        StudentName:{
            type:String,
            required:true,
            unique:true
        },
        StudentEmail:{
            type:String,
            required:true
        },
        CurrentMentor:{
            type:String
        },
        PreviousMentor:{
            type:String
        }
    }
)

export const Student = mongoose.model("Student",studentSchema)
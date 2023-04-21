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
        Mentor:{
            type:[]
        }
    }
)

export const Student = mongoose.model("Student",studentSchema)
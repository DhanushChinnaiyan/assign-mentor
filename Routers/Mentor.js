import express from "express";
import { Mentor } from "../Modules/Mentor.js";
import { Student } from "../Modules/Student.js";

const router = express.Router();

// get all mentors
router.get("/", async (request, response) => {
  try {
    const mentors = await Mentor.find();
    if (mentors.length === 0) {
      return response.status(400).json({ message: "Mentors Not Available" });
    }
    response.json(mentors);
  } catch (error) {
    console.log("Internal Server Error ", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

// QN:1-Write API to create Mentor

router.post("/add", async (request, response) => {
  try {
    const mentorNameChecking = await Mentor.find({
      MentorName: request.body.MentorName,
    });
    const mentorEmailChecking = await Mentor.find({
      MentorEmail: request.body.MentorEmail,
    });

    if (mentorEmailChecking.length !== 0 || mentorNameChecking.length !== 0) {
      return response
        .status(400)
        .json({ message: "Already Mentor Nmae Or Email Exist" });
    }
    const mentor = await new Mentor({
      MentorName: request.body.MentorName,
      MentorEmail: request.body.MentorEmail,
    }).save();

    response.status(200).json(mentor);
  } catch (error) {
    console.log("Internal Server Error ", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

// QN:3-Write API to Assign a student to Mentor

// QN:3(i)-Select one mentor and Add multiple Student

router.put("/assignstudents/:id", async (request, response) => {
  try {
    const students = [];

    request.body.Students.map((studentsName) => {
      students.push(studentsName);
    });
 
    await Mentor.updateMany(
      {Students:{$in:students}},
      {$set:{
        Students:[]
      }},
      {new:true}

    )

    const assignStudents = await Mentor.findByIdAndUpdate(
      { _id: request.params.id },
      {
        $set: {
          Students: request.body.Students,
        },
      },
      { new: true }
    );
    
    const mentorname = await Mentor.findById(request.params.id);

    

   const previousMentor = await Student.find({StudentName:{$in:students}})
 
    const assignMentor = await Student.updateMany(
      { StudentName: { $in: students }
    },
      {
        $set: {
          CurrentMentor: mentorname.MentorName,
          PreviousMentor:previousMentor[0].CurrentMentor
        }
      },
      { new: true }
    );
    if (!assignStudents) {
      return response.status(400).json({ message: "Error assigning students" });
    }
    if (!assignMentor) {
      return response.status(400).json({ message: "Error assigning mentor" });
    }

    response.status(200).json({ message: "Students Successfully Assigned" });
  } catch (error) {
    console.log("Internal Server Error ", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});

export const mentorRouter = router;

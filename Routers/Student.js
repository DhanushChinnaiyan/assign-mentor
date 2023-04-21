import express from 'express'
import { Student } from '../Modules/Student.js'
import { Mentor } from '../Modules/Mentor.js'

const router = express.Router()

// QN:5-show all students for a particular mentor
router.get("/:id",async(request,response)=>{
    try {
        const mentor = await Mentor.findById({_id:request.params.id})
        if(!mentor){
            return response.status(400).json({message:"You Are Not A Mentor"})
        }
        const students = await Student.find()
        if(students.length===0){

            return response.status(400).json({message:"students Not Available"})
        }
        response.status(200).json(students)
    } catch (error) {
        console.log("Internal Server Error ",error)
    response.status(500).json({message:"Internal Server Error"})
    }
})


// QN:2-Write API to create Student

router.post("/add",async(request,response)=>{
   try {
    const StudentNameChecking =await Student.find({StudentName:request.body.StudentName})
    const StudentEmailChecking =await Student.find({StudentEmail:request.body.StudentEmail})
    
    if(StudentEmailChecking.length !== 0 || StudentNameChecking.length !== 0){
        return response.status(400).json({message:"Already Student Name Or Email Exist"})
    }
    const student = await new Student(
        {
            StudentName:request.body.StudentName,
            StudentEmail:request.body.StudentEmail,

        }
    ).save()

    response.status(200).json(student)
    
   } catch (error) {
    console.log("Internal Server Error ",error)
    response.status(500).json({message:"Internal Server Error"})
   }
    
   
})

// QN:3(ii)-A student who has a mentor should not be shown in list
router.get("/list/mentorunassigned",async(request,response)=>{
    try {
        const students = await Student.find()

        const lists = []
        students.map((list)=>{
            if(list.Mentor.length===0){
                lists.push(list)
            }
        })
        if(students.length===0){

            return response.status(400).json({message:"students Not Available"})
        }
        response.status(200).json({UnAssignedList:lists})
    } catch (error) {
        console.log("Internal Server Error ",error)
    response.status(500).json({message:"Internal Server Error"})
    }
})

// QN:4-Select One Student and Assign One mentor
router.put("/assignmentor/:id", async (request, response) => {
    try {
      const assignMentor = await Student.findByIdAndUpdate(
        { _id: request.params.id },
        {
          $set: {
            Mentor: request.body.Mentor,
          },
        },
        { new: true }
      );
 
      if (!assignMentor) {
        return response.status(400).json({ message: "Error assigning mentor" });
      }
  
      response.status(200).json({ message: "Mentor Successfully Assigned" });
    } catch (error) {
      console.log("Internal Server Error ", error);
      response.status(500).json({ message: "Internal Server Error" });
    }
  });

//  QN:6-Write an API to show the previously assigned mentor for a particular student.
router.get("/previouschanges/:id",async(request,response)=>{
    try {
        const students = await Student.findById({_id:request.params.id})
        if(students.length===0){

            return response.status(400).json({message:"students Not Available"})
        }
        response.status(200).json(students)
    } catch (error) {
        console.log("Internal Server Error ",error)
    response.status(500).json({message:"Internal Server Error"})
    }
})

export const studentsRouter = router
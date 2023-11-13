import { NextFunction,Request,Response } from "express";
import Course from "../models/Course.js"
import {hash,compare} from "bcrypt";

export const getAllCourses = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query = req.query.query as string; // Explicitly cast to string
      let courses;
  
      if (query) {
        // If there's a search query, perform a case-insensitive search
        courses = await Course.find({
          $or: [
            { name: { $regex: new RegExp(query, 'i') } },
            { instructor: { $regex: new RegExp(query, 'i') } },
          ],
        });
      } else {
        // If no query, get all courses
        courses = await Course.find();
      }
  
      return res.status(200).json({ message: "OK", courses });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "ERROR", cause: error.message });
    }
  };

//add course
export const addCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      instructor,
      description,
      thumbnail,
      duration,
      schedule,
      location,
      prerequisites,
      syllabus,
    } = req.body;

    // You may want to validate the incoming data here

    const newCourse = new Course({
      name,
      instructor,
      description,
      thumbnail,
      duration,
      schedule,
      location,
      prerequisites,
      syllabus,
      students: [], // Leave students empty for a new course
    });

    await newCourse.save();

    return res
      .status(200)
      .json({ message: "OK", id: newCourse._id.toString() });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "ERROR", cause: error.message });
  }
};


//student to course

// export const loginSignup=async(
//     req:Request,
//     res:Response,
//     next:NextFunction
// )=>{
//     try{
//         const {email,password}=req.body;
//         const user=await User.findOne({email});
//         if(!user){
//             return res.status(401).send("User not registered");
//         }
//         const isPasswordCorrect=await compare(password,user.password);
//         if(!isPasswordCorrect){
//             return res.status(403).send("Incorrect Password");
//         }
//         return res.status(200).json({message:"OK",id:user._id.toString()});
//     }catch(error){
//         console.log(error);
//         return res.status(200).json({message:"ERROR",cause:error.message});
//     }
// };
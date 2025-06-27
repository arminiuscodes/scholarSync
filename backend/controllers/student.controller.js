import Student from "../models/student.model.js";
import mongoose from "mongoose";


export const createStudent =async(req,res)=>{
    const student = req.body;
    if(!student.name||!student.email||!student.enroll_no){
        return res.status(400).json({success:false,message:"Please provide all the fields!"})
    }
    const newStudent = new Student(student);
    try {
        await newStudent.save();
        res.status(200).json({success:true,data:newStudent});
    } catch (error) {
        console.error(`Error:${error.message}`)
        res.status(500).json({success:false,message:"Server error!"})
    }
}
export const getStudent = async(req,res)=>{
    try {
        const students =await Student.find({});
        res.status(200).json({success:true,data:students})
    } catch (error) {
        res.status(500).json({success:false,message:"server error"})
    }
}

export const deleteStudent = async (req,res)=>{
    const{id}=req.params;
    try {
        await Student.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"student deleted successfully"});
    } catch (error) {
        console.error("Error in deleting the student")
        res.status(500).json({success:false,message:"server error"})
    }
}
export const updateStudent = async (req,res)=>{
    const{id}= req.params;
    const student =req.body;
    try {
      const updatedStudent= await Student.findByIdAndUpdate(id,student,{new:true});
      res.status(200).json({success:true,data:updateStudent,message:"Student data updated successfully!"})
    } catch (error) {
        console.error("Error in updating student information ");
        res.status(500).json({success:false,message:"server error"})
    }
}
import express from 'express'
import { createStudent,getStudent,deleteStudent,updateStudent } from '../controllers/student.controller.js';


const router =express.Router();

router.post("/",createStudent);
router.get("/",getStudent);
router.delete("/:id",deleteStudent);
router.put("/:id",updateStudent);

export default router;


import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js';
import studentRoutes from "./routes/student.routes.js"
import authRoutes from "./routes/auth.routes.js"
import cors from 'cors';
import path from 'path'

dotenv.config();
const __dirname = path.resolve()
const app =express();
const PORT = process.env.PORT ||5000;
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/students",studentRoutes);
app.use("/api/auth",authRoutes);
if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("/*splat",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}

app.listen(PORT,(req,res)=>{
    try {
        console.log("server is running at port :5000")
    } catch (error) {
        console.error(`Error:${error.message}`)
    }
})




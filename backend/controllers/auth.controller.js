import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'


export const signupUser = async (req,res)=>{
    const{name,email,password}=req.body// getting name , password and email from the user --step 01
    try {
        // checking if the user already exists -- step 02
        const existingUser = await User.findOne({email});
        if(existingUser){
           return res.status(400).json({success:false,message:"User already exists"})
        }
        // hashing the password -- step 03
        const hashedPass = await bcrypt.hash(password,10); // 10 salt rounds
        // generating a 6 digit otp -- step 04
        const otp =Math.floor(100000 + Math.random()*999999).toString(); // 6 Digit otp ~ math.random()~ toString()~convert  into  string
        // setting otp expiry time -- step 05
        const otpExpiresAt = new Date(Date.now()+10*60*1000);
        // saving the new user -- step 06
        const newUser = new User({
            name,
            password:hashedPass,
            email,
            otp,
            otpExpiresAt,
            isVerified:false

        });
        await newUser.save();
        //sending otp to the user using nodemailer --step 07
        const transporter =nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }

        });
        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to:email,
            subject:"Your otp for Email verification !",
            text:`Hello ${name}\n\n your otp for the verification is ${otp}\n\n This otp will expire in 10 minutes.\n\n Thank you !`

        });
        //return the success response --step 08
        res.status(200).json({success:true,message:"OTP is sent to your email!"})
    } catch (error) {
        console.error("Error in signup",error.message);
        res.status(500).json({success:false,message:"server error !"})
    }
};
export const verifyOtp = async (req,res)=>{
    const{email,otp}=req.body;//step 01 {getting the email and otp from the user }
    try {
        // step 02 {finding the user by the email}
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        // step 03 {checking if user is already verified or not ?}
        if(user.isVerified){
            return res.status(400).json({success:false,message:"user is already verified !"})
        }
        // step 04 {checking otp is correct or not }
        if(user.otp!==otp){
            return res.status(400).json({success:false,message:"Invalid OTP"})
        }
        // step 05{checking the expiry time of otp}
        if(user.otpExpiresAt <new Date()){
            return res.status(400).json({success:false,message:"otp is expired"})
        }

        // step 06 {verifying the user and saving it }
        user.isVerified =true;
        user.otp = undefined;
        user.otpExpiresAt =undefined;

        await user.save();
        res.status(200).json({success:true,message:"User is verified"})
    } catch (error) {
        console.error("OTP verification error",error.message)
        res.status(500).json({success:false,message:"Server Error!"})
    }
};
export const login = async(req,res)=>{
    const{email,password}=req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        if(!user.isVerified){
            return res.status(400).json({success:false,message:"User is not verified!"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({success:false,message:"Incorrect Password"})
        }
        const token =jwt.sign({
         userId:user._id,email:user.email   
        },process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||'1d'});

        res.status(200).json({
            success:true,
            message:"Login Successful!",
            token,
            user:{
                id:user._id,
                email:user.email,
                name:user.name

            }
        });

    } catch (error) {
        console.error("Login error",error.message);
        res.status(500).json({success:false,message:"Server error"});
    }
};
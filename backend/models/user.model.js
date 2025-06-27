import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    otp:{
        type:String,
        required:false
    },
    otpExpiresAt:{
        type:Date,
        required:false
    },
    isVerified:{
        type:Boolean,
        default:false,
        required:false
    },
    



},{
    timestamps:true
});

const User =mongoose.model("User",userSchema);
export default User;
import mongoose from "mongoose";


const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    enroll_no:{
        type:Number,
        required:true
    },
    
},{
    timestamps:true
}
);

const Student =mongoose.model("Student",studentSchema);
export default Student;
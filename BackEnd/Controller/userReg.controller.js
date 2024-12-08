import User from "../Models/User.model.js";
import bcrypt from "bcrypt";


export const userReg=async(req,res)=>{
  
    try{
        //generate new password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);

        //create new user
        const newUser=new User({
          username:req.body.username,
          email:req.body.email,
          password:hashedPassword,
        })
        //save user and send response 
        const user=await newUser.save();
        res.status(200).json(user._id)
    }catch(e){

        res.status(500).json(e);
    }
}

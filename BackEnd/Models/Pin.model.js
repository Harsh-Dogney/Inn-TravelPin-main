import mongoose from "mongoose";

const pinSchema =new mongoose.Schema({
username:{
    type:String,
    required:true,
    min:3
},
title:{
    type:String,
    required:true,
    min:3
},
desc:{
    type:String,
    required:true,
    min:3
},
rating:{
    type:Number,
    required:true,
    min:0,
    max:5
},
latitude:{
    type:Number,
    required:true,
},
longitude:{
    type:Number,
    required:true,
}

},{timestamps:true})

const Pin=new mongoose.model('Pin',pinSchema)
export default Pin;
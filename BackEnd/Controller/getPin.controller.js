import Pin from "../Models/Pin.model.js";

export const getPinCon=async(req,res)=>{
try{
const pins= await Pin.find();
res.status(200).json(pins);
}catch(err){
res.json(500).json(err);
}
}
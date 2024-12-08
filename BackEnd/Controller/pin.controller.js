import Pin from "../Models/Pin.model.js";

export const pinCon=async(req,res)=>{
    const newPin=new Pin(req.body);
    try{
        const savedPin=await newPin.save();
        res.status(200).json(savedPin);
    }catch(e){
        res.status(500).json(e);
    }
}
import express from 'express';
import { pinCon } from '../Controller/pin.controller.js';
import {getPinCon} from '../Controller/getPin.controller.js';

const router=express.Router();
//Create a Pin
router.post('/postPin',pinCon);

//Get all pins 
router.get('/getPin',getPinCon);

export default router;

import express from 'express';
import { userReg } from '../Controller/userReg.controller.js';  // User registration controller
import { userLogin } from '../Controller/userLogin.controller.js';


const router = express.Router();

// Register a user
router.post("/register", userReg);

// Login a user
router.post("/login", userLogin)

export default router;

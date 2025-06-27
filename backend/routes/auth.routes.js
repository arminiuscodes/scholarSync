import express from 'express'
import { signupUser ,verifyOtp,login} from '../controllers/auth.controller.js'

const router =express.Router();
router.post("/signup",signupUser);
router.post("/verify",verifyOtp);
router.post("/login",login);
export default router;
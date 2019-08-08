import express from "express";


import user from "../controllers/UsersControllers";
const router = express.Router();


router.post("/signup",user.signupUser);
router.post("/signin",user.signinUser);

export default router;




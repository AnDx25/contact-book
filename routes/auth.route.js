const express=require('express');
const {signUp,signIn, signOut}=require('../controllers/auth.controller')
const {userById}=require('../controllers/user.controller')
const {userSignupValidator}=require('../validators/index')
const router=express.Router();

router.post("/sign-up",userSignupValidator,signUp);

router.post("/sign-in",signIn);

router.get("/sign-out",signOut)
//any route containing :userId our app will first execute userById()
router.param("userId",userById)
module.exports=router;
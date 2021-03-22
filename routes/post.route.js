const express=require('express');
const router=express.Router();
const {userById}=require('../controllers/user.controller')
const {createPostValidator}=require('../validators/index')
const { body, validationResult } = require("express-validator");
const {requireSignIn}=require('../controllers/auth.controller')

const {getPosts,createPost}=require('../controllers/post.controller')
router.get('/',getPosts);
router.post('/post',requireSignIn,createPostValidator,createPost);

//any route containing :userId our app will first execute userById()
router.param("userId",userById)
module.exports=router;
// body("title","Write a title").notEmpty(),
// body("title","Title must be between 4 to 150 Characters").isLength({
//     min:4,
//     max:150 
// }),

// body("body","Write into body").notEmpty(),
// body("body","Body must be between 4 to 2000 characters").isLength({
//     min:4,
//     max:2000
// }),
// (req,res,next)=>{
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//        // console.log("Post is invalid",errors)
//         return res.status(400).json({error:errors})
//     }
// }
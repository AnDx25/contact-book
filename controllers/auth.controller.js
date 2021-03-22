const User=require('../models/user.model')
//this particular jwt will be return token to user combined with user id which will be used inorder to persists the session once login
const jwt=require('jsonwebtoken')
/**
 * this will be used inorder to protect all routes present in the application
 */

const expressJwt=require('express-jwt')

require('dotenv').config()

exports.signUp=async (req,res,next)=>{
    const {name,email,password}=req.body;
    const userExists=await User.findOne({email:email})
    if(userExists) return res.status(403).json({
        error:"Email is taken"
    })
    //creating new user
    const user= await new User(req.body)
    await user.save()
    res.status(200).json({message:"SignUp successfull please login..."})
}

exports.signIn=(req,res,next)=>{
    //find the user

    //if error or no user

    //If user, authenticate

    //generate a token with user id and secret

    //persists the token as t in cookie with expiry date

    //return response with user and token to frontend client

    const {email,password}=req.body;
    User.findOne({email},(err,user)=>{
        //If no user
        if(err||!user){
            return res.status(401).json({
                error:"User with that email does not exists. Please sign in."
            })

        }
        //If user found then make sure email and password match

        //using authenticate method in User model

        if(!user.authenticate(password))
        {
            return res.status(401).json({
                error:"Email and password do not match"
            })
        }

        //generate a token with user id and secret
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
        //persist the token as TOKEN in cookie with expiry date
        res.cookie("TOKEN",token,{expire:new Date()+999})
        //return response with user and token to frontend client
        const {_id,name,email}=user
        return res.json({token,user:{_id,email,name}})
    })
}

exports.signOut=(req,res,next)=>{
    res.clearCookie("TOKEN")
    return res.json({message:"SignOut Successfull"})
}
/**
 * Since once the user gets logged in it will be having a token combined with
 * its user id and everytime when we are hitting any route it will check if
 * that particular token have same jwt secret or not
 */
exports.requireSignIn=expressJwt({
    secret:process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty:"auth"
})
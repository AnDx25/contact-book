const express=require("express");
const router=express.Router();
const {userById}=require('../controllers/user.controller')

const {addContact, getContact, updateContact,updateSpecificContact,deleteContact} =require('../controllers/contact.controller')
const {requireSignIn}=require('../controllers/auth.controller')
console.log("In contact")
//Using requireSignIn as middleware to protect routes by taking JWT secret and comparing
router.get('/',requireSignIn,getContact)
router.post('/add-contact',requireSignIn,addContact)
router.put('/update-contact/:contactId',requireSignIn,updateContact)
router.delete('/delete-contact/:contactId',requireSignIn,deleteContact)
//any route containing :userId our app will first execute userById()
// router.param("/:contactId",)
module.exports=router
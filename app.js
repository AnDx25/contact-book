const express=require("express")
const app=express()
const dotenv=require("dotenv")
const cors=require('cors')
dotenv.config()
const mongoose=require("mongoose")
const morgan =require("morgan")
const bodyParser=require('body-parser')
const expressValidator=require('express-validator')

const post=require('./routes/post.route')
const auth =require('./routes/auth.route')
const contact=require('./routes/contact.route')
//Connecting to DB
console.log()
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>console.log("DB Connected"))
.catch((err)=>{
    console.log(`DB connection error : ${err.message}`)
})

//Middleware
//Body Parser for Postman
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(cors())
// app.use(expressValidator());

//app.use('/',post)
app.use("/",auth)
app.use("/contact",contact)
//For unauthorized User
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error:"Unauthorized User"});
    }
  });
const port=8080
app.listen(port,()=>{
    console.log(`Server is running at Port ${port}`)
})
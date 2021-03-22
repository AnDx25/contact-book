const {mongoose,Schema,model}=require('mongoose');

const contactSchema=new Schema({
    name:{
        type:String,
        trim: true,
        required: true
    },
    email:{
        type:String,
        trim: true,
        required: true,
        unique:true,
        lowercase:true
    },
    phoneNumber:{
        type:String,
        trim:true,
        required:true,
        unique:true
    }
})

module.exports=model("Contact",contactSchema);
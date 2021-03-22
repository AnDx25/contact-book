const Contact=require('../models/contact.model')
console.log('In contact controller')
exports.addContact=(req,res)=>{
    const {name,email,phoneNumber}=req.body;
    Contact.findOne({email},(err,contact)=>{
        if(err||contact)
        {
            return res.status(403).json({
                error:"Contact already there"
            })
        }
        const contactObj=new Contact(req.body)
         contactObj.save()
        .then((result,err)=>{
            if(err)
            {
                return res.status(400).json({error:err})
            }
            return res.status(200).json({message:"Contact Saved Successfully"})
        })
        
    })
  
   
}
exports.contactById=(req,res,next,id)=>{
    User.findById(id).exec((err,contact)=>{
        if(err||!contact)
        {
            return res.status(400).json({
                error:"User not found"
            })
        }
        req.profile=contact
        next()
    })
}

exports.getContact=(req,res)=>{
    Contact.find({},(err,contact)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        return res.status(200).json({message:contact})
    })
}

exports.updateSpecificContact=(req,res)=>{
    try{
        //console.log("id:",req.params.contactId)
      Contact.findByIdAndUpdate(req.params.contactId,req.body,{new:true}).exec((err,res)=>{
        if(err){
            return res.status(403).json({err})
        }
        return res.status(200).json({message:"updated"})
      })
        
    }catch(error){
       
        next(error)
    }   
}

exports.updateContact=(req,res)=>{
    const _id=req.params.contactId
    console.log(_id)
    const {name,email,phoneNumber}=req.body;
    Contact.findByIdAndUpdate(_id,{email,name,phoneNumber},{new:true})
    .then((contact)=>{
        if(!contact)
        {
            return res.status(404).json({
                error:"Contact Not found"
            })
        }
        return res.status(200).json({
            message:contact
        })
    })
}

exports.deleteContact=(req,res)=>{
    const _id=req.params.contactId;
    Contact.deleteOne({_id:_id})
    .then(response=>{
        return res.json({
            message:response
        })
    })
   
}
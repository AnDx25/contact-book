const {mongoose,Schema,model}=require('mongoose');
const crypto=require('crypto')
const userSchema=new Schema({
    name:{
        type:String,
        trim: true,
        required: true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    hashed_password:{
        type:String,
        required:true,
    },
    salt:String,
    created:{
        type:Date,
        default:Date.now
    },
    updated:Date
})


/***
 * Virtual fields are additional fields for a given model
 * Their values can be set manually or automatically with defined functionality
 * Keep in mind : Virtual properties(passowrd) dont get persisted in the database
 * They only exist logically and are not written to the documents collection.
 * 
 */
userSchema.methods={
    makeSalt:function(){
        return Math.round(new Date().valueOf()*Math.random()+" ");
    },
    encryptPassword:function(password){
        if(!password) return "";
        try{
            return crypto
                    .createHmac("sha1",this.salt)
                    .update(password)
                    .digest("hex");
        }catch(err){
            return err;
        }
    },
    authenticate:function(password){
        return this.encryptPassword(password)===this.hashed_password;
    }
}

userSchema.virtual("password")
.set(function(passowrd){
    //create temporary variable called _password
    this._password=passowrd;

    this.salt=this.makeSalt();
    //encrypt password
    this.hashed_password=this.encryptPassword(passowrd);

})
.get(function(){
    return this._password;
})
 
module.exports=model("User",userSchema);
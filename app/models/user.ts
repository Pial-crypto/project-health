import { timeStamp } from "console";
import { Schema } from "mongoose";

const UserSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:["admin","client","employee"]},
    timeStamp:{type:Date,default:Date.now,required:true}
    

})

export default UserSchema
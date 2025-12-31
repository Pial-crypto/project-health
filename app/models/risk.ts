import mongoose, { Schema, model, models } from "mongoose";

export const riskSchema = new Schema({
  title: { type: String, required: true },

  projectId:{type:String,required:true},
projectName:{type:String,required:true},
description:{type:String,required:false},
employeeEmail:{type:String,required:true}
,
severity:{type:String,required:true},
mitigationPlan:{type:String,required:true},
solved:{type:Boolean,require:true,default:false},
  timeStamp: { type: Date, default: Date.now }
});

//export const Project = models.Project || model("Project", projectSchema);

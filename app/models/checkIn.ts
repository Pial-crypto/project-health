import { timeStamp } from "console";
import { Schema } from "mongoose";


export const checkInSchema=new Schema({
  projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    employeeEmail: {
      type: String,
 
    },
    projectName:{
            type: String,
    //  ref: "Project".,
      required: true,
    },
    clientEmail:{
 type:String,
 //ref:"User",
 required:true
    },

    progressSummary: {
      type: String,
      required: true,
      trim: true,

    },
    blockers: {
      type: String,
      default: "",
      trim: true,
      maxlength: 300,
    },
    completionPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },
    confidenceLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 3,
    },
    week:{
        type:String,
        require:true
    },

  timeStamp: { type: Date, default: Date.now }
})
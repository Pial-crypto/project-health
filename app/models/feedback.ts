import { Schema, model, models } from "mongoose";

export const feedbackSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    comment: { type: String,  },
    flaggedIssue: { type: Boolean, default: false },
    issueDescription:{type:String},
    satisfactionRating: { type: Number, required: true },
    communicationClarity: { type: Number, required: true },
    clientId:{type:Schema.Types.ObjectId,ref:"User",required:true},


  timeStamp: { type: Date, default: Date.now }
});

//export const Project = models.Project || model("Project", projectSchema);

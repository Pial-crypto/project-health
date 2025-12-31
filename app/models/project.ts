import { Schema, model, models } from "mongoose";

export const projectSchema = new Schema({
  name: { type: String, required: true },

  adminId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  adminName: { type: String, required: true },
  description: { type: String, required: true },
  clientEmail: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  //employeeEmails: { type: [String], default: [] },
  employeeList: { type: [String], default: [] },

  timeStamp: { type: Date, default: Date.now }
});

//export const Project = models.Project || model("Project", projectSchema);

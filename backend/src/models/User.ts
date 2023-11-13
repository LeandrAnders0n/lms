import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    courses: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        status: {
          type: String,
          default: "Enrolled", // Set the default status as needed
        },
        progress: {
          type: Number,
          default: 0, // Set the initial progress as needed
        },
      },
    ],
  });
  
export default mongoose.model("User", userSchema);
  
  

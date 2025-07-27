import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect("mongodb://localhost/family");
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

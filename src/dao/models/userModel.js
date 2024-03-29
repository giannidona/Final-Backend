import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  surname: {
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
  role: {
    type: String,
    default: "default",
    enum: ["default", "premium", "admin"],
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  last_connection: {
    type: Date,
  },
});

const userModel = mongoose.model(userCollection, userSchema);
export { userModel };

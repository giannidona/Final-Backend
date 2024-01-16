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

userSchema.pre("save", function (next) {
  const now = new Date();
  this.last_connection = now;
  next();
});

const userModel = mongoose.model(userCollection, userSchema);
export { userModel };

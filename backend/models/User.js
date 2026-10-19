const mongoose = require("mongoose");

const isLocalUser = () => {
  return !this.googleId;
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true,
      required: isLocalUser,
    },
    name: { type: String },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /\S+@\S+\.\S+/,
    },
    password: {
      type: String,
      required: true,
      select: true,
      required: isLocalUser,
    },
    googleId: { type: String, unique: true, sparse: true },
    picture: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("User", userSchema);

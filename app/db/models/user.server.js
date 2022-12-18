import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "User";

const Schema = new mongoose.Schema(
  {
    /* profile */
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      match: [/^.+@(?:[\w-]+\.)+\w+$/, "Please fill a valid email address"],
      sparse: true,
    },
    name: { type: String, index: "text" },
    job: { type: String },
    urlOrigin: { type: String },
  },
  { timestamps: true }
);

Schema.methods.me = function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    job: this.job,
  };
};

const UserModel = dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);

if (process.env.NODE_ENV === "production") {
  Schema.index({ name: "text" });
  UserModel.syncIndexes();
} else {
  // global.__syncIndexes = global.__syncIndexes.filter((i) => i !== MODELNAME);
  if (!global.__syncIndexes.includes(MODELNAME)) {
    global.__syncIndexes.push(MODELNAME);
    Schema.index({ name: "text" });
    UserModel.syncIndexes();
  }
}

export default UserModel;

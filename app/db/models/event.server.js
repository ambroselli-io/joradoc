import mongoose from "mongoose";
import dbConnection from "../mongo.server";
const MODELNAME = "Event";

const Schema = new mongoose.Schema(
  {
    name: { type: String, index: "text" },
    categories: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  },
  { timestamps: true }
);

const EventModel =
  dbConnection.models[MODELNAME] || dbConnection.model(MODELNAME, Schema);
export default EventModel;

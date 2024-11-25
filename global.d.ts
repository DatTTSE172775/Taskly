/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

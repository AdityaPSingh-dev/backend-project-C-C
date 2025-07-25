// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
dotenv.config({ path: "./env" });
import { app } from "./app.js";

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (error) => {
//       console.log("ERR:", error);
//       throw error;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`Listening on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log(error);
//     throw err;
//   }
// })();
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("ERROR WHILE CONNECTING TO MONGO DB", err);
  });

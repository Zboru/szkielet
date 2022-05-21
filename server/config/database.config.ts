import mongoose from "mongoose";
const url = process.env.MONGO_DB_CONNECTION_STRING || "";
console.info(url);
const connect = mongoose.connect(url);
connect
  .then(db => {
    console.log("connected to db")
  })
  .catch(err => {
    console.log(err)
  })
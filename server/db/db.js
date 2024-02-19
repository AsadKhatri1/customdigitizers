const mongoose = require("mongoose");

const mongodb = async () => {
  await mongoose
    .connect(process.env.db_url)
    .then((res) => {
      //   console.log(res);
      console.log("db connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = mongodb;

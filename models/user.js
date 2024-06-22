const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const users = new mongoose.Schema(
  {
    // user_id: { type: Number, unique: true },
    username: { type: String },
    password: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    age: { type: Number },
    sex: { type: String },
  }
  // { _id: false }
);

users.plugin(autoIncrement, { inc_field: "user_id" });

module.exports = mongoose.model("users", users);

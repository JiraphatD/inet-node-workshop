const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const users = new mongoose.Schema({
  user_id: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  age: { type: Number },
  sex: { type: String },
});

// users.plugin(autoIncrement.plugin, {
//   model: "users",
//   field: "user_id",
//   startAt: 1, // Starting value for auto-increment
//   incrementBy: 1, // Increment by 1
// });

module.exports = mongoose.model("users", users);

const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const products = new mongoose.Schema({
  product_id: { type: String, unique: true },
  product_name: { type: String },
  detail: { type: String },
  price: { type: Number },
  amount: { type: Number },
});

// products.plugin(autoIncrement.plugin, {
//   model: "products",
//   field: "product_id",
//   startAt: 1, // Starting value for auto-increment
//   incrementBy: 1, // Increment by 1
// });

module.exports = mongoose.model("products", products);

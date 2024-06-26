const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const products = new mongoose.Schema({
  // product_id: { type: String, unique: true },
  product_name: { type: String },
  detail: { type: String },
  price: { type: Number },
  amount: { type: Number },
  // image: { type: String },
});

products.plugin(autoIncrement, { inc_field: "product_id" });

module.exports = mongoose.model("products", products);

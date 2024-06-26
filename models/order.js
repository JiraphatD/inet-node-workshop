const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const orderItemSchema = new mongoose.Schema({
  product_id: { type: String },
  product_name: { type: String },
  quantity: { type: Number },
  price: { type: Number },
});
const orders = new mongoose.Schema({
  // order_id: { type: String, unique: true },
  buyer: { type: String },
  order_list: [orderItemSchema],
  total_price: { type: Number },
});

orders.plugin(autoIncrement, { inc_field: "order_id" });

module.exports = mongoose.model("orders", orders);

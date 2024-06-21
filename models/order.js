const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const orderItemSchema = new mongoose.Schema({
  product_id: { type: String },
  product_name: { type: String },
  quantity: { type: Number },
});
const orders = new mongoose.Schema({
  order_id: { type: String, unique: true },
  buyer: { type: String },
  order_list: [orderItemSchema],
  total_price: { type: Number },
});

// orders.plugin(autoIncrement.plugin, {
//   model: "orders",
//   field: "order_id",
//   startAt: 1, // Starting value for auto-increment
//   incrementBy: 1, // Increment by 1
// });

module.exports = mongoose.model("orders", orders);

const mongoose = require("mongoose");
// const autoIncrement = require("mongoose-sequence")(mongoose);

const cartItem = new mongoose.Schema({
  product_id: { type: Number },
  //   product: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "products", // Reference to the products collection
  //   },
  product_name: { type: String },
  //   detail: { type: String },
  price: { type: Number },
  amount: { type: Number },
  quantity: { type: Number },
});

// products.plugin(autoIncrement, { inc_field: "product_id" });

module.exports = mongoose.model("cartItem", cartItem);

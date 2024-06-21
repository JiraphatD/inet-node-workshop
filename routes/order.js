const express = require("express");
const router = express.Router();
const orderModel = require("../models/order");
const productModel = require("../models/product");

router.post("/", async (req, res) => {
  try {
    let body = req.body;
    let new_order = new orderModel({
      order_id: body.order_id,
      buyer: body.buyer,
      order_list: body.order_list,
      total_price: body.total_price,
    });

    for (const item of body.order_list) {
      const product = await productModel.findOne({
        product_id: item.product_id,
      });
      if (!product) {
        return res.status(404).send({
          message: `Product with ID ${item.product_id} not found`,
        });
      }

      // Check if requested quantity exceeds available amount
      if (item.quantity > product.amount) {
        return res.status(400).send({
          message: `Requested quantity for product ${item.product_id} have not enough amount in stock`,
        });
      } else {
        //update data in product model
        await productModel.updateOne(
          { product_id: item.product_id },
          { $inc: { amount: -item.quantity } } //update amount
        );
      }
    }
    let order = await new_order.save();

    return res.status(201).send({
      data: order,
      message: "success",
    });
  } catch (error) {
    return res.status(error.status || 500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let orders = await orderModel.find();
    return res.send({
      data: orders,
      message: "get products success",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});
router.get("/:order_id", async (req, res) => {
  try {
    let id = req.params.order_id;
    // console.log("id: ", id);
    let order = await orderModel.findOne({ order_id: id });
    return res.send({
      data: order,
      message: "get by ID success",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;

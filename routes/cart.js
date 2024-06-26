const express = require("express");
const router = express.Router();
const cartModel = require("../models/cart");

router.post("/", async (req, res) => {
  try {
    let body = req.body;
    let new_product = new cartModel({
      product_id: body.product_id,
      product_name: body.product_name,
      price: body.price,
      amount: body.amount,
      quantity: body.quantity,
    });
    let product = await new_product.save();
    return res.status(201).send({
      data: product,
      message: "success",
    });
  } catch (error) {
    return res.status(error.status || 500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let products = await cartModel.find();
    return res.send({
      data: products,
      message: "get products success",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});
router.get("/:product_id", async (req, res) => {
  try {
    let id = req.params.product_id;
    // console.log("id: ", id);
    let product = await cartModel.findOne({ product_id: id });
    // console.log("product: ", product);
    return res.send({
      data: product,
      message: "get by ID success",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});
router.put("/:product_id", async (req, res) => {
  try {
    let id = req.params.product_id;
    let body = req.body;
    // console.log("id: ", id);
    // console.log("body: ", body);
    await cartModel
      .updateOne(
        { product_id: id },
        {
          $set: {
            product_id: body.product_id,
            product_name: body.product_name,
            price: body.price,
            amount: body.amount,
            quantity: body.quantity,
          },
        }
      )
      .then(console.log("success"));
    let product = await cartModel.findOne({ product_id: id });
    return res.send({
      data: product,
      message: "change success",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

router.delete("/:product_id", async (req, res) => {
  try {
    let id = req.params.product_id;
    console.log("id: ", id);
    await cartModel.deleteOne({ product_id: id }); // Use 'id' instead of '_id'
    let product = await cartModel.find();
    return res.send({
      data: product,
      message: "delete success",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});
// Assuming you have a model named "cartModel" for your cart collection
router.delete("/", async (req, res) => {
  try {
    // Delete all documents in the "cart" collection
    await cartModel.deleteMany({});
    return res.send({
      message: "All data deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;

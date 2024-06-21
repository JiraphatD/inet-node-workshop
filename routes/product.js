const express = require("express");
const router = express.Router();
const productModel = require("../models/product");
const { default: mongoose } = require("mongoose");

router.post("/", async (req, res) => {
  try {
    let body = req.body;
    let new_product = new productModel({
      product_id: body.product_id,
      product_name: body.product_name,
      price: body.price,
      amount: body.amount,
      detail: body.detail,
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
    let products = await productModel.find();
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
    let product = await productModel.findOne({ product_id: id });
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
    await productModel
      .updateOne(
        { product_id: id },
        {
          $set: {
            product_id: body.product_id,
            product_name: body.product_name,
            detail: body.detail,
            price: body.price,
            amount: body.amount,
          },
        }
      )
      .then(console.log("success"));
    let product = await productModel.findOne({ id });
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
    let id = req.params.id;
    console.log("id: ", id);
    await productModel.deleteOne({ product_id: id }); // Use 'id' instead of '_id'
    let product = await productModel.find();
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

module.exports = router;

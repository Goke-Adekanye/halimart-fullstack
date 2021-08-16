import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

//GET PRODUCT LIST
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

//SEED PRODUCTS TO DATABASE
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

//GET PRODUCT DETAIL
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

//GET ALL PRODUCTS EXCEPT PRODUCT ID
productRouter.get(
  "/smp/:id",
  expressAsyncHandler(async (req, res) => {
    const similarProducts = await Product.find({ _id: { $ne: req.params.id } });
    if (similarProducts) {
      res.send(similarProducts);
    } else {
      res.status(404).send({ message: "No Products" });
    }
  })
);

export default productRouter;

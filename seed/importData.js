import mongoose from "mongoose";
import dotenv from "dotenv";
import data from "../data.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

dotenv.config();
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const users = data.users;
const products = data.products;

const importUser = async () => {
  try {
    await User.create(users);
    console.log("Data Successfully imported 👌");
    process.exit();
  } catch (error) {
    console.log(`ERROR 💥: ${error}`);
    process.exit(1);
  }
};

const importProduct = async () => {
  try {
    await Product.create(products);
    console.log("Data Successfully imported 👌");
    process.exit();
  } catch (error) {
    console.log(`ERROR 💥: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "--importu") {
  importUser();
} else if (process.argv[2] === "--importp") {
  importProduct();
}

const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewwears/authMiddlewear");
const ProductModel = require("../models/ProductModel");
const OrderModel = require("../models/OrderModel");
const router = express.Router();
const expressFormidable = require("express-formidable");
const fs = require("fs");
const slugify = require("slugify");
const { errorMonitor } = require("stream");
const stripe = require("stripe")(
  "sk_test_51P6XxyRtBNrco18AnIMU5oL85dp2GQEzSJPkJYynyDjBjPjs52lDKlY1jG8ktX9GjS0y2Q5p5zocNBQe7asFdYId00MzJKOAR4"
);

// creating product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  //middlewear to get photo of the product
  expressFormidable(),

  async (req, res) => {
    try {
      // destructuring non-file data from req.fields
      const { name, slug, description, price, quantity, category } = req.fields;
      //   destructuring photo file from product data
      const { photo } = req.files;
      //   making a copy of product
      const products = new ProductModel({ ...req.fields, slug: slugify(name) });
      if (photo) {
        // saving the photo file path in products photo key
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      // finally saving the product
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product created successfully",
        products,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: "Error in creating product",
      });
    }
  }
);

// get products list

router.get("/get-products", async (req, res) => {
  try {
    // fetching all products but with some filters, without image
    const products = await ProductModel.find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    if (products) {
      res.status(200).send({
        success: true,
        message: "All products",
        products,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in fetching products",
    });
  }
});

// getting single product:
router.get("/get-product/:slug", async (req, res) => {
  try {
    // fetching single product but with some filters, without image
    const { slug } = req.params;
    const product = await ProductModel.findOne({ slug: slug })
      .select("-photo")
      .populate("category");

    if (product) {
      res.status(200).send({
        success: true,
        message: "Single product",
        product,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in fetching product",
    });
  }
});

// getting product photo:
router.get("/product-photo/:id", async (req, res) => {
  try {
    const productPhoto = await ProductModel.findById(req.params.id).select(
      "photo"
    );
    if (productPhoto) {
      if (productPhoto.photo && productPhoto.photo.data) {
        res.set("Content-type", productPhoto.photo.contentType);
        return res.status(200).send(productPhoto.photo.data);
      } else {
        res.status(404).send({
          success: false,
          message: "Product photo not found",
        });
      }
    } else {
      res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in getting product photo",
    });
  }
});

// deleting a product:

router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  async (req, res) => {
    try {
      // fetching single product but with some filters, without image
      const { id } = req.params;
      const product = await ProductModel.findOneAndDelete({ _id: id });
      if (product) {
        res.status(200).send({
          success: true,
          message: "Product is deleted",
          product,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: "Error in deleting product",
      });
    }
  }
);

// updating a product:
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  //middlewear to get photo of the product
  expressFormidable(),
  async (req, res) => {
    try {
      // destructuring non-file data from req.fields
      const { name, slug, description, price, quantity, category } = req.fields;
      //   destructuring photo file from product data
      const { photo } = req.files;
      //   making a copy of product
      const products = await ProductModel.findByIdAndUpdate(
        req.params.id,
        { ...req.fields, slug: slugify(name) },
        { new: true }
      );
      if (photo) {
        // saving the photo file path in products photo key
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
      }
      // finally saving the product
      await products.save();
      res.status(201).send({
        success: true,
        message: "Product updated successfully",
        products,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: "Error in updating product",
      });
    }
  }
);

// filter product
router.post("/product-filter", async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      message: "Filters applied",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      success: false,
      message: "Error in filtering ",
    });
  }
});

// searching route

router.get("/search/:keyword", async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Error in searching product",
      err,
    });
  }
});

// similar products
router.get("/similar-products/:pid/:cid", async (req, res) => {
  try {
    const { pid, cid } = req.params;

    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(5)
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Similar products found",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Error in searching similar product",
      err,
    });
  }
});

// checkout api

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url:
        "http://localhost:5173/successyeowmdjsbashdshdsjdbudhwuehuwy736427462813239/eu34637",
      cancel_url: "http://localhost:5173/cancel",
    });
    res.json({ id: session.id });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

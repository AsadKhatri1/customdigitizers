const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewwears/authMiddlewear");
const ProductModel = require("../models/ProductModel");
const OrderModel = require("../models/OrderModel");
const router = express.Router();
const expressFormidable = require("express-formidable");
const fs = require("fs");
const slugify = require("slugify");
var braintree = require("braintree");

// PAYMENT GATEWAY
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

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

// payment toutes

// token
router.get("/braintree/token", async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// payment route
router.post("/braintree/payment", requireSignIn, async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (err, result) {
        if (err) {
          console.error(err);
          return;
        }

        if (result.success) {
          const order = new OrderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.status(200).json({ ok: true });
        } else {
          console.error(result.message);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

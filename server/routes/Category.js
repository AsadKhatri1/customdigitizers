const express = require("express");
const categoryModel = require("../models/CategoryModel");
const { requireSignIn, isAdmin } = require("../middlewwears/authMiddlewear");
const router = express.Router();
const slugify = require("slugify");

// creating new category route:
router.post("/create-category", requireSignIn, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(500).send({
        success: false,
        message: "Enter category name",
      });
    }
    // checking if category is existing
    const categoryExists = await categoryModel.findOne({ name: name });
    if (categoryExists) {
      return res.status(500).send({
        success: false,
        message: "Category already exists",
      });
    }

    // creating category
    const slug = slugify(name);
    const category = await new categoryModel({ name, slug }).save();
    res.status(200).send({
      success: true,
      message: "Created a new category successfully",
      category,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in creating category",
    });
  }
});

// updating a category:

router.put("/update-category/:id", requireSignIn, isAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in updating the category",
    });
  }
});

// deleting a category:
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const category = await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Category Deleted",
        category,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: "Error in deleting the category",
      });
    }
  }
);

// fetching all categories
router.get("/get-categories", async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    return res.status(200).send({
      success: true,
      message: "All categories",
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in fetching categories",
    });
  }
});

// fetching single category:

router.get("/get-category/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.find({ slug: slug });
    return res.status(200).send({
      success: true,
      message: `category for ${slug}`,
      category,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in fetching categories",
    });
  }
});
module.exports = router;

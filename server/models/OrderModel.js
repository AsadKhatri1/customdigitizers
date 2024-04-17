const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);

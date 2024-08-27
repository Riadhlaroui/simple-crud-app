const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name."],
    },

    quantity: {
      type: Number,
      required: [true, "Please product quantity."],
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "Please product price."],
      default: 0,
    },

    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
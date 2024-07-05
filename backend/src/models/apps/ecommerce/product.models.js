import mongoose, { Schema } from "mongoose";
import { User } from "../auth/user.models.js";
import { Category } from "./category.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new Schema(
  {
    category: {
      ref: "Category",
      required: true,
      type: Schema.Types.ObjectId,
    },
    description: {
      required: true,
      type: String,
    },
    mainImage: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    owner: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    price: {
      default: 0,
      type: Number,
    },
    stock: {
      default: 0,
      type: Number,
    },
    subImages: {
      type: [String],
      default: [],
    },
    variants: [
      {
        name: {
          required: true,
          type: String,
        },
        description: {
          required: true,
          type: String,
        },
        price: {
          required: true,
          type: Number,
        },
        mainImage: {
          required: true,
          type: String,
        },
        stock: {
          required: true,
          type: Number,
        },
        subImages: {
          type: [String],
          default: [],  
        },
      }
    ]
  },
  { timestamps: true }
);

productSchema.plugin(mongooseAggregatePaginate);

export const Product = mongoose.model("Product", productSchema);

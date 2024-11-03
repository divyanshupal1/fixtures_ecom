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
    mrp: {
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
    variants: {
      ref: "Product",
      required: false,
      type: [Schema.Types.ObjectId],
    },
    variant:{
      type:Boolean,
      default:false,
      required:false
    }
  },
  { timestamps: true }
);

productSchema.plugin(mongooseAggregatePaginate);

export const Product = mongoose.model("Product", productSchema);

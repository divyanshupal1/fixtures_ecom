import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    svgImage: {
      type: String,
      required: false,
    },
    hsCode: {  // New field added here
      type: String,
      required: false,
      maxlength: 4,  // Ensures hsCode is at most 4 characters long
    },
  },
  { timestamps: true }
);

categorySchema.plugin(mongooseAggregatePaginate);

export const Category = mongoose.model("Category", categorySchema);

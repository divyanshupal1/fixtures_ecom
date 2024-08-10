import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import  uuidv4  from 'uuid';

const carouselSchema = new Schema(
  {
    carouselName: {
      type: String,
      required: true,
    },
    carouselImg: {
      type: String, 
      required: true,
    },
    logoImg: {
      type: String, 
      required: true,
    },
    discountText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

carouselSchema.plugin(mongooseAggregatePaginate);

export const Carousel = mongoose.model("Carousel", carouselSchema);

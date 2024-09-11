import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import uuidv4 from 'uuid';

const GridSchema = new Schema({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  buttonAction: {
    type: String,
    required: true
  }
});

const gridImageSchema = new Schema(
  {
    gridName: {
      type: String,
      required: true,
    },
    leftImage: GridSchema,
    rightTopImage: GridSchema,
    rightBottomLeftImage: GridSchema,
    rightBottomRightImage: GridSchema,
  },
  { timestamps: true }
);

gridImageSchema.plugin(mongooseAggregatePaginate);

export const GridImage = mongoose.model("GridImage", gridImageSchema);

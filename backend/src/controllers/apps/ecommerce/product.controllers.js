import mongoose, { Schema } from "mongoose";
import { Product } from "../../../models/apps/ecommerce/product.models.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import {
  getLocalPath,
  getMongoosePaginationOptions,
  getStaticFilePath,
  removeLocalFile,
  getSubImages,
} from "../../../utils/helpers.js";
import { MAXIMUM_SUB_IMAGE_COUNT } from "../../../constants.js";
import { Category } from "../../../models/apps/ecommerce/category.models.js";

const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const productAggregate = Product.aggregate([]);
  const products = await Product.aggregatePaginate(
    productAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalProducts",
        docs: "products",
      },
    })
  );

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

const groupProducts = asyncHandler(async (req, res) => {
  var {products}=req.body;
  products = products.map((product)=>  new mongoose.Types.ObjectId(product));
  const update = await Product.updateMany(
    {_id:{$in:products}},
    {
      $set:{
        variants:products
      }
    }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, update, "Variants updated successfully"));
})



const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, stock, mainImage, subImages,variants } = req.body;
  console.log(req.body)

  const categoryToBeAdded = await Category.findById(category);

  if (!categoryToBeAdded) {
    throw new ApiError(404, "Category does not exist");
  }

  // Check if user has uploaded a main image
  if (!mainImage) {
    throw new ApiError(400, "Main image is required");
  }

  const owner = req.user._id;

  const product = await Product.create({
    name,
    description,
    stock,
    price,
    owner,
    mainImage,
    subImages,
    category,
    variants
  });
  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { name, description, category, price, stock, mainImage ,subImages,variants} = req.body;

  const product = await Product.findById(productId);

  // Check the product existence
  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }


  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        name,
        description,
        stock,
        price,
        category,
        mainImage,
        subImages,
        variants
      },
    },
    {
      new: true,
    }
  );

  if (product.mainImage !== mainImage) {
    removeLocalFile('public/images/ecommerce/'+product.mainImage.split('/').pop());
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const category = await Category.findById(categoryId).select("name _id");

  if (!category) {
    throw new ApiError(404, "Category does not exist");
  }

  const productAggregate = Product.aggregate([
    {
      // match the products with provided category
      $match: {
        category: new mongoose.Types.ObjectId(categoryId),
      },
    },
    {
      $project:{
        _id:1,
        name:1,
        price:1,
        mainImage:1,
        category:1,
        description:1,
        owner:1,
        stock:1,
        subImages:1,
        createdAt:1,
        updatedAt:1,
        variants:{
          name:1,
          price:1,
          mainImage:1,
          subImages:1
        }
      }
    }
  ]);

  const products = await Product.aggregatePaginate(
    productAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalProducts",
        docs: "products",
      },
    })
  );


  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        products,
        "Category products fetched successfully"
      )
    );
});

const removeProductSubImage = asyncHandler(async (req, res) => {
  const { productId, subImageId } = req.params;

  const product = await Product.findById(productId);

  // check for product existence
  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $pull: {
        // pull an item from subImages with _id equals to subImageId
        subImages: {
          _id: new mongoose.Types.ObjectId(subImageId),
        },
      },
    },
    { new: true }
  );

  // retrieve the file object which is being removed
  const removedSubImage = product.subImages?.find((image) => {
    return image._id.toString() === subImageId;
  });

  if (removedSubImage) {
    // remove the file from file system as well
    removeLocalFile(removedSubImage.localPath);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedProduct, "Sub image removed successfully")
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findOneAndDelete({
    _id: productId,
  });

  if (!product) {
    throw new ApiError(404, "Product does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedProduct: product },
        "Product deleted successfully"
      )
    );
});

export {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  updateProduct,
  removeProductSubImage,
  groupProducts
};

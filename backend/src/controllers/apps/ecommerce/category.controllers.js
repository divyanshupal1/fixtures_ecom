import { query } from "express";
import { Category } from "../../../models/apps/ecommerce/category.models.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { getMongoosePaginationOptions } from "../../../utils/helpers.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const findCategory = await Category.findOne({name, owner: req.user._id});
  if (findCategory) {
    return res.status(200)
    .json(new ApiResponse(400, null, "Category already exists"));
  }

  const category = await Category.create({ name, owner: req.user._id });

  return res
    .status(201)
    .json(new ApiResponse(200, category, "Category created successfully"));
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).populate("owner", "username email");
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "Category does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetched successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  const findCategory = await Category.findOne({name, owner: req.user._id});
  if (findCategory) {
    return res.status(200)
    .json(new ApiResponse(400, null, "Category already exists"));
  }

  if(req.user.role === "SUPERADMIN") {
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });
    if (!updatedCategory) {
      throw new ApiError(404, "Category does not exist");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, updatedCategory, "Category updated successfully"));
  }

  const updatedCategory = await Category.findOneAndUpdate({ _id: categoryId, owner: req.user._id }, { name }, { new: true });
  if (!updatedCategory) {
    throw new ApiError(404, "Category does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedCategory, "Category updated successfully"));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findByIdAndDelete(categoryId);

  if (!category) {
    throw new ApiError(404, "Category does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedCategory: category },
        "Category deleted successfully"
      )
    );
});

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

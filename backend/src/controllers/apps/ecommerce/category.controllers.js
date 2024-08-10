import { query } from "express";
import { Category } from "../../../models/apps/ecommerce/category.models.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { getMongoosePaginationOptions } from "../../../utils/helpers.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name, svgImage } = req.body;

  const findCategory = await Category.findOne({name, owner: req.user._id, svgImage});
  if (findCategory) {
    return res.status(200)
    .json(new ApiResponse(400, null, "Category already exists"));
  }
  const {owner} = await Category.create({ name, owner: req.user._id, svgImage });
  const category = await Category.findOne({name, owner: req.user._id, svgImage}).populate("owner", "username email")

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
  const category = await Category.findById(categoryId).populate("owner", "username email");
  if (!category) {
    throw new ApiError(404, "Category does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetched successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name, svgImage } = req.body;

  const findCategory = await Category.findOne({name, owner: req.user._id, svgImage});
  if (findCategory) {
    return res.status(200)
    .json(new ApiResponse(400, null, "Category already exists"));
  }

  if(req.user.role === "SUPERADMIN") {
    const {_id} = await Category.findByIdAndUpdate(categoryId, { name, svgImage }, { new: true });
    if (!_id) {
      throw new ApiError(404, "Category does not exist");
    }
    const updatedCategory = await Category.findById(_id).populate("owner", "username email");
    return res
    .status(200)
    .json(new ApiResponse(200, updatedCategory, "Category updated successfully"));
  }

  const {_id} = await Category.findOneAndUpdate({ _id: categoryId, owner: req.user._id }, { name, svgImage }, { new: true });
  if (!_id) {
    throw new ApiError(404, "Category does not exist");
  }
  const updatedCategory = await Category.findOne({name, owner: req.user._id, svgImage}).populate("owner", "username email")
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

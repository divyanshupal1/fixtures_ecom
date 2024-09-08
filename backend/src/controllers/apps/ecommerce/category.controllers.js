import { Category } from "../../../models/apps/ecommerce/category.models.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { getMongoosePaginationOptions } from "../../../utils/helpers.js";

// Create Category with hsCode
const createCategory = asyncHandler(async (req, res) => {
  const { name, svgImage, hsCode } = req.body;

  const findCategory = await Category.findOne({ name, owner: req.user._id });
  if (findCategory) {
    return res.status(200)
      .json(new ApiResponse(400, null, "Category already exists"));
  }
  const { owner } = await Category.create({ name, owner: req.user._id, svgImage, hsCode });
  const category = await Category.findOne({ name, owner: req.user._id }).populate("owner", "username email");

  return res
    .status(201)
    .json(new ApiResponse(200, category, "Category created successfully"));
});

// Fetch all categories with hsCode
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).populate("owner", "username email");
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

// Fetch single category by ID with hsCode
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

// Update Category with hsCode
const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name, svgImage, hsCode } = req.body;

  const findCategory = await Category.findOne({ name, owner: req.user._id });
  if (findCategory && findCategory._id.toString() !== categoryId) {
    return res.status(200)
      .json(new ApiResponse(400, null, "Category already exists"));
  }

  let updatedCategory;
  if (req.user.role === "SUPERADMIN") {
    const _id = await Category.findByIdAndUpdate(categoryId, { name, svgImage, hsCode }, { new: true });
    if (!_id) {
      throw new ApiError(404, "Category does not exist");
    }
    updatedCategory = await Category.findById(_id).populate("owner", "username email");
  } else {
    const _id = await Category.findOneAndUpdate({ _id: categoryId, owner: req.user._id }, { name, svgImage, hsCode }, { new: true });
    if (!_id) {
      throw new ApiError(404, "Category does not exist");
    }
    updatedCategory = await Category.findById(_id).populate("owner", "username email");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCategory, "Category updated successfully"));
});

// Delete Category
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
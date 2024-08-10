import { Carousel } from "../../../models/apps/ecommerce/carousel.models.js";
import { ApiError } from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

const createCarousel = asyncHandler(async (req, res) => {
  const { carouselName, carouselImg, logoImg, discountText } = req.body;

  const findCarousel = await Carousel.findOne({ carouselName });
  if (findCarousel) {
    return res.status(400)
      .json(new ApiResponse(400, null, "Carousel already exists"));
  }

  const carousel = await Carousel.create({ carouselName, carouselImg, logoImg, discountText });

  return res
    .status(201)
    .json(new ApiResponse(201, carousel, "Carousel created successfully"));
});

const getAllCarousels = asyncHandler(async (req, res) => {
  const carousels = await Carousel.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, carousels, "Carousels fetched successfully"));
});

const getCarouselById = asyncHandler(async (req, res) => {
  const { carouselId } = req.params;
  const carousel = await Carousel.findById(carouselId);
  if (!carousel) {
    throw new ApiError(404, "Carousel does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, carousel, "Carousel fetched successfully"));
});

const updateCarousel = asyncHandler(async (req, res) => {
  const { carouselId } = req.params;
  const { carouselName, carouselImg, logoImg, discountText } = req.body;

  const findCarousel = await Carousel.findOne({ carouselName });
  if (findCarousel && findCarousel._id.toString() !== carouselId) {
    return res.status(400)
      .json(new ApiResponse(400, null, "Carousel with this name already exists"));
  }

  const updatedCarousel = await Carousel.findByIdAndUpdate(
    carouselId, 
    { carouselName, carouselImg, logoImg, discountText }, 
    { new: true }
  );
  
  if (!updatedCarousel) {
    throw new ApiError(404, "Carousel does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCarousel, "Carousel updated successfully"));
});

const deleteCarousel = asyncHandler(async (req, res) => {
  const { carouselId } = req.params;
  const carousel = await Carousel.findByIdAndDelete(carouselId);

  if (!carousel) {
    throw new ApiError(404, "Carousel does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedCarousel: carousel },
        "Carousel deleted successfully"
      )
    );
});

export {
  createCarousel,
  getAllCarousels,
  getCarouselById,
  updateCarousel,
  deleteCarousel,
};

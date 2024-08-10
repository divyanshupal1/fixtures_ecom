import { Router } from "express";
import {
  createCarousel,
  deleteCarousel,
  getAllCarousels,
  getCarouselById,
  updateCarousel,
} from "../../../controllers/apps/ecommerce/carousel.controller.js";
import {
  carouselRequestBodyValidator,
} from "../../../validators/apps/ecommerce/carousel.validator.js";
import { validate } from "../../../validators/validate.js";
import {
  verifyPermission,
  verifyJWT,
} from "../../../middlewares/auth.middlewares.js";
import { UserRolesEnum } from "../../../constants.js";
import { mongoIdPathVariableValidator } from "../../../validators/common/mongodb.validators.js";

const router = Router();

router
  .route("/")
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN]),
    carouselRequestBodyValidator(),
    validate,
    createCarousel
  )
  .get(getAllCarousels);

router
  .route("/:carouselId")
  .get(mongoIdPathVariableValidator("carouselId"), validate, getCarouselById)
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN]),
    mongoIdPathVariableValidator("carouselId"),
    validate,
    deleteCarousel
  )
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN]),
    carouselRequestBodyValidator(),
    mongoIdPathVariableValidator("carouselId"),
    validate,
    updateCarousel
  );

export default router;

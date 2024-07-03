import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  removeProductSubImage,
  updateProduct,
} from "../../../controllers/apps/ecommerce/product.controllers.js";
import {
  verifyPermission,
  verifyJWT,
} from "../../../middlewares/auth.middlewares.js";
import { upload } from "../../../middlewares/multer.middlewares.js";
import {
  createProductValidator,
  updateProductValidator,
} from "../../../validators/apps/ecommerce/product.validators.js";
import { validate } from "../../../validators/validate.js";
import { MAXIMUM_SUB_IMAGE_COUNT, UserRolesEnum } from "../../../constants.js";
import { mongoIdPathVariableValidator } from "../../../validators/common/mongodb.validators.js";

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN,UserRolesEnum.SUPERADMIN]),
    // In product form we will received one main image file type
    // And max 4 sub images
    upload.fields([
      {
        name: "mainImage",
        maxCount: 1,
      },
      {
        name: "subImage1",
        maxCount: 1,
      },
      {
        name: "subImage2",
        maxCount: 1,
      },
      {
        name: "subImage3",
        maxCount: 1,
      },
      {
        name: "subImage4",
        maxCount: 1,
      },
    ]),
    createProductValidator(),
    validate,
    createProduct
  );

router
  .route("/:productId")
  .get(mongoIdPathVariableValidator("productId"), validate, getProductById)
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN,UserRolesEnum.SUPERADMIN]),
    upload.fields([
      {
        name: "mainImage",
        maxCount: 1,
      },
      {
        name: "subImage1",
        maxCount: 1,
      },
      {
        name: "subImage2",
        maxCount: 1,
      },
      {
        name: "subImage3",
        maxCount: 1,
      },
      {
        name: "subImage4",
        maxCount: 1,
      },
    ]),
    mongoIdPathVariableValidator("productId"),
    updateProductValidator(),
    validate,
    updateProduct
  )
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN,UserRolesEnum.SUPERADMIN]),
    mongoIdPathVariableValidator("productId"),
    validate,
    deleteProduct
  );

router
  .route("/category/:categoryId")
  .get(mongoIdPathVariableValidator("categoryId"), validate, getProductsByCategory);

router
  .route("/remove/subimage/:productId/:subImageId")
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN,UserRolesEnum.SUPERADMIN]),
    mongoIdPathVariableValidator("productId"),
    mongoIdPathVariableValidator("subImageId"),
    validate,
    removeProductSubImage
  );

export default router;

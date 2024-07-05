import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  removeProductSubImage,
  updateProduct,
  groupProducts
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
import { UserRolesEnum } from "../../../constants.js";
import { mongoIdPathVariableValidator } from "../../../validators/common/mongodb.validators.js";

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN,UserRolesEnum.SUPERADMIN]),
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
router
  .route('/archive/variants')
  .post(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN,UserRolesEnum.SUPERADMIN]),
    validate,
    groupProducts
  )

export default router;

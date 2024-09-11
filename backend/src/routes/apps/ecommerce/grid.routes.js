import { Router } from "express";
import {
  createGrid,
  deleteGrid,
  getAllGrids,
  getGridById,
  updateGrid,
} from "../../../controllers/apps/ecommerce/grid.controller.js";
import {
  gridRequestBodyValidator,
} from "../../../validators/apps/ecommerce/grid.validator.js";
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
    gridRequestBodyValidator(),
    validate,
    createGrid
  )
  .get(getAllGrids);

router
  .route("/:gridId")
  .get(
    mongoIdPathVariableValidator("gridId"), 
    validate, 
    getGridById
  )
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN]),
    mongoIdPathVariableValidator("gridId"),
    validate,
    deleteGrid
  )
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN]),
    gridRequestBodyValidator(),
    mongoIdPathVariableValidator("gridId"),
    validate,
    updateGrid
  );

export default router;

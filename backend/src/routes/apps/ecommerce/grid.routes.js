import { Router } from "express";
import {
  createGrid,
  deleteGrid,
  getAllGrids,
  getGridById,
  updateGrid,
} from "../../../controllers/apps/ecommerce/grid.controller.js";
// import {
//   gridRequestBodyValidator,
// } from "../../../validators/apps/ecommerce/grid.validators.js";
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
    // gridRequestBodyValidator(),
    validate,
    createGrid
  )
  .get(getAllGrids);

router
  .route("/:id")
  .get(
    mongoIdPathVariableValidator("id"), 
    validate, 
    getGridById
  )
  .delete(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN]),
    mongoIdPathVariableValidator("id"),
    validate,
    deleteGrid
  )
  .patch(
    verifyJWT,
    verifyPermission([UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN]),
    // gridRequestBodyValidator(),
    mongoIdPathVariableValidator("id"),
    validate,
    updateGrid
  );

export default router;

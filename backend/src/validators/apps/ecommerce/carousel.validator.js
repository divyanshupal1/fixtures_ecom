import { body } from "express-validator";

const carouselRequestBodyValidator = () => {
  return [
    body("carouselName").trim().notEmpty().withMessage("Product name is required"),
    body("carouselImg").trim().notEmpty().withMessage("Product image is required"),
    body("logoImg").trim().notEmpty().withMessage("Logo image is required"),
    body("discountText").trim().optional().isString().withMessage("Discount text must be a string"),
    // body("id").trim().notEmpty().withMessage("ID is required"),
  ];
};

export { carouselRequestBodyValidator };

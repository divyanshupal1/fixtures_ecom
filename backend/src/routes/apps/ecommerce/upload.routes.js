import { Router } from "express";
import multer from "multer";
import { verifyJWT } from "../../../middlewares/auth.middlewares.js";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/ecommerce");
    },
    filename: function (req, file, cb) {
        let fileExtension = "";
        if (file.originalname.split(".").length > 1) {
            fileExtension = file.originalname.substring(
                file.originalname.lastIndexOf(".")
            );
        }
        const filenameWithoutExtension = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-")
            ?.split(".")[0];
        cb(
            null,
            filenameWithoutExtension +
                Date.now() +
                Math.ceil(Math.random() * 1e5) + 
                fileExtension
        );
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }
});

const router = Router();

router
    .route("/image")
    .post(
        verifyJWT,
        upload.fields([
            {name:"image",maxCount:1}
        ]),
        (req, res) => {
            res.status(200).json({
                message:"File uploaded successfully",
                url:`${req.protocol}://${req.get("host")}/api/v1/ecommerce/assets/image/${req.files?.image[0]?.filename}`
            })
        }
)

router
    .route("/image/:id")
    .get(
        (req, res) => {
            res.status(200).sendFile(req.params.id,{root:"./public/images/ecommerce"})
        }
    )

export default router;
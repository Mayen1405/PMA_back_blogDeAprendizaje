import { Router } from "express";
import { createPublication, getPublications, getPublicationById, deletePublication, createComment, filterPublications } from "./publication.controller.js";
import { createPublicationValidator,  createCommentValidator, filerPublicationValidator,  } from "../middlewares/publication-validator.js";
import { uploadPublicationPicture } from "../middlewares/multer-uploads.js";

const router = Router();

router.post("/", uploadPublicationPicture.single("image"), createPublicationValidator, createPublication);

router.get("/filter", filerPublicationValidator, filterPublications);

router.get("/", getPublications);

router.get("/:id", getPublicationById);


router.delete("/:id", deletePublication);

router.patch("/:id", createCommentValidator, createComment);

export default router;


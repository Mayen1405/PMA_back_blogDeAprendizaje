import { Router } from "express";
import { createPublication, getPublications, getPublicationById, deletePublication, createComment, filterPublications } from "./publication.controller.js";
import { createPublicationValidator, createCommentValidator, filerPublicationValidator } from "../middlewares/publication-validator.js";
import { uploadPublicationPicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Publications
 *   description: API for managing publications
 */

/**
 * @swagger
 * /publications:
 *   post:
 *     summary: Create a new publication
 *     tags: [Publications]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Publication created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", uploadPublicationPicture.single("image"), createPublicationValidator, createPublication);

/**
 * @swagger
 * /publications/filter:
 *   get:
 *     summary: Filter publications
 *     tags: [Publications]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter criteria
 *     responses:
 *       200:
 *         description: List of filtered publications
 *       400:
 *         description: Validation error
 */
router.get("/filter", filerPublicationValidator, filterPublications);

/**
 * @swagger
 * /publications:
 *   get:
 *     summary: Get all publications
 *     tags: [Publications]
 *     responses:
 *       200:
 *         description: List of publications
 */
router.get("/", getPublications);

/**
 * @swagger
 * /publications/{id}:
 *   get:
 *     summary: Get a publication by ID
 *     tags: [Publications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publication ID
 *     responses:
 *       200:
 *         description: Publication details
 *       404:
 *         description: Publication not found
 */
router.get("/:id", getPublicationById);

/**
 * @swagger
 * /publications/{id}:
 *   delete:
 *     summary: Delete a publication by ID
 *     tags: [Publications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publication ID
 *     responses:
 *       200:
 *         description: Publication deleted successfully
 *       404:
 *         description: Publication not found
 */
router.delete("/:id", deletePublication);

/**
 * @swagger
 * /publications/{id}:
 *   patch:
 *     summary: Add a comment to a publication
 *     tags: [Publications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publication ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       400:
 *         description: Validation error
 */
router.patch("/:id", createCommentValidator, createComment);

export default router;




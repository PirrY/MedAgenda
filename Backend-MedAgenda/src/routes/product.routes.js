import express from "express";
import { getProducts, getProductById, createProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);

export default router;

import express from "express";
import { addToCart, getCartProducts, removeFromCart, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeFromCart);
router.put("/:id", protectRoute, updateQuantity);
router.delete('/clear', protectRoute, removeAllFromCart);
export default router;
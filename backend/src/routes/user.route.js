import express from "express";
import { getAllUsers, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/",getAllUsers);
router.post("/", createUser);
router.patch("/:id",updateUser);
router.delete("/:id",deleteUser);

export default router;
import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController";
import validateToken from "../middleware/validateTokenHandler";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", validateToken, getUser);

export default router;

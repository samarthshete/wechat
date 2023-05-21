import express from "express";
import { login, register, allUsers } from "../controller/authController.js";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();

router.route("/register").post(register).get(authenticateUser, allUsers);
router.route("/login").post(login);

export default router;

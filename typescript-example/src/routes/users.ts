import { Router } from "express";
import UserController from "../controllers/users.controller";
const router = Router();

// api/v1/users
router.get("/", UserController.getUsers);

router.get("/:id", UserController.getUserById);

router.post("/", UserController.createUser);
export default router;

import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();
const userController = new UserController();

//inserts user to the database (CREATE)
router.post("/add", userController.addUser);

//read operation (Read)
router.get("/:id", userController.getUserById);

//update the users

router.put("/update/:id", userController.updateUser);
// router.put("/update/:id", userController.updateUser);

// //delete.
// router.delete("/delete/:id", userController.deleteUser);

// // . localhost:8000/user/search/by?location=ktm
// router.get("/search/by", userController.searchUserByLocation);

export default router;

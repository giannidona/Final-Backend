import { Router } from "express";
import usersController from "../controllers/usersController.js";

const router = Router();

router.get("/users", usersController.showUsers);

router.post("/users/updateRole", usersController.updateRole);

export default router;

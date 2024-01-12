import { Router } from "express";
import isAdmin from "../middlewares/authorize.js";
import usersController from "../controllers/usersController.js";

const router = Router();

router.get("/users", isAdmin, usersController.showUsers);

router.post("/users/updateRole", isAdmin, usersController.updateRole);

export default router;

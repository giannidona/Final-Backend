import { Router } from "express";
import usersController from "../controllers/usersController.js";
import privateRoutes from "../middlewares/privateRoutes.js";

const router = Router();

router.get("/usersManager", privateRoutes, usersController.showUsers);

router.post("/users/updateRole", usersController.updateRole);

export default router;

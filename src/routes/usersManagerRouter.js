import { Router } from "express";
import usersController from "../controllers/usersController.js";
import privateRoutes from "../middlewares/privateRoutes.js";
import adminAccess from "../middlewares/adminAccess.js";

const router = Router();

router.get(
  "/usersManager",
  privateRoutes,
  adminAccess,
  usersController.showUsers
);

router.post("/usersManager/updateRole", usersController.updateRole);

export default router;

import { Router } from "express";
import usersController from "../controllers/usersController.js";
import privateRoutes from "../middlewares/privateRoutes.js";
import adminAccess from "../middlewares/adminAccess.js";

const router = Router();

router.get("/users", privateRoutes, adminAccess, usersController.showUsers);

router.post("/users/updateRole", usersController.updateRole);

router.delete(
  "/users/delete",
  privateRoutes,
  adminAccess,
  usersController.deleteInactiveUsers
);

export default router;

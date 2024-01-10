import { Router } from "express";
import cartController from "../controllers/cartController.js";

const router = Router();

router.get("/ticket", cartController.ticket);

export default router;

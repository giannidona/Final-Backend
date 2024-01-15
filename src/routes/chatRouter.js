import { Router } from "express";
import privateRoutes from "../middlewares/privateRoutes.js";
import userAccess from "../middlewares/userAccess.js";

const router = new Router();

router.get("/chat", privateRoutes, userAccess, async (req, res) => {
  try {
    const username = req.session.username;
    res.render("chat", { username });
  } catch (error) {
    console.log(error);
  }
});

export default router;

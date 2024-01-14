import { Router } from "express";
import privateRoutes from "../middlewares/privateRoutes.js";

const router = new Router();

router.get("/chat", privateRoutes, async (req, res) => {
  try {
    const username = req.session.username;
    res.render("chat", { username });
  } catch (error) {
    console.log(error);
  }
});

export default router;

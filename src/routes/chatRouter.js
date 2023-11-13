import { Router } from "express";

import authorize from "../middlewares/authorize.js";

const router = new Router();

router.get("/chat", authorize, async (req, res) => {
  try {
    if (!req.session.isLogged) {
      return res.redirect("/login");
    }

    const username = req.session.username;
    const profile_image = req.session.image;
    res.render("chat", { username, profile_image });
  } catch (error) {
    console.log(error);
  }
});

export default router;

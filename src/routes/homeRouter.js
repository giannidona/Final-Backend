import { Router } from "express";

const router = new Router();

router.get("/home", async (req, res) => {
  try {
    if (!req.session.isLogged) {
      return res.redirect("/login");
    }

    const { username, surname } = req.session;
    res.render("home", { username, surname });
  } catch (error) {
    console.log(error);
  }
});

export default router;

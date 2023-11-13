import { Router } from "express";
import { findUser } from "../controllers/userController.js";
import { uploader } from "../middlewares/multer.js";
import { createUser } from "../controllers/userController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = new Router();

router.get("/register", async (req, res) => {
  try {
    if (req.session.isLogged) {
      return res.redirect("/home");
    }

    res.render("register");
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", uploader.single("file"), createUser);

router.get("/login", async (req, res) => {
  try {
    if (req.session.isLogged) {
      return res.redirect("/home");
    }

    res.render("login");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", findUser);

router.get("/current", jwtAuth, (req, res) =>
  res.send({ status: "success", payload: req.user })
);

export default router;

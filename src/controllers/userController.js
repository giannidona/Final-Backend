import { userModel } from "../dao/models/userModel.js";
import cartModel from "../dao/models/cartModel.js";
import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../config/constants.js";

export const createUser = async (req, res) => {
  try {
    const { username, surname, email, password } = req.body;
    const profile_image = req.file.originalname;

    const newUser = await userModel.create({
      username,
      surname,
      email,
      password,
      profile_image,
    });

    newUser.save().then((user) => {
      const newCart = new cartModel({
        products: [],
      });

      newCart
        .save()
        .then((cart) => {
          user.cart = cart._id;
          user.save();
        })
        .catch((error) => {
          console.error("Error al crear el carrito:", error);
        });
    });

    res.redirect("/home");
  } catch (error) {
    console.log("create user controller: ", error);
  }
};

export const findUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username, password }).lean();

    req.session.username = user.username;
    req.session.surname = user.surname;
    req.session.email = user.email;
    req.session.image = user.profile_image;
    req.session.userId = user._id;
    req.session.isLogged = true;

    const access_token = jwt.sign({ user }, JWT_PRIVATE_KEY, {
      expiresIn: "24h",
    });
    res.redirect("/home");
  } catch (error) {
    console.log("login controller: ", error);
  }
};

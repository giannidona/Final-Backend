import { userService } from "../services/services.js";
import { cartService } from "../services/services.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../config/constants.js";

const register = async (req, res) => {
  try {
    const { username, surname, email, password } = req.body;

    const newUser = await createCart({
      username,
      surname,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });

    res.redirect("/login");
  } catch (error) {
    console.error(error, "register sessionController");
    res.status(500).send("Error al registrar usuario");
  }
};

const createCart = async (userData) => {
  try {
    const newUser = await userService.create(userData);

    const newCart = await cartService.create({
      user: newUser._id,
      products: [],
    });

    await userService.update(newUser._id, { cart: newCart._id });

    return newUser;
  } catch (error) {
    console.error(error, "createCart sessionController");
    throw new Error("Error al crear usuario y carrito");
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.findOne({ username }).lean();
    const userMiniData = {
      username: user.username,
      role: user.role,
    };
    console.log(userMiniData);

    const token = jwt.sign({ user: userMiniData }, JWT_PRIVATE_KEY, {
      expiresIn: "24h",
    });
    console.log(token);

    if (!user) {
      return res.send("las credenciales no existen");
    }
    if (!bcrypt.compare(password, user.password)) {
      return res.send("las credenciales no son correctas");
    }

    req.session.username = user.username;
    req.session.surname = user.surname;
    req.session.email = user.email;
    req.session.userId = user._id;
    req.session.isLogged = true;
    req.session.role = user.role;

    return res.redirect("/home");
  } catch (error) {
    console.log(error, "login sessionController");
  }
};

export default { register, login };

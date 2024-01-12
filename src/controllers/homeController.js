import { productService } from "../services/services.js";

const renderHome = async (req, res) => {
  try {
    const { username, surname, email, role } = req.session;
    const isAdmin = role === "admin";

    const products = await productService.getAll().lean();

    res.render("home", { username, surname, email, role, products, isAdmin });
  } catch (error) {
    console.log(error, "renderHome homeController");
  }
};

export default { renderHome };

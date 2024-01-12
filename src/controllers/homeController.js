import { productService } from "../services/services.js";

const renderHome = async (req, res) => {
  try {
    const { username, surname, email, role } = req.session;
    const products = await productService.getAll().lean();

    res.render("home", { username, surname, email, role, products });
  } catch (error) {
    console.log(error, "renderHome homeController");
  }
};

export default { renderHome };

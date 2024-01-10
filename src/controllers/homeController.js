import { productService } from "../services/services.js";

const renderHome = async (req, res) => {
  try {
    if (!req.session.isLogged) {
      res.redirect("/login");
    }
    const { username, surname, email } = req.session;
    const products = await productService.getAll().lean();

    res.render("home", { username, surname, email, products });
  } catch (error) {
    console.log(error, "renderHome homeController");
  }
};

export default { renderHome };

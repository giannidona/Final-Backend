import { productService } from "../services/services.js";

const renderHome = async (req, res) => {
  try {
    const { username, surname, email, role } = req.session;
    const products = await productService.getAll().lean();

    const pageId = parseInt(req.params.pageId);

    const result = await productService.getAllPaginated({
      page: pageId,
      limit: 6,
      lean: true,
    });

    const prevLink = result.hasPrevPage
      ? `http://localhost:8080/home/${result.prevPage}`
      : false;

    const nextLink = result.hasNextPage
      ? `http://localhost:8080/home/${result.nextPage}`
      : false;

    res.render("home", {
      username,
      surname,
      email,
      role,
      products: result.docs,
      prevLink,
      nextLink,
    });
  } catch (error) {
    console.log(error, "renderHome homeController");
  }
};

export default { renderHome };

import { Router } from "express";
import { uploader } from "../middlewares/multer.js";
import ProductManager from "../dao/db/productManager.js";
import { productModel } from "../dao/models/productModel.js";

const router = Router();
const productManager = new ProductManager();

// MUESTRA TODOS LOS PRODUCTOS
router.get("/showproduct", async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let sort = req.query.sort || "";
  let query = req.query.query || "";

  let queryConditions = {};
  if (query) {
    queryConditions = { type: query };
  }

  let sortOptions = {};
  if (sort === "asc") {
    sortOptions = { price: 1 };
  } else if (sort === "desc") {
    sortOptions = { price: -1 };
  }

  try {
    let result = await productModel.paginate(queryConditions, {
      page,
      limit,
      sort: sortOptions,
      lean: true,
    });

    let totalPages = result.totalPages;
    let hasPrevPage = result.hasPrevPage;
    let hasNextPage = result.hasNextPage;
    let prevPage = result.prevPage;
    let nextPage = result.nextPage;
    let prevLink = hasPrevPage ? `/api/showproduct?page=${prevPage}` : null;
    let nextLink = hasNextPage ? `/api/showproduct?page=${nextPage}` : null;

    let response = {
      status: "success",
      payload: result.docs,
      totalPages,
      prevPage,
      nextPage,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});
// AGREGA UN PRODUCTO
router.get("/addproduct", (req, res) => {
  res.render("addproduct");
});

// PROCESA EL ENVIO
router.post("/addproduct", uploader.single("file"), async (req, res) => {
  try {
    const { name, price, stock, descrip } = req.body;
    const image = req.file.originalname;
    const prod = await productManager.create(
      name,
      price,
      stock,
      descrip,
      image
    );
    res.status(200).send(prod);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al agregar el producto." });
  }
});

// ELIMINA EL PRODUCTO SEGUN EL ID
router.delete("/deleteproduct/:pid", async (req, res) => {
  try {
    const productId = req.body.pid;

    if (!productId) {
      return res
        .status(400)
        .json({ error: "ID de producto no proporcionado." });
    }

    await productManager.deleteProduct(productId);

    res.json({ message: "Producto eliminado con éxito." });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto." });
  }
});

export default router;

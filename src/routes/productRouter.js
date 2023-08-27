import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);

    let products = await productManager.getProducts();

    if (limit) {
      products = products.slice(0, limit);
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.send({ error: "Error al obtener los productos." });
  }
});

router.get("/products/:pid", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const pid = parseInt(req.params.pid);

    const product = products.find((prod) => prod.id === pid);

    if (product) {
      res.json(product);
    }
  } catch (error) {
    res.send({ error: "No se encuentra ese ID" });
  }
});

router.post("/products/", async (req, res) => {
  try {
    const { title, description, img, price, code, status, stock } = req.body;

    if (
      !title ||
      !description ||
      !img ||
      !price ||
      !code ||
      !status ||
      !stock
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son requeridos." });
    }

    const newProd = await productManager.addProduct(
      title,
      description,
      img,
      price,
      code,
      status,
      stock
    );
    res.json(newProd);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al agregar el producto." });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;

    if (Object.keys(updatedFields).length === 0) {
      return res
        .status(400)
        .json({ error: "No se proporcionaron campos para actualizar." });
    }

    const updatedProduct = await productManager.updateProduct(
      productId,
      updatedFields
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al actualizar el producto." });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);

    const deletedProduct = await productManager.deleteProduct(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al eliminar el producto." });
  }
});

export default router;

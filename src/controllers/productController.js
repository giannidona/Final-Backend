import ProductManager from "../dao/db/ProductManager.js";

const productManager = new ProductManager();

export const showProducts = async (req, res) => {
  try {
    const products = await productManager.getProducts();

    const btnAddProd = products.some((product) => product.stock > 1);

    res.render("products", { products, btnAddProd });
  } catch (error) {
    console.log("show products controller: ", error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, description } = req.body;
    const product_image = req.file.originalname;
    const newProduct = await productManager.createProduct({
      name,
      price,
      stock,
      description,
      product_image,
    });
  } catch (error) {
    console.log("create product controller: ", error);
  }
};

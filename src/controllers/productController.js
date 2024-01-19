import { productService } from "../services/services.js";

const createProduct = async (req, res) => {
  try {
    const { prod_name, description, stock, price } = req.body;
    const prod_image = req.file.originalname;
    const userEmail = req.session.email;
    const newProduct = await productService.create({
      prod_name,
      description,
      stock,
      price,
      prod_image,
      owner: userEmail,
    });
    console.log(newProduct);
    res.redirect("/home/1");
  } catch (error) {
    console.log(error, "createProduct productController");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.body.prodId;

    const product = await productService.getById({ _id: productId });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await productService.delete(productId);

    res.redirect("/home/1");
  } catch (error) {
    console.log(error, "deleteProduct productController");
  }
};

export default { createProduct, deleteProduct };

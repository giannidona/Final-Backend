import { productService } from "../services/services.js";

const createProduct = async (req, res) => {
  try {
    const { prod_name, description, stock, price } = req.body;
    const prod_image = req.file.originalname;
    const newProduct = await productService.create({
      prod_name,
      description,
      stock,
      price,
      prod_image,
    });
    console.log(newProduct);
    res.redirect("/home");
  } catch (error) {
    console.log(error, "createProduct productController");
  }
};

export default { createProduct };

import { productService } from "../services/services.js";
import nodemailer from "nodemailer";
import { logger } from "../utils.js/logger.js";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "gianicraft@gmail.com",
    pass: "IfahJSWyvQPKpndx",
  },
});

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
    res.redirect("/home/1");
  } catch (error) {
    logger.error(error, "createProduct productController");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.body.prodId;

    const product = await productService.getById({ _id: productId });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const creatorEmail = product.owner;

    await productService.delete(productId);

    const message = {
      from: "ecommerceBackEnd@gmail.com",
      to: creatorEmail,
      subject: "Producto Eliminado",
      text: `Hola te informamos que tu producto fue elimiando`,
    };

    await transporter.sendMail(message);

    res.redirect("/home/1");
  } catch (error) {
    logger.error(error, "deleteProduct productController");
  }
};

export default { createProduct, deleteProduct };

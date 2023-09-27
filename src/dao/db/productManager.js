import { productModel } from "../models/productModel.js";

class ProductManager {
  async create(name, price, stock, descrip, image) {
    const product = await productModel.create({
      name,
      price,
      stock,
      descrip,
      image,
    });
    return product;
  }

  async getAll() {
    const products = await productModel.find().lean();
    return products;
  }

  async getProductById(id) {
    try {
      const product = await productModel.findById(id).lean();
      return product;
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error);
      throw error;
    }
  }

  async updateProduct() {}

  async deleteProduct(id) {
    try {
      const deleteProduct = await productModel.deleteOne({ id });
      if (deleteProduct === deleteProduct) {
        console.log(`Se elimino el producto con id:${deleteProduct}`);
      } else {
        throw new Error("No se encontró el producto con el ID especificado.");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  }
}

export default ProductManager;

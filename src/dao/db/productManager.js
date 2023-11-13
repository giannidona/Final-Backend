import { productModel } from "../models/productModel.js";

export default class ProductManager {
  async getProducts() {
    try {
      const products = await productModel.find({}).lean();
      return products;
    } catch (error) {
      console.log("getProductsManager", error);
    }
  }

  async getProductById(id) {
    try {
      const { id } = req.params;
      const product = await productModel.findById({ id });
    } catch (error) {
      console.log("getProductByIdManager", error);
    }
  }

  async createProduct(productData) {
    try {
      const newProduct = await productModel.create(productData);
      console.log(newProduct);
      return newProduct;
    } catch (error) {
      console.log("createProductManager", error);
    }
  }
  async updateProduct(id, productData) {
    try {
      const productUpdated = await productModel.findByIdAndUpdate(
        { id: _id },
        productData
      );
      console.log(productUpdated);
    } catch (error) {
      console.log("updateProductManager", error);
    }
  }

  async deleteProduct(id) {
    try {
      const productDeleted = await productModel.findByIdAndDelete({ id: _id });
      console.log(productDeleted);
    } catch (error) {
      console.log("deleteProductManager", error);
    }
  }
}

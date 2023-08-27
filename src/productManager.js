import fs from "fs";

class ProductManager {
  static id = 0;

  constructor() {
    this.products = [];
    this.path = "src/products.json";
    this.loadProducts();
  }

  async getProducts() {
    const data = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    return data;
  }

  async loadProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);
      this.updateId();
    } catch (error) {
      this.products = [];
    }
  }

  updateId() {
    if (this.products.length > 0) {
      ProductManager.id = this.products[this.products.length - 1].id + 1;
    } else {
      ProductManager.id = 0;
    }
  }

  async addProduct(title, description, img, price, code, status, stock) {
    const newProd = {
      id: ProductManager.id++,
      title,
      description,
      img,
      price,
      code,
      status,
      stock,
    };

    this.products.push(newProd);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, 2)
    );

    return newProd;
  }

  async getProductById(id) {
    const data = await this.getProducts();
    const product = data.find((prod) => prod.id === id);

    if (product) {
      return product;
    } else {
      throw new Error(`El Producto con ${id} no fue encontrado.`);
    }
  }

  async updateProduct(id, updatedFields) {
    const data = await this.getProducts();
    const index = data.findIndex((prod) => prod.id === id);

    if (index !== -1) {
      Object.assign(data[index], updatedFields);
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
      return data[index];
    }
  }

  async deleteProduct(id) {
    const data = await this.getProducts();
    const index = data.findIndex((prod) => prod.id === id);

    if (index !== -1) {
      const deletedProduct = data.splice(index, 1)[0];
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
      return deletedProduct;
    } else {
      throw new Error(`El Producto con ${id} no fue encontrado.`);
    }
  }
}

export default ProductManager;

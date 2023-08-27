import fs from "fs/promises";

class cartManager {
  static id = 0;

  constructor() {
    this.filePath = "src/cart.json";
    this.carts = [];
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const fileContent = await fs.readFile(this.filePath, "utf-8");
      this.carts = JSON.parse(fileContent);
    } catch (error) {
      this.carts = [];
    }
  }

  async saveCarts() {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.error("Error al guardar los carritos:", error);
      throw error;
    }
  }

  createCart() {
    const newCart = {
      id: this.updateId(),
      products: [],
    };
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;
  }

  updateId() {
    const maxId = this.carts.reduce(
      (max, cart) => (cart.id > max ? cart.id : max),
      0
    );
    return maxId + 1;
  }

  getCartById(cartId) {
    return this.carts.find((cart) => cart.id === cartId);
  }
}

export default cartManager;

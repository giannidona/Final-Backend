import userDAO from "../dao/userDAO.js";
import productDAO from "../dao/productDAO.js";
import cartDAO from "../dao/cartDAO.js";
import ticketDAO from "../dao/ticketDAO.js";

import userRepository from "../repository/userRepository.js";
import productRepository from "../repository/productRepository.js";
import cartRepository from "../repository/cartRepository.js";
import ticketRepository from "../repository/ticketRepository.js";

export const userService = new userRepository(new userDAO());
export const productService = new productRepository(new productDAO());
export const cartService = new cartRepository(new cartDAO());
export const ticketService = new ticketRepository(new ticketDAO());

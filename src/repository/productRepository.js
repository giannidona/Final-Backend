import genericRepository from "./genericRepository.js";
import { productModel } from "../dao/models/productModel.js";

export default class productRepository extends genericRepository {
  constructor(dao) {
    super(dao);
  }

  getAllPaginated(options) {
    return productModel.paginate({}, options);
  }
}

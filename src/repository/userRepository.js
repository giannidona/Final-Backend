import genericRepository from "./genericRepository.js";

export default class userRepository extends genericRepository {
  constructor(dao) {
    super(dao);
  }

  findOne = (params) => {
    return this.dao.findOne(params).lean();
  };
}

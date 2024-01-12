import genericRepository from "./genericRepository.js";

export default class userRepository extends genericRepository {
  constructor(dao) {
    super(dao);
    this.userDAO = dao;
  }

  findOne = (params) => {
    return this.dao.findOne(params).lean();
  };

  updateRole(userId, newRole) {
    try {
      const updatedUser = this.update({ _id: userId }, { role: newRole });
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default class genericRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = (params) => {
    return this.dao.get(params);
  };

  getById = (params) => {
    return this.dao.getById(params);
  };

  create = (doc) => {
    return this.dao.create(doc);
  };

  update = (id, doc) => {
    return this.dao.update(id, doc);
  };

  delete = (id) => {
    return this.dao.delete(id);
  };
}

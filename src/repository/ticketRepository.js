import genericRepository from "./genericRepository.js";

export default class ticketRepository extends genericRepository {
  constructor(dao) {
    super(dao);
  }

  save = (ticket) => {
    return this.dao.create(ticket);
  };
}

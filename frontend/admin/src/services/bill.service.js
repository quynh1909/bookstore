import createApiClient from "./api.service";

class BillService {
  constructor(baseUrl = "/api/bill") {
    this.api = createApiClient(baseUrl);
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async findAll() {
    return (await this.api.get("/")).data;
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id, data) {
    return (await this.api.patch(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async getBillByUserId(id) {
    return (await this.api.get(`/billuser/${id}`)).data;
  }
}

export default new BillService();

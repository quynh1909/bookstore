import createApiClient from "./api.service";

class BillDetailService {
  constructor(baseUrl = "/api/billdetail") {
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
  async getDetailByBillId(id) {
    return (await this.api.get(`/getdetail/${id}`)).data;
  }
  async deleteDetailByBillId(id) {
    return (await this.api.delete(`/getdetail/${id}`)).data;
  }
}

export default new BillDetailService();

import createApiClient from "./api.service";

class CustomerService {
  constructor(baseUrl = "/api/customers") {
    this.api = createApiClient(baseUrl);
  }
  async signUp(data) {
    return (await this.api.post("/signUp", data)).data;
  }
  async signIn(data) {
    return (await this.api.post("/signIn", data)).data;
  }
  async signOut() {
    return (await this.api.post("/signOut")).data;
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
}

export default new CustomerService();

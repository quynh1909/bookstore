import createApiClient from "./api.service";

class AdminService {
  constructor(baseUrl = "/api/admin") {
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
}

export default new AdminService();

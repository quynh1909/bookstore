// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isAdminLoggedIn: JSON.parse(
      localStorage.getItem("isAdminLoggedIn") || "false"
    ),
    token: localStorage.getItem("token") || null, // Thêm trạng thái token
  }),
  actions: {
    loginAdmin(token) {
      // Thực hiện đăng nhập admin và đặt isAdminLoggedIn thành true
      this.isAdminLoggedIn = true;
      this.token = token; // Lưu token vào trạng thái
      localStorage.setItem("isAdminLoggedIn", true);
      localStorage.setItem("token", token); // Lưu token vào localStorage
    },
    logoutAdmin() {
      // Thực hiện đăng xuất admin và đặt isAdminLoggedIn thành false
      this.isAdminLoggedIn = false;
      this.token = null; // Xóa token khỏi trạng thái
      localStorage.setItem("isAdminLoggedIn", false);
      localStorage.removeItem("token"); // Xóa token khỏi localStorage
    },
  },
});

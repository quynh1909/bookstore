// stores/auth.js
import { defineStore } from "pinia";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isUserLoggedIn: JSON.parse(
      localStorage.getItem("isUserLoggedIn") || "false"
    ),
    token: localStorage.getItem("token") || null, // Thêm trạng thái token
    userId: localStorage.getItem("userId") || null,
  }),
  actions: {
    login(token, userId) {
      // Thực hiện đăng nhập admin và đặt isUserLoggedIn thành true
      this.isUserLoggedIn = true;
      this.token = token; // Lưu token vào trạng thái
      this.userId = userId;
      localStorage.setItem("isUserLoggedIn", true);
      localStorage.setItem("token", token); // Lưu token vào localStorage
      localStorage.setItem("userId", userId);
    },
    logout() {
      // Thực hiện đăng xuất admin và đặt isUserLoggedIn thành false
      this.isUserLoggedIn = false;
      this.token = null; // Xóa token khỏi trạng thái
      this.userId = null;
      localStorage.setItem("isUserLoggedIn", false);
      localStorage.removeItem("token"); // Xóa token khỏi localStorage
      localStorage.removeItem("userId");
    },
  },
});

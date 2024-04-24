import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth"; // Giả sử bạn đã có một store Pinia
const router = useRouter();
const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export default (baseURL) => {
  const instance = axios.create({
    baseURL,
    ...commonConfig,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Thêm bộ chặn phản hồi để xử lý token hết hạn
  instance.interceptors.response.use(
    (response) => {
      // Xử lý phản hồi bình thường
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token hết hạn hoặc không hợp lệ
        const authStore = useAuthStore();
        authStore.logout(); // Gọi hành động đăng xuất từ store
        // router.push({ name: "signin" });
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

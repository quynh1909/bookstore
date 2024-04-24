<template>
  <div class="page">
    <SignInForm @submit:signin="submitSignIn" />
  </div>
</template>

<script>
import adminService from "@/services/admin.service.js";
import SignInForm from "@/components/SignInForm.vue";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";

export default {
  components: {
    SignInForm,
  },
  setup() {
    const authStore = useAuthStore();
    // const store = useStore();
    const router = useRouter();
    const submitSignIn = async (data) => {
      try {
        const response = await adminService.signIn(data);
        console.log(response);
        if (response && response.token) {
          authStore.loginAdmin(response.token); // Truyền token vào khi đăng nhập
        }
        alert("Đăng nhập thành công");
        router.push({ name: "home" });
        console.log(authStore.isAdminLoggedIn);
      } catch (error) {
        console.log(error);
        alert("Tài khoản hoặc mật khẩu không chính xác!!");
      }
    };
    // return { store, message, submitSignIn }
    return { submitSignIn };
  },
};
</script>

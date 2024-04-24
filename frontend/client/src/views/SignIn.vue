<template>
  <div class="page">
    <p class="super-p text-end text-danger">{{ message }}</p>
    <SignInForm @submit:signin="submitSignIn" />
  </div>
</template>

<script>
import customerService from "@/services/customer.service";
import SignInForm from "@/components/SignInForm.vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  components: {
    SignInForm,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const message = ref("");
    const submitSignIn = async (data) => {
      try {
        console.log(data.email);
        const response = await customerService.signIn(data);
        console.log(response);
        if (response.token) {
          authStore.login(response.token, response.userId);
        } else {
        }
        alert("Đăng nhập thành công");
        router.push({ name: "home" });
      } catch (error) {
        console.log(error);
        message.value =
          "Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại.";
      }
    };
    //   //   return { store, message, submitSignIn };
    return { submitSignIn, message };
  },
};
</script>
<style>
.super-p {
  font-size: 20px;
  margin-right: 164px;
}
</style>

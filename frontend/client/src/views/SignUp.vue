<template>
  <div class="page">
    <!-- @submit:signup="submitSignUp" -->
    <SignUpForm @submit:signup="submitSignUp" />
    <!-- <p>{{ message }}</p> -->
  </div>
</template>

<script>
import SignUpForm from "@/components/SignUpForm.vue";
import customerService from "@/services/customer.service";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    SignUpForm,
  },
  setup() {
    const message = ref("");
    const router = useRouter();
    const submitSignUp = async (data) => {
      try {
        console.log(data);
        await customerService.signUp(data);
        alert("Đăng ký thành công!");
        router.push({ name: "signin" });
      } catch (error) {
        // console.log(error);
        alert("Đăng ký thất bại!! Email đã tồn tại!!");
      }
    };
    // return { message, submitSignUp };
    return { submitSignUp };
  },
});
</script>

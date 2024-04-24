<template>
  <Profile
    :customerData="customerData"
    :updateCustomer="updateCustomer"
    @logout="handleLogout"
  />
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import customerService from "@/services/customer.service.js";
import { useAuthStore } from "../stores/auth";
import Profile from "@/components/Profile.vue";
export default {
  components: {
    Profile,
  },
  setup() {
    const router = useRouter();
    const customer = ref({});
    const customerData = ref({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    const authStore = useAuthStore();
    const userId = computed(() => authStore.userId);

    onMounted(async () => {
      try {
        const response = await customerService.get(userId.value);
        const { name, email, phone, address } = response;
        customerData.value = { name, email, phone, address };
      } catch (error) {
        console.error(error);
      }
    });

    const updateCustomer = async () => {
      try {
        const response = await customerService.update(
          userId.value,
          customerData.value
        );
        alert("Cập nhật thông tin thành công");
      } catch (error) {
        console.error(error);
        // Hiển thị thông báo lỗi
      }
    };

    const handleLogout = async () => {
      try {
        const response = await customerService.signOut();
        authStore.logout();
        alert("Đăng xuất thành công!");
        router.push({ name: "signin" });
      } catch (error) {
        console.log(error);
      }
    };

    return { userId, customerData, updateCustomer, handleLogout };
  },
};
</script>

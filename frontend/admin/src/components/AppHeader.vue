<template>
  <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <!-- Navbar Brand-->
    <router-link :to="{ name: 'home' }" class="router-css">
      <a class="navbar-brand ps-3" href="index.html">Quản trị viên</a>
    </router-link>
    <!-- Thanh tìm kiếm -->
    <form class="mx-auto input-group w-auto">
      <input type="search" class="form-control rounded" placeholder="Tìm kiếm" aria-label="Tìm kiếm"
        aria-describedby="search-addon" />
      <span class="input-group-text border-0" id="search-addon">
        <i class="fas fa-search"></i>
      </span>
    </form>
    <!-- Nút đăng xuất-->
    <div class="d-flex align-items-center">
      <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 btn-sign-out" @click="signOut">
        <i class="fas fa-sign-out-alt"></i> Đăng xuất
      </button>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import adminService from "@/services/admin.service";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const signOut = async () => {
      try {
        const response = await adminService.signOut();
        authStore.logoutAdmin();
        console.log("Đăng xuất thành công");
        router.push({ name: "signin" });
      } catch (error) {
        console.log(error);
      }
    };
    return { signOut };
  },
};
</script>

<style>
.router-css {
  text-decoration: none;
  color: #fff;
}

/* CSS để làm nổi bật nút đăng xuất */
.btn-sign-out {
  background-color: #d9534f;
  /* Màu nền */
  border-color: #d43f3a;
  /* Màu viền */
  color: #fff;
  /* Màu chữ */
}

.btn-sign-out:hover {
  background-color: #c9302c;
  border-color: #ac2925;
}
</style>

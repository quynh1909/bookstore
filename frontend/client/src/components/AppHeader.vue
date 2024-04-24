<template>
  <div class="header">
    <!-- Navbar -->
    <nav class="container navbar navbar-expand-lg navbar-light bg-light">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Toggle button -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>
        <!-- Logo -->
        <router-link :to="{ name: 'home' }" class="navbar-brand">
          <span class="logo">Tiệm sách nhỏ</span>
        </router-link>
        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Left links -->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <router-link :to="{ name: 'home' }" class="router-css">
              <li class="nav-item">
                <a class="nav-link" href="#">Trang chủ</a>
              </li>
            </router-link>
            <router-link :to="{ name: 'book' }" class="router-css">
              <li class="nav-item">
                <a class="nav-link" href="#">Kho sách</a>
              </li>
            </router-link>
            <!-- <router-link :to="{ name: 'borrow' }" class="router-css">
              <li class="nav-item">
                <a class="nav-link" href="#">Mượn sách</a>
              </li>
            </router-link> -->
            <router-link :to="{ name: 'introduce' }" class="router-css">
              <li class="nav-item">
                <a class="nav-link" href="#">Giới thiệu</a>
              </li>
            </router-link>
            <router-link :to="{ name: 'contact' }" class="router-css">
              <li class="nav-item">
                <a class="nav-link" href="#">Liên hệ</a>
              </li>
            </router-link>
          </ul>
          <!-- Right links -->
          <div class="d-flex align-items-center">
            <form class="d-flex input-group w-auto me-5">
              <input
                type="search"
                class="form-control rounded"
                placeholder="Tìm kiếm"
                aria-label="Tìm kiếm"
                aria-describedby="search-addon"
              />
              <span class="input-group-text border-0" id="search-addon">
                <i class="fas fa-search"></i>
              </span>
            </form>
            <a class="text-reset me-3" href="#">
              <router-link :to="{ name: 'cart' }" class="router-css router-li router-cart">
                <i class="fas fa-shopping-cart"></i>
              </router-link>
              <span class="badge rounded-pill badge-notification bg-danger">
                {{ totalQuantity }}
              </span>
            </a>
            <router-link v-show="isLoggedIn" :to="{ name: 'profile' }" class="router-css">
              <button type="button" class="btn btn-secondary me-2">
                <i class="fas fa-user"></i>
                Tài khoản
              </button>
            </router-link>
            <router-link v-show="!isLoggedIn" :to="{ name: 'signin' }" class="router-css">
              <button type="button" class="btn btn-secondary me-2">
                <i class="fas fa-sign-in-alt"></i>
                Đăng nhập
              </button>
            </router-link>
            <router-link v-show="!isLoggedIn" :to="{ name: 'signup' }" class="router-css">
              <button type="button" class="btn btn-secondary">
                <i class="fas fa-user-plus"></i>
                Đăng ký
              </button>
            </router-link>
            <button v-show="isLoggedIn" @click="handleLogout" class="btn btn-secondary">
              <i class="fas fa-sign-out-alt"></i>
              Đăng xuất
            </button>
          </div>
          <!-- Right links -->
        </div>
        <!-- Collapsible wrapper -->
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useCartStore } from "@/stores/cart.js";

export default {
  setup() {
    const authStore = useAuthStore();
    const cart = useCartStore();
    const isLoggedIn = computed(() => authStore.isUserLoggedIn);
    const totalQuantity = computed(() => cart.totalQuantity);
    const router = useRouter();

    const handleLogout = () => {
      authStore.logout();
      router.push({ name: 'signin' });
    };

    return {
      isLoggedIn,
      totalQuantity,
      handleLogout,
    };
  },
};
</script>

<style>
.logo {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 24px;
  font-weight: bold;
}
</style>

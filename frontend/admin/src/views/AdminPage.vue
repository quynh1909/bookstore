<template>
  <AppHeader />
  <div id="layoutSidenav">
    <SideBar />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import SideBar from "@/components/SideBar.vue";
import router from "../router";
export default {
  components: { router, AppHeader, SideBar },
};
</script>

<style>
@import "@/assets/style.css";
</style>

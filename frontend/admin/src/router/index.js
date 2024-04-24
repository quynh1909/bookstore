import { useAuthStore } from "@/stores/auth";
import { RouterView, createWebHistory, createRouter } from "vue-router";

// import { useStore } from "../stores/store";
const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFoundPage.vue"),
  },

  // Admin
  {
    path: "/signin",
    name: "signin",
    component: () => import("@/views/SignIn.vue"),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.isAdminLoggedIn) {
        next("/home");
      } else {
        next();
      }
    },
  },
  {
    path: "/",
    name: "admin",
    component: () => import("@/views/AdminPage.vue"),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.isAdminLoggedIn) {
        next();
      } else {
        next({ name: "signin" });
      }
    },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/components/Home.vue"),
      },
      {
        path: "/add-book",
        name: "add-book",
        component: () => import("@/views/AddBook.vue"),
      },
      {
        path: "/edit-book/:id",
        name: "edit-book",
        component: () => import("@/views/EditBook.vue"),
      },
      {
        path: "/category-list",
        name: "category-list",
        component: () => import("@/components/CategoryList.vue"),
      },
      {
        path: "/add-category",
        name: "add-category",
        component: () => import("@/views/AddCategory.vue"),
      },
      {
        path: "/edit-category/:id",
        name: "edit-category",
        component: () => import("@/views/EditCategory.vue"),
      },
      {
        path: "/list-customer",
        name: "list-customer",
        component: () => import("@/views/ListCustomer.vue"),
      },
      {
        path: "/list-bill",
        name: "list-bill",
        component: () => import("@/views/ListBill.vue"),
      },
      {
        path: "/detail-bill/:id",
        name: "detail-bill",
        component: () => import("@/views/DetailBill.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

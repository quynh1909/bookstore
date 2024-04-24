import { createWebHistory, createRouter } from "vue-router";
// import { useStore } from "../stores/store";
const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFoundPage.vue"),
  },

  {
    path: "/",
    name: "home",
    component: () => import("@/components/Home.vue"),
  },

  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/SignUp.vue"),
    // beforeEnter: (to, from, next) => {
    //   const store = useStore();
    //   if (store.isAuthenticated) next("/");
    //   else next();
    // },
  },

  {
    path: "/signin",
    name: "signin",
    component: () => import("@/views/SignIn.vue"),
    // beforeEnter: (to, from, next) => {
    //   const store = useStore();
    //   if (store.isAuthenticated) next("/");
    //   else next();
    // },
  },
  {
    path: "/book",
    name: "book",
    component: () => import("@/views/BookPage.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfilePage.vue"),
  },
  {
    path: "/book/:id",
    name: "book-detail",
    component: () => import("@/views/BookDetailPage.vue"),
    props: true,
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/CartPage.vue"),
  },
  {
    path: "/introduce",
    name: "introduce",
    component: () => import("@/views/IntroducePage.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/ContactPage.vue"),
  },
  {
    path: "/cart-detail/:id",
    name: "cart-detail",
    component: () => import("@/views/DetailCartPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

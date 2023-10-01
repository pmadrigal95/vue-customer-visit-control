import { createRouter, createWebHistory } from "vue-router";
import useAuthUser from "@/composables/UseAuthUser";

const routes = [
  {
    name: "Home",
    path: "/",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/pages/Home.vue"),
  },
  {
    name: "Authentication",
    path: "/Authentication",
    component: () =>
      import("@/views/authentication/login/LoginViewComponent.vue"),
  },
  {
    name: "Logout",
    path: "/logout",
    beforeEnter: async () => {
      const { logout } = useAuthUser();
      await logout();
      return { name: "Home" };
    },
  },
  {
    name: "404",
    path: "/404",
    component: () => import("@/views/error/NotFoundViewComponent.vue"),
  },
  { path: '/:pathMatch(.*)*', component: () => import("@/views/error/NotFoundViewComponent.vue"), }
  // {
  //   name: "Register",
  //   path: "/register",
  //   component: () => import("@/pages/Register.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const { isLoggedIn } = useAuthUser();
  if (
    !isLoggedIn() &&
    to.meta.requiresAuth &&
    !Object.keys(to.query).includes("fromEmail")
  ) {
    return { name: "Authentication" };
  }
});

export default router;

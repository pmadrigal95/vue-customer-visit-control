import { createRouter, createWebHistory } from "vue-router";
import useAuthUser from "@/composables/UseAuthUser";

import viewRoutes from '@/views/router';

const routes = [
  ...viewRoutes,
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

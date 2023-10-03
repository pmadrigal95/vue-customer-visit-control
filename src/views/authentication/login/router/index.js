/**
 * ROUTES
 */
import useAuthUser from "@/composables/UseAuthUser";

const routes = [
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
          return { name: "Authentication" };
        },
      },
];

export default routes;
/**
 * ROUTES
 */
const routes = [
  {
    name: "Home",
    path: "/",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/home/HomeViewComponent.vue"),
  },
];

export default routes;
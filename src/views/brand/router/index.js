/**
 * ROUTES
 */
const routes = [
  {
    name: "BrandFilterViewComponent",
    path: "/Brand/Filter",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/brand/BrandFilterViewComponent.vue"),
  },
];

export default routes;
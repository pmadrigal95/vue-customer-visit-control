/**
 * ROUTES
 */
const routes = [
  {
    name: "ProductFilterViewComponent",
    path: "/Product/Filter",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/product/ProductFilterViewComponent.vue"),
  },
];

export default routes;
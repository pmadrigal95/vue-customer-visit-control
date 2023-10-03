/**
 * ROUTES
 */
const routes = [
  {
    name: "CustomerFilterViewComponent",
    path: "/Customer/Filter",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/customer/CustomerFilterViewComponent.vue"),
  },
];

export default routes;
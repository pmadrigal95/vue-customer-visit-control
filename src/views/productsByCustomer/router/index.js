/**
 * ROUTES
 */
const routes = [
  {
    name: "ProductsByCustomerEditorViewComponent",
    path: "/Customer/:customerId/ProductsByCustomer/Editor/:Id?",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/productsByCustomer/ProductsByCustomerEditorViewComponent.vue"),
  },
];

export default routes;
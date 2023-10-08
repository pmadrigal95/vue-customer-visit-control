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

  {
    name: "ProductSearchViewComponent",
    path: "/Product/Search",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/product/ProductSearchViewComponent.vue"),
  },

  {
    name: "ProductEditorViewComponent",
    path: "/Product/Editor/:Id?",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/product/ProductEditorViewComponent.vue"),
  },
];

export default routes;
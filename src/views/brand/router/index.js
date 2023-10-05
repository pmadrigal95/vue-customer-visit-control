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

  {
    name: "BrandSearchViewComponent",
    path: "/Brand/Search",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/brand/BrandSearchViewComponent.vue"),
  },

  {
    name: "BrandEditorViewComponent",
    path: "/Brand/Editor/:Id?",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/brand/BrandEditorViewComponent.vue"),
},
];

export default routes;
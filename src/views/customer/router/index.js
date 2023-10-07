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

  {
    name: "CustomerSearchViewComponent",
    path: "/Customer/Search",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/customer/CustomerSearchViewComponent.vue"),
  },

  {
    name: "CustomerDisplayViewComponent",
    path: "/Customer/:Id",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/customer/CustomerDisplayViewComponent.vue"),
  },

  {
    name: "CustomerEditorViewComponent",
    path: "/Customer/Editor/:Id?",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/customer/CustomerEditorViewComponent.vue"),
  },
];

export default routes;
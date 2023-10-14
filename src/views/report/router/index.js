/**
 * ROUTES
 */
const routes = [
  {
    name: "ReportFilterViewComponent",
    path: "/Report/Filter",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/report/ReportFilterViewComponent.vue"),
  },

  {
    name: "ReportSearchViewComponent",
    path: "/Report/Search",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/report/ReportSearchViewComponent.vue"),
  },

  {
    name: "ReportDisplayViewComponent",
    path: "/Report/:Id",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/report/ReportDisplayViewComponent.vue"),
  },

  {
    name: "ReportEditorViewComponent",
    path: "/Report/Editor/:Id",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/report/ReportEditorViewComponent.vue"),
  },

  {
    name: "ReportAddViewComponent",
    path: "/Report/Add",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/report/ReportAddViewComponent.vue"),
  },
];

export default routes;
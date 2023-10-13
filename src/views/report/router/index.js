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
    name: "ReportDisplayViewComponent",
    path: "/Report/:Id",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/report/ReportDisplayViewComponent.vue"),
  },
];

export default routes;
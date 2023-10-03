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
];

export default routes;
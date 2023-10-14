/**
 * ROUTES
 */

const routes = [
    {
        name: "AnalyticsViewComponent",
        path: "/Analytics",
        component: () =>
          import("@/views/analytics/AnalyticsViewComponent.vue"),
      },
];

export default routes;
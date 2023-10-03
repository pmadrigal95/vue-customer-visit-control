/**
 * ROUTES
 */
const routes = [
  {
    name: "404",
    path: "/404",
    component: () => import("@/views/error/NotFoundViewComponent.vue"),
  },
  { path: '/:pathMatch(.*)*', component: () => import("@/views/error/NotFoundViewComponent.vue"), },
];

export default routes;
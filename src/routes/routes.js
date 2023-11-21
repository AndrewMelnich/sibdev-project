export default [
  {
    path: "/",
    component: () => import('../pages/SearchPage.vue'),
    name: 'search',
    meta: { requiredAuth: true } 
  },
  {
    path: "/login",
    name: 'login',
    component: () => import('../pages/LoginPage.vue'),
    meta: { requiredAuth: false }
  },
  {
    path: "/favourites",
    component: () => import('../pages/FavouritesPage.vue'),
    name: 'favourites',
    meta: { requiredAuth: true }
  },
];


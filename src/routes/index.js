import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/stores/auth';
import routes from './routes'
 
const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = useAuthStore().isAuthenticated
  const requiredAuth = to.meta.requiredAuth

  if (requiredAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router;
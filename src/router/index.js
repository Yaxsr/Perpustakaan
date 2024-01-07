import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authService from '../services/authService'; //add


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/register.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../components/admin.vue'),
      meta: { requiresAuth: true }//add
    },

    {
      path: '/peminjaman',
      name: 'peminjaman',
      component: () => import('../components/peminjaman.vue'),
      meta: { requiresAuth: true }//add
    },
    {
      path: '/pengembalian',
      name: 'pengembalian',
      component: () => import('../components/pengembalian.vue'),
      meta: { requiresAuth: true}
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../components/user.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/login.vue')
      
    },
    {
      path: '/Member',
      name: 'Member',
      component: () => import('../components/Member.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../components/dashboard.vue')
    }
  
  ]
});


router.beforeEach((to, from, next) => {
  console.log('Checking authentication for route:', to.name);
  console.log('Is authenticated?', authService.isAuthenticated());

  function getCookie(namaCookie) {
    var namaCookieEQ = namaCookie + "=";
    var daftarCookies = document.cookie.split(';');

    for (var i = 0; i < daftarCookies.length; i++) {
        var cookie = daftarCookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(namaCookieEQ) === 0) {
            return cookie.substring(namaCookieEQ.length, cookie.length);
        }
    }
    return false;
}

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated

    // if (!authService.isAuthenticated() && !localStorage.getItem('isAuthenticated') ) {
      if (!getCookie('isAuth')) {
      // Redirect to the login page if not authenticated
      console.log('Redirecting to login');
      next('/login');
    } else {
      // Proceed to the intended route if authenticated
      console.log('Authenticated, proceeding to', to.name);
      next();
    }
  } else {
    // Allow access to routes that do not require authentication
    console.log('Route does not require authentication');
    next();
  }
});











//add
// Navigation guard to check if the route requires authentication
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // Check if the user is authenticated
//     if (!authService.isAuthenticated()) {
//       // Redirect to the login page if not authenticated
//       next('/login');
//     } else {
//       // Proceed to the intended route if authenticated
//       next();
//     }
//   } else {
//     // Allow access to routes that do not require authentication
//     next();
//   }
// });
// //add

export default router

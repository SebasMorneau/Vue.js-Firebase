import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewMovie from '@/components/NewMovie'
import ViewMovie from '@/components/ViewMovie'
import EditMovie from '@/components/EditMovie'
import Login from '@/components/Login'
import Register from '@/components/Register'
import firebase from 'firebase'



Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiredGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiredGuest: true
      }
    },
    {
      path: '/new',
      name: 'newmovie',
      component: NewMovie,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/edit/:movie_id',
      name: 'edit-movie',
      component: EditMovie,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/:movie_id',
      name: 'view-movie',
      component: ViewMovie,
      meta: {
        requiredAuth: true
      }
    }
  ]
});

// NAV GUARDS

router.beforeEach((to, from, next) => {
  // Check for requireAuth guard
  if (to.matched.some(record => record.meta.requiredAuth)) {
    // Check if not logged in
    if (!firebase.auth().currentUser) {
      // Go to Login Page
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiredGuest)) {
    // Check if logged in
    if (firebase.auth().currentUser) {
      // Go to Login Page
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;

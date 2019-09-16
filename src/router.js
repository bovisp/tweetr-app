import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "about" */ './components/Home.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "about" */ './views/auth/Signup.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "about" */ './views/auth/Signin.vue')
    },
    {
      path: '/settings/profile',
      component: () => import(/* webpackChunkName: "about" */ './components/user/settings/Profile.vue')
    },
    {
      path: '/settings/password',
      component: () => import(/* webpackChunkName: "about" */ './components/user/settings/ChangePassword.vue')
    },
    {
      path: '/favorites',
      component: () => import(/* webpackChunkName: "about" */ './components/user/profile/FavoriteTweets.vue')
    },
    {
      path: '/:username/favorites',
      component: () => import(/* webpackChunkName: "about" */ './components/user/profile/FavoriteTweets.vue'),
      props: true
    },
    {
      path: '/followers',
      component: () => import(/* webpackChunkName: "about" */ './components/user/profile/UserFollowers.vue')
    },
    {
      path: '/:username/followers',
      component: () => import(/* webpackChunkName: "about" */ './components/user/profile/UserFollowers.vue'),
      props: true
    },
    {
      path: '/following',
      component: () => import(/* webpackChunkName: "about" */ './components/user/profile/UsersFollowing.vue')
    },
    {
      path: '/:username/following',
      component: () => import(/* webpackChunkName: "about" */ './components/user/profile/UsersFollowing.vue'),
      props: true
    },
    {
      path: '/:username',
      component: () => import(/* webpackChunkName: "about" */ './components/user/profile/UserProfile.vue')
    },
    {
      path: '/:username/status/:id',
      component: () => import(/* webpackChunkName: "about" */ './components/tweets/ViewTweet.vue'),
      props: true
    }
  ]
})

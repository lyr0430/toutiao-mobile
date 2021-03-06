import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/login' },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      { path: '/', component: () => import('@/views/home') },
      { path: 'qa', name: 'qa', component: () => import('@/views/qa') },
      { path: 'my', name: 'my', component: () => import('@/views/my') },
      { path: 'video', name: 'video', component: () => import('@/views/video') }
    ]
  },
  { path: '/login', name: 'login', component: () => import('@/views/login') }
]

const router = new VueRouter({
  routes
})

export default router

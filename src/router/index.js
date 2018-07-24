import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/Index.vue'
import Cart from '@/pages/index/Cart.vue'
import Home from '@/pages/index/Home.vue'
import My from '@/pages/index/My.vue'
import Detail from '@/pages/detail/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/home'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children:[
        {
          path: '/index/cart',
          name: 'Cart',
          component: Cart,
        },
        {
          path: '/index/home',
          name: 'Home',
          component: Home,
        },
        {
          path: '/index/my',
          name: 'My',
          component: My,
        }
      ]
    },
    {
      path:'/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from '../views/home.vue'
import category from '../views/category.vue'
import categorylist from '../views/categorylist.vue'
import product from '../views/product.vue'
import cart from '../views/cart.vue'

const routes = [
  {
    path:'/', 
    redirect:'/home'
  },
  {
    path:'/home',
    component:home
  },
  {
    path:'/category',
    component:category
  },
  {
    path:'/categorylist:id',
    component:categorylist,
    // categorylist获取id值
    props:true
  },
  {
    path:'/product/:id',
    component:product,
    props:true
  },
  {
    path:'/cart',
    component:cart
  }
]

const router = new VueRouter({
  routes
})

export default router

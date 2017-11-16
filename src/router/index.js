import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Donglibao from '@/pages/Donglibao'
import Fengmian from '@/pages/Fengmian'
import Youka from '@/pages/Youka'
import Lichengdai from '@/pages/Lichengdai'
import Instructions from '@/pages/Instructions'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'fengmian',
      component: Fengmian
    },
    {
    	path: '/youka',
    	name: 'youka',
    	component: Youka
    },
    {
    	path: '/dlb',
    	name: 'donglibao',
    	component: Donglibao
    },
    {
    	path: '/lcd',
    	name: 'lichengdai',
    	component: Lichengdai
    },
    {
      path: '/instruct',
      name: 'instructions',
      component: Instructions
    }
  ],
  scrollBehavior ( to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
})

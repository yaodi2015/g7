import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Donglibao from '@/pages/Donglibao'
import Fengmian from '@/pages/Fengmian'
import Youka from '@/pages/Youka'
import Lichengdai from '@/pages/Lichengdai'

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
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Donglibao from '@/pages/Donglibao'
import Fengmian from '@/pages/Fengmian'
import Youka from '@/pages/Youka'
import Lichengdai from '@/pages/Lichengdai'
import Instructions from '@/pages/Instructions'
// 车队计算
// import Chedui from '@/pages/chedui/index'
// import CheduiFengmian from '@/pages/chedui/Fengmian'
// import Input from '@/pages/chedui/Input'
// import ResultTop from '@/pages/chedui/ResultTop'
// import ResultBottom from '@/pages/chedui/ResultBottom'
// 贺卡
import HeKa from '@/pages/HeKa'
import HeKaIndex from '@/pages/HeKaIndex'

Vue.use(Router)

const router = new Router({
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
    },
    // {
    //   path: '/chedui',
    //   name: 'chedui',
    //   component: Chedui,
    //   redirect: '/chedui/fengmian',
    //   children: [
    //     {
    //       path: 'fengmian', 
    //       component: CheduiFengmian
    //     },
    //     {
    //       path: 'input', 
    //       component: Input
    //     },
    //     {
    //       path: 'resulttop', 
    //       component: ResultTop
    //     },
    //     {
    //       path: 'resultbottom', 
    //       component: ResultBottom
    //     }
    //   ]
    // },
    // 制作卡片页
    {
      path: '/heka',
      name: 'heka',
      component: HeKa,
      meta: {
        title: '2018新春贺卡'
      }
    },
    // 贺卡页入口
    {
      path: '/hekaindex',
      name: 'HeKaIndex',
      component: HeKaIndex,
      meta: {
        title: '2018新春贺卡'
      }
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

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router

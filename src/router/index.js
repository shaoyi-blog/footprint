import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import echart from '@/components/echart'
import footmap from '@/components/footmap'
import addInfo from '@/components/addInfo'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index
      }
  ]
})

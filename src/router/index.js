import Vue from 'vue'
import Router from 'vue-router'
import Lembrete from '@/components/Lembrete'
import Livro from '@/components/Livro'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lembretes',
      component: Lembrete
    },

    {
      path: '/livro',
      name: 'livro',
      component: Livro
    }
  ]
})

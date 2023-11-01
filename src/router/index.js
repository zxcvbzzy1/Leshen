import {createRouter, createWebHistory} from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: ()=>import('../views/login.vue'),

    },
    {
      path: '/layout/:username',
      name: 'layout',
      component: ()=>import('../layout/layout.vue'),
      children: [
        {
          path: '/:username',
          name:'Information',
          component:()=>import('../views/Information.vue')
        },
        {
          path: '/charts-:username',
          name:'charts',
          component:()=>import('../console/console.vue')
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component:()=>import('../views/404.vue')
    },
  ]
})
router.beforeEach(async (to, from) => {

  const token = sessionStorage.getItem('token')
  if (to.name !== 'login' && !token ) {
    return { name: 'login' }
  } else {
    return true
  }
});
export default router

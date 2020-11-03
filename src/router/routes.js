const routes = [{
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'speaking',
        component: () => import('pages/speaking.vue')
      },
      {
        path: 'options',
        component: () => import('pages/options.vue')
      },
      {
        path: 'reportIssue',
        component: () => import('pages/reportIssue.vue')
      },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

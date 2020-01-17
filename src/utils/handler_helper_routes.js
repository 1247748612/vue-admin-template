import Layout from '@/layout'

const helperRoute = {
  path: '/helper',
  component: Layout,
  redirect: '/helper/1',
  name: 'helper',
  meta: {
    title: '历史消息',
    icon: 'nested'
  },
  children: []
}

export default function handlerHelperRoutes(data) {
  const children = []
  data.forEach((item, index) => {
    children.push({
      path: `${item.id}`,
      component: () => import('@/views/helper'),
      name: `Helper-${item.id}`,
      meta: { title: item.nickname },
      props: (route) => ({ helperId: item.id })
    })
  })
  if (children.length) {
    helperRoute.redirect = `/helper/${children[0].path}`
  }
  helperRoute.children = children
  return [helperRoute, { path: '*', redirect: '/dashboard', hidden: true }
  ]
}

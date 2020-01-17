import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/limahua_admin/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/currentAdmin',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/limahua_admin/logout',
    method: 'post'
  })
}

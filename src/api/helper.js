import request from '@/utils/request'

// 获取所有客服
export function getHelperList() {
  return request({
    url: '/helpers/listAll',
    method: 'get'
  })
}

// 添加客服
export function addHelper(data) {
  return request({
    url: '/helpers',
    method: 'post',
    data
  })
}

// 修改客服
export function updateHelper(data) {
  return request({
    url: '/helpers',
    method: 'put',
    data
  })
}

// 删除客服
export function deleteHelper(data) {
  return request({
    url: '/helpers',
    method: 'delete',
    data
  })
}

// 逻辑删除该用户
export function deleteUser(id) {
  return request({
    url: `/users/delete/${id}`,
    method: 'put'
  })
}

// 获取所有用户
export function getHelperUser(helperId) {
  return request({
    url: `/users/manage/${helperId}`,
    method: 'get'
  })
}

import request from '@/utils/request'

// 获取该客服和该用户的聊天记录
export function getHelperAndUserMessage(params) {
  return request({
    url: 'chat-historys',
    method: 'get',
    params
  })
}

// 批量删除聊天记录
export function deleteAllMessage(data) {
  return request({
    url: 'chat-historys',
    method: 'delete',
    data
  })
}

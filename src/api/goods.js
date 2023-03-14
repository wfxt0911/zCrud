import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/goods/list',
    method: 'get',
    params
  })
}


export function getDetailById(params) {
  return request({
    url: '/goods/detail',
    method: 'get',
    params
  })
}


import request from "@/utils/axios"

export function loginAPI(data: { username: string, password: string }) {
  return request({
    url: "/user/login",
    method: "post",
    data
  })
}

export function registerAPI(data: { username: string, password: string }) {
  return request({
    url: "/user/register",
    method: "post",
    data
  })
}

export function getBillTypesAPI() {
  return request({
    url: "/type/get/types",
    method: 'get'
  })
}

export function getBillListAPI(params: { type_id: string | number, date: string, page_no: string | number, page_size: string | number }) {
  return request({
    url: "/bill/get/list",
    method: "get",
    params
  })
}

export function getPayTypeListAPI(params: { pay_type: number }): Promise<{ data: any[], code: number }> {
  return request({
    url: "/type/get/types",
    method: "get",
    params
  })
}

export function commitNewBillAPI(data: any) {
  return request({
    url: "/bill/add",
    method: "post",
    data
  })
}
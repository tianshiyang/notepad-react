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
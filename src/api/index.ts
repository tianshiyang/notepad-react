import request from "@/utils/axios"

export function loginAPI(data: { username: string, password: string }) {
  return request({
    url: "/user/login",
    method: "post",
    data
  })
}
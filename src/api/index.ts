import request from "@/utils/axios"

export function test() {
  return request({
    url: "/test",
    method: "get"
  })
}
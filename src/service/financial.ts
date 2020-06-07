import { httpRequest } from "@/service/index";
//获取薪资表
export const userFin = () => {
  return httpRequest.request({
    url: 'sign/month'
  })
}
import { httpRequest2 } from "@/service/index";

//头像上传资源服务器
export const uploadImg = (file: FormData) => {
  return httpRequest2.request({
    method: 'post',
    url: 'api/1/upload/',
    headers:{'Content-Type':'multipart/form-data'},
    data: file,
    params: {
      'key': '53942cc0d280835bae497e559a35aa10'
    }
  })
}
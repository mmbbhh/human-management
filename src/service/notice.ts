import { httpRequest } from "@/service/index";

export const uploadNotice = (content: String) => {
  return httpRequest.request({
    url: 'notice/upload',
    params: {
      "content": content
    }
  })
}
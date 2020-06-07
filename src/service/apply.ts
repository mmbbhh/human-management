import { httpRequest } from "@/service/index";
import moment from "moment";

interface applyOptions {
  id: number,
  message: string,
  uid: number,
  state: string,
  reason?: any,
  date: string,
  title: string,
  username: string
}

export class Apply {
  data: Array<applyOptions>
  constructor(option: Array<applyOptions>) {
    this.data = option
  }
  static fromJson(json:any) {
    let option: Array<applyOptions> = []
    for (let item of json) {
      let state:string
      switch (item["check"]) {
        case 0:
          state = "未审核"
          break
        case 1:
          state = "已通过"
          break
        default:
          state = "被拒绝"
      }
      option.push({
        id: item.id,
        message: item.message,
        uid: item.uid,
        state: state,
        reason: item.reason,
        date: moment(item.date).format('YYYY-MM-DD'),
        title: item.title,
        username: item.username
      })
    }
    return new Apply(option)
  }
}



//获取自己申请
export const getApply = () => {
  return httpRequest.request({
    url: 'apply'
  })
}

//获取部门下属申请
export const staffApply = () => {
  return httpRequest.request({
    url: 'apply/staffApply'
  })
}

//提交申请
export const pushApply = (content: string, title: string) => {
  return httpRequest.request({
    url: 'apply/upload',
    params: {
      "content": content,
      "title": title
    }
  })
}

//审核申请
export const check = (id: number, bol: boolean, reason: string) => {
  return httpRequest.request({
    url: 'apply/staffApply/check',
    params: {
      "reason": reason,
      "id": id,
      "bol": bol
    }
  })
}
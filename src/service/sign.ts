import { httpRequest } from "@/service/index";
import moment from "moment";
import { translate } from "@/utils/translate";

interface signOptions {
  id: number
  date: string
  name: string
}

export class signInfo {
  content: Array<signOptions>
  constructor(sign: Array<signOptions>) {
    this.content = sign
  }
  static create(json:any) {
    let option: Array<signOptions> = []
    for (let item of json) {
      option.push({
        id: item.id,
        date: moment(item.date).format('YYYY-MM-DD'),
        name: item.name
      })
    }
    return new signInfo(option)
  }
}

//提交签到
export const sign = () => {
  return httpRequest.request({
    url: 'sign'
  })
}

//获取签到信息
export const allSign = () => {
  return httpRequest.request({
    url: 'sign/all'
  })
}

//获取部门下属签到申请信息
export const checkSign = () => {
  return httpRequest.request({
    url: 'sign/check'
  })
}

//提交签到确认
export const submitSign = (list:number[], bol:number) => {
  let type:Boolean;
  if ( bol == 1 ) {
    type = true
  } else {
    type = false
  }
  const data = translate({
    list: list,
    bol: type
  })
  return httpRequest.request({
    method: 'post',
    url: 'sign/submit',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  })
}
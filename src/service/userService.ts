import {httpRequest} from "@/service/index";
import store from "@/store";
import { translate } from "@/utils/translate";


interface UserOption {
  id?: string,
  username?: string,
  password?: string,
  checkPassword?: string,
  token?: string
}

export class User {
  option: UserOption

  constructor(option: UserOption) {
    this.option = option
  }

  static fromJson(json: any): User {
    const options: UserOption = {
      id: json['id'],
      username: json['login_name'],
      token: json['token']
    }
    return new User(options);
  }
}

//登录
export const token = (option: UserOption) => {
  const user = new User(option)
  const data = translate(user.option) + translate({
    grant_type: "password",
    client_id: "password",
    scope: 'all',
    client_secret: 123
  })
  return httpRequest.request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    url: 'oauth/token',
    data: data
  })
}

//刷新token
export const refresh = () => {
  if (store.getters.refreshToken !== '') {
    const data = translate({
      grant_type: "refresh_token",
      client_id: "password",
      refresh_token: store.state.refresh,
      client_secret: 123
    })
    return httpRequest.request({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      url: 'oauth/token',
      data: data
    }).then(res => {
      store.commit('addToken', res.data.access_token)
    }, rej => {
      return rej
    })
  }
}

//获取登录信息
export const login = () => {
  return httpRequest.request({
    url: 'user'
  })
}

//获取通知消息
export const info = () => {
  return httpRequest.request({
    url: 'notice'
  })
}

//修改用户信息
export const editInfo = (oPwd: String, nPwd: String, tel: string, imgUrl: string) => {
  const data = translate({
    oPwd: oPwd,
    nPwd: nPwd,
    phone: tel,
    imgUrl: imgUrl
  })
  return httpRequest.request({
    method: 'post',
    url: 'user/edit',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  })
}

//获取所有用户信息
export const allUser = () => {
  return httpRequest.request({
    url: 'user/all'
  })
}

//删除用户
export const delUser = (id: number) => {
  const data = translate({
    id: id
  })
  return httpRequest.request({
    method: 'post',
    url: 'user/delete',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  })
}

//修改用户
export const EditUser = (user: any) => {
  const data = translate({
    id: user.id,
    name: user.name,
    user_name: user.user_name,
    tel: user.tel,
    age: user.age,
    sex: user.sex,
    pay: user.pay,
    addr: user.addr,
    did: user.dep,
    rid: user.position
  })
  return httpRequest.request({
    method: 'post',
    url: 'user/editInfo',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  })
}

//添加用户
export const addUser = (user: any) => {
  const data = translate({
    name: user.name,
    user_name: user.user_name,
    password: user.password,
    tel: user.tel,
    age: user.age,
    sex: user.sex,
    pay: user.pay,
    addr: user.addr,
    did: user.dep,
    rid: user.position
  })
  return httpRequest.request({
    method: 'post',
    url: 'user/addUser',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  })
}
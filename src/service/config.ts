import axios, {AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse} from "axios";
import store from "@/store";
import {httpRequest} from "@/service/index";

export class HttpRequest {
  constructor(public baseUrl: string, public timeout: number) {
    this.baseUrl = baseUrl
    this.timeout = timeout
  }

  //配置合并
  private mergeConfig(config: AxiosRequestConfig): AxiosRequestConfig {
    config = Object.assign({
      baseURL: this.baseUrl,
      timeout: this.timeout,
    }, config)
    return config
  }

  //参数转化为表单
  private translate(data:any) {
    let ret = ''
    for(let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }

  //拦截器
  private interceptors(instance: AxiosInstance, url?: string) {

    //请求拦截
    instance.interceptors.request.use((config: AxiosRequestConfig) => {
        if (store.getters.token) {
          config.params = {
            "access_token": store.getters.token,
            ...config.params
          }
        }
        return config
      })

    //响应拦截
    instance.interceptors.response.use((res: AxiosResponse) => {
        return res
      },
      error => {
        return Promise.resolve(error.response)
      })
  }

  public request(config: AxiosRequestConfig): AxiosPromise {
    const app: AxiosInstance = axios.create()
    config = this.mergeConfig(config)
    this.interceptors(app, config.url)
    return app(config)
  }
}

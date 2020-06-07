import { HttpRequest } from "./config";

const api = {
  devApiBaseUrl: 'http://127.0.0.1:7456/',
  proApiBaseUrl: 'http://123.57.217.239:3344/',
}

//判断环境确定api
const apiBaseUrl = process.env.NODE_ENV === 'production' ? api.proApiBaseUrl : api.devApiBaseUrl;

export const httpRequest = new HttpRequest(apiBaseUrl, 5000)
export const httpRequest2 = new HttpRequest('http://123.57.217.239:8889/', 5000)

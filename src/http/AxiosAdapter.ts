import axios from 'axios'

import {IHttp, IResponse} from './IHttp'
import {ILogger} from '../logger'

class AxiosAdapter implements IHttp
{
  #logger:ILogger

  constructor(logger:ILogger){
    this.#logger = logger
  }

  async get(url: string, headers?: any): Promise<IResponse> {
    const result = await axios.get(url)

    return {
      status: result.status,
      data: result.data,
      headers: result.headers
    }
  }
  async post(url: string, data?: any, headers?: any): Promise<IResponse> {
    const result = await axios.post(url, data, {
      headers: headers
    })
    return {
      status: result.status,
      data: result.data,
      headers: result.headers
    }
  }
  async put(url: string, data?: any, headers?: any): Promise<IResponse> {
    const result = await axios.put(url, data,{
      headers: headers
    })
    return {
      status: result.status,
      data: result.data,
      headers: result.headers
    }
  }
  async delete(url: string, data?: any, headers?: any): Promise<IResponse> {
    const result = await axios.delete(url, {
      headers: headers, data: data
    })
    return {
      status: result.status,
      data: result.data,
      headers: result.headers
    }
  }
  // async sendRequest(url: string, method: string, data?: any, headers?: any): Promise<IResponse> {
  //   const result = await axios.request({
  //     method: method,
  //     url: url,
  //     data: data,
  //     headers: headers
  //   })
  //   return {
  //     status: result.status,
  //     data: result.data,
  //     headers: result.headers
  //   }
  // }
}

export {AxiosAdapter as default, AxiosAdapter}
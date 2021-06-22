import {IHttp, IResponse} from './IHttp'

class FetchAdapter implements IHttp
{
  async get(url: string, headers?: any): Promise<IResponse> {
    const result = await fetch(url)
    const data = await result.json()

    return {
      status: result.status,
      data: data,
      headers: result.headers
    }
  }
  async post(url: string, data?: any, headers?: any): Promise<IResponse> {
    const result = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
    const _data = await result.json()

    return {
      status: result.status,
      data: _data,
      headers: result.headers
    }
  }
  async put(url: string, data?: any, headers?: any): Promise<IResponse> {
    const result = await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
    })
    const _data = await result.json()
    return {
      status: result.status,
      data: _data,
      headers: result.headers
    }
  }
  async delete(url: string, data?: any, headers?: any): Promise<IResponse> {
    const result = await fetch(url, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(data)
    })
    const _data = await result.json()
    return {
      status: result.status,
      data: _data,
      headers: result.headers
    }
  }
  async sendRequest(url: string, method: string, data?: any, headers?: any): Promise<IResponse> {
    const result = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(data)
    })
    const _data = await result.json()
    return {
      status: result.status,
      data: _data,
      headers: result.headers
    }
  }
}

export {FetchAdapter as default, FetchAdapter}
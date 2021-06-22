

interface IHttp
{
  get(url: string, headers?: any): Promise<IResponse>
  post(url: string, data?: any, headers?: any): Promise<IResponse>
  put(url: string, data?: any, headers?: any): Promise<IResponse>
  delete(url: string, data?: any, headers?: any): Promise<IResponse>
  // sendRequest(url: string, method: string, data?: any, headers?: any): Promise<iResponse>
}

interface IResponse
{
  status: number
  data: any
  headers: any
}

export {IHttp as default, IHttp, IResponse}
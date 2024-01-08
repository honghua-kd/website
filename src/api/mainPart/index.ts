import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  MortgageSubjectListRequest,
  MortgageSubjectAddRequest,
  MortgageSubjectEditRequest,
  MortgageSubjectDeleteRequest
} from './types/request'
import type {
  MortgageSubjectListResponse,
  ContractSubjectResponse
} from './types/response'

const prefix = '/operations-mortgage'
export class MainPartAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 抵押主体-分页数据
  getMortgageSubjectList(
    data: MortgageSubjectListRequest
  ): Response<PageList<MortgageSubjectListResponse>> {
    return this.request({
      url: `${prefix}/admin-api/mortgageSubject/query`,
      method: 'post',
      data
    })
  }

  // 抵押主体-添加
  getMortgageSubjectAdd(
    data: MortgageSubjectAddRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgageSubject/add`,
      method: 'post',
      data
    })
  }

  // 抵押主体-修改
  getMortgageSubjectModify(
    data: MortgageSubjectEditRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgageSubject/modify`,
      method: 'post',
      data
    })
  }

  // 抵押主体-删除
  getMortgageSubjectDelete(
    data: MortgageSubjectDeleteRequest
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgageSubject/delete`,
      method: 'post',
      data
    })
  }

  // 查询合同主体(全量)
  getContractSubject(): Response<ContractSubjectResponse[]> {
    return this.request({
      url: `${prefix}/admin-api/mortgageSubject/queryContractSubject`,
      method: 'post'
    })
  }
}

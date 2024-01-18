import { useRequest } from '@toystory/lotso'
import requestConfig from '@/config/request.config'
import type { Response, PageList } from '../types/response'

import type { RequestConfig } from '@toystory/lotso'
import type { AxiosInstance } from 'axios'
import type {
  RuleListRequest,
  EditRuleRequest,
  OnOffRequest,
  DeleteRuleReuest
} from './types/request'
import type { RuleItemResponse } from './types/response'
const prefix = '/operations-mortgage'

export class RuleAPI {
  private request: AxiosInstance
  constructor(readonly options?: RequestConfig) {
    const requestOptions = Object.assign({}, requestConfig, options)
    this.request = useRequest(requestOptions)
  }

  // 查询规则列表
  getRuleList(data: RuleListRequest): Response<PageList<RuleItemResponse>> {
    return this.request({
      url: `${prefix}/admin-api/mortgageAllocationRule/query`,
      method: 'post',
      data
    })
  }

  // 新增规则
  addRule(
    data: Omit<EditRuleRequest, 'allocationRuleCode'>
  ): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgageAllocationRule/add`,
      method: 'post',
      data
    })
  }

  // 编辑规则
  editRule(data: EditRuleRequest): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgageAllocationRule/modify`,
      method: 'post',
      data
    })
  }

  // 删除规则
  delRule(data: DeleteRuleReuest): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgageAllocationRule/delete`,
      method: 'post',
      data
    })
  }

  // 启用/停用规则
  onOffRule(data: OnOffRequest): Response<boolean | null | undefined> {
    return this.request({
      url: `${prefix}/admin-api/mortgageAllocationRule/modifyIsUsed`,
      method: 'post',
      data
    })
  }
}

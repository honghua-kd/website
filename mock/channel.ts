const VITE_API = '/api/operations-mortgage'
export const channel = [
  {
    url: `${VITE_API}/admin-api/mortgage/agency/config/page`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          list: [
            {
              id: 'string1',
              sourceSystem1: 'string',
              sourceSystem2: 'string',
              agencyCode: 'string',
              agencyName: 'ppp',
              createGatherFlag: 0,
              unpaidNeedApproveFlag: 0,
              creator: 'string',
              creatorName: 'string',
              createTime: 'string',
              updater: 'string',
              updaterName: 'string',
              updatedTime: 'string'
            },
            {
              id: 'string2',
              sourceSystem1: 'string',
              sourceSystem2: 'string',
              agencyCode: 'string',
              agencyName: 'xxx',
              createGatherFlag: 0,
              unpaidNeedApproveFlag: 0,
              creator: 'string',
              creatorName: 'string',
              createTime: 'string',
              updater: 'string',
              updaterName: 'string',
              updatedTime: 'string'
            }
          ],
          total: 67,
          pageSize: 10,
          pageNo: 1,
          totalPage: 7
        },
        msg: 'string'
      }
    }
  },
  {
    url: `${VITE_API}/admin-api/mortgage/agency/config/detail`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          id: 'qqqq',
          sourceSystem1: 'sourceSystem1',
          sourceSystem2: 'sourceSystem2',
          agencyCode: 'string',
          agencyName: 'qwe',
          createGatherFlag: 1,
          unpaidNeedApproveFlag: 0
        },
        msg: 'string'
      }
    }
  },
  {
    url: `${VITE_API}/admin-api/mortgage/agency/config/edit`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: true,
        msg: 'string'
      }
    }
  },
  {
    url: `${VITE_API}/admin-api/mortgage/agency/config/save`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: true,
        msg: 'string'
      }
    }
  },
  {
    url: `${VITE_API}/admin-api/mortgage/agency/config/delete`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: true,
        msg: 'string'
      }
    }
  }
]

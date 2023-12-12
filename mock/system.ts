const VITE_API = '/api/operations-management'

export const system = [
  {
    url: `${VITE_API}/system/role/page`,
    method: 'post',
    response: () => {
      return {
        msg: '操作成功',
        code: 200,
        data: {
          list: [
            {
              createTime: 1609912175000,
              updateTime: 1690300412000,
              creator: '',
              updater: '1',
              deleted: false,
              tenantId: 1,
              id: 101,
              name: '测试账号',
              code: 'test',
              sort: 0,
              status: 0,
              type: 2,
              remark: '132',
              dataScope: 1,
              dataScopeDeptIds: []
            },
            {
              createTime: 1609837428000,
              updateTime: 1645477700000,
              creator: 'admin',
              updater: '',
              deleted: false,
              tenantId: 1,
              id: 2,
              name: '普通角色',
              code: 'common',
              sort: 2,
              status: 1,
              type: 1,
              remark: '普通角色',
              dataScope: 2,
              dataScopeDeptIds: null
            },
            {
              createTime: 1609837428000,
              updateTime: 1645477701000,
              creator: 'admin',
              updater: '',
              deleted: false,
              tenantId: 1,
              id: 1,
              name: '超级管理员',
              code: 'super_admin',
              sort: 1,
              status: 0,
              type: 1,
              remark: '超级管理员',
              dataScope: 1,
              dataScopeDeptIds: null
            }
          ],
          total: 3
        },
        success: true
      }
    }
  }
]

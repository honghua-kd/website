
const VITE_API = '/api'

export const system = [
  {
    url: `${VITE_API}/system/role/page`,
    method: 'post',
    response: (config) => {
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
              dataScopeDeptIds: [

              ]
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
  },
  {
    url: `${VITE_API}/system/user/page`,
    method: 'post',
    response: (config) => {
      return {
        msg: '操作成功',
        code: 200,
        data: {
          list: [
            {
              username: 'goudan',
              nickname: '狗蛋',
              remark: null,
              deptId: 103,
              postIds: [
                1
              ],
              email: '',
              mobile: '',
              sex: 2,
              avatar: '',
              id: 118,
              status: 0,
              loginIp: '123.127.234.178',
              loginDate: 1698212977000,
              createTime: 1657359883000,
              dept: {
                id: 103,
                name: '研发部门'
              }
            },
            {
              username: 'admin123',
              nickname: '测试号',
              remark: '1111',
              deptId: 100,
              postIds: [
                2
              ],
              email: '',
              mobile: '15601691234',
              sex: 1,
              avatar: '',
              id: 117,
              status: 0,
              loginIp: '',
              loginDate: null,
              createTime: 1657359626000,
              dept: {
                id: 100,
                name: '芋道源码'
              }
            },
            {
              username: 'aotemane',
              nickname: '1',
              remark: '11',
              deptId: 101,
              postIds: [

              ],
              email: '',
              mobile: '',
              sex: 1,
              avatar: '',
              id: 115,
              status: 0,
              loginIp: '',
              loginDate: null,
              createTime: 1651258543000,
              dept: {
                id: 101,
                name: '深圳总公司'
              }
            },
            {
              username: 'hrmgr',
              nickname: 'hr 小姐姐',
              remark: null,
              deptId: null,
              postIds: [
                3
              ],
              email: '',
              mobile: '',
              sex: 0,
              avatar: '',
              id: 114,
              status: 0,
              loginIp: '123.113.154.15',
              loginDate: 1697677264000,
              createTime: 1647697858000,
              dept: null
            },
            {
              username: 'newobject',
              nickname: '新对象',
              remark: null,
              deptId: 100,
              postIds: [

              ],
              email: '',
              mobile: '',
              sex: 1,
              avatar: '',
              id: 112,
              status: 0,
              loginIp: '0:0:0:0:0:0:0:1',
              loginDate: 1676008093000,
              createTime: 1645614483000,
              dept: {
                id: 100,
                name: '芋道源码'
              }
            },
            {
              username: 'test',
              nickname: '测试号',
              remark: null,
              deptId: 107,
              postIds: [
                1,
                2
              ],
              email: '111@qq.com',
              mobile: '15601691200',
              sex: 1,
              avatar: '',
              id: 104,
              status: 0,
              loginIp: '122.224.93.74',
              loginDate: 1698633630000,
              createTime: 1611166433000,
              dept: {
                id: 107,
                name: '运维部门'
              }
            },
            {
              username: 'yuanma',
              nickname: '源码',
              remark: null,
              deptId: 106,
              postIds: null,
              email: 'yuanma@iocoder.cn',
              mobile: '15601701300',
              sex: 0,
              avatar: '',
              id: 103,
              status: 0,
              loginIp: '114.253.250.65',
              loginDate: 1694679928000,
              createTime: 1610553035000,
              dept: {
                id: 106,
                name: '财务部门'
              }
            },
            {
              username: 'yudao',
              nickname: '芋道',
              remark: '不要吓我',
              deptId: 104,
              postIds: [
                1
              ],
              email: 'yudao@iocoder.cn',
              mobile: '15601691300',
              sex: 1,
              avatar: '',
              id: 100,
              status: 1,
              loginIp: '127.0.0.1',
              loginDate: 1657379013000,
              createTime: 1609981637000,
              dept: {
                id: 104,
                name: '市场部门'
              }
            },
            {
              username: 'admin',
              nickname: '芋道源码',
              remark: '管理员',
              deptId: 103,
              postIds: [
                1
              ],
              email: 'aoteman@126.com',
              mobile: '15612345678',
              sex: 1,
              avatar: 'http://test.yudao.iocoder.cn/e1fdd7271685ec143a0900681606406621717a666ad0b2798b096df41422b32f.png',
              id: 1,
              status: 0,
              loginIp: '117.44.202.102',
              loginDate: 1699256237000,
              createTime: 1609837427000,
              dept: {
                id: 103,
                name: '研发部门'
              }
            }
          ],
          total: 9
        }
      }
    }
  }
]

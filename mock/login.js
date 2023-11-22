import authData from './data/authData'

// const VITE_APP_SERVER_SER = '/api/portalBackend'
const VITE_API = '/api'
export const login = [
  {
    url: `${VITE_API}/login`,
    method: 'post',
    response: (config) => {
      // const { username } = config.body
      return {
        msg: '操作成功',
        code: 200,
        data: {
          targetSystemName: 'FLS-BIZ-COMM-CCM',
          userId: 'XUEXIANGQIAN585'
        },
        success: true
      }
    }
  },
  {
    url: `${VITE_API}/bpmAuthTokenRegister/register`,
    type: 'post',
    response (config) {
      const { systemCode } = config.body
      if (!systemCode) {
        return {
          code: 500,
          msg: '参数错误',
          success: false,
          data: null,
          time: '2021-11-03 18:37:24'
        }
      } else {
        return {
          code: 200,
          msg: '操作成功',
          success: true,
          data: {
            token: '0852421302BDB2C8C4264DF99EDE465F'
          },
          time: '2021-11-03 18:37:24'
        }
      }
    }
  },
  {
    url: `${VITE_API}/user/v1/getPermission`,
    type: 'get',
    response (config) {
      return {
        code: 102200000,
        msg: '操作成功',
        success: true,
        data: {
          role: [
            {
              roleNo: 'admin',
              roleName: '超级管理员'
            }
          ],
          data: authData
        },
        time: '2023-11-22 13:16:50'
      }
    }
  },
  {
    url: `${VITE_API}/logout`,
    type: 'post',
    response () {
      return {
        msg: '操作成功',
        code: 200,
        success: true
      }
    }
  },
  {
    url: `${VITE_API}/user/v1/getInfo`,
    type: 'get',
    response () {
      return {
        code: 200,
        msg: 'success',
        data: {
          staffCode: '103388',
          staffName: '郑拓',
          gender: '',
          workplace: '恒信',
          staffType: null,
          deptmentId: '545',
          deptmentName: '金融科技部',
          deptmentSecId: '664',
          deptmentSecName: '系统研发二部',
          deptmentThrId: '',
          deptmentThrName: '',
          positionId: '2899',
          positionName: '前端开发岗',
          stat: '在职',
          email: 'hthxoa@devutflc.com',
          phoneNumber: '18611111111',
          pwdUpdateTime: null,
          password: null
        }
      }
    }
  },
  {
    url: '/api/pacas/responseCode',
    type: 'get',
    response () {
      return {
        msg: '操作成功',
        code: 200,
        data: ['101301500', '101402900', '101403000', '101403100', '101302800'],
        success: true
      }
    }
  }
]

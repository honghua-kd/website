import authData from './data/authData'

// const VITE_APP_SERVER_SER = '/api/portalBackend'
const VITE_API = '/api/operations-management'
export const login = [
  {
    url: `${VITE_API}/user/v1/getPermission`,
    type: 'get',
    response() {
      return {
        code: 200,
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
    url: `${VITE_API}/user/v1/getInfo`,
    type: 'get',
    response() {
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
  }
]

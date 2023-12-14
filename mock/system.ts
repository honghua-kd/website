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
  },
  {
    url: `${VITE_API}/admin-api/file/attachment/upload`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          fileCode: 'LX_1735196162010386503_1',
          fileCodes: null
        },
        msg: ''
      }
    }
  },
  {
    url: `${VITE_API}/admin-api/file/attachment/batchGetAttachmentPreview`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          previewInfoList: [
            {
              fileCode: 'LX_1735188672837324877_1',
              fileName: 'login-bg2.jpg',
              filePreview:
                'https://uatpan.utfinancing.com:443/v4/thumb/files/image?contentJson=%7B%22accountId%22%3A%221%22%2C%22encryptSwitch%22%3A%22false%22%2C%22sessionId%22%3A%2268e802bcdde948aca4c784aa7773937b%22%7D&hash=58c8d2a2308eff17bb8dc7bb175506a9&preview_type=stream&bytes=159433&extension=.jpg&wopisrc=AF9E3791F9793BF9D4BFA0BB6FDB6F0575FA520AD0D5FBE02F01D3E3EB22DA54593FF647DE5298E7D92BEC246D56AA5723895299636543AB15AA510D763886F55500E23EDAE3B93BA453A986B85939E60DCE8C4E0AA1A5C505B797A24A6D5DC357028D8B2DC28CB8746A7AC212F58343D5C36F5E66E8D46A935304AFBDEEDEBEDBC0280A2AE22A4D83F16FBFEA9F11DF9A14581ADDD2B230FD8F0F843E59A7FBE06A362DF9D9F24C1A1A16B8936EBBCC749A537759E07A67A582DF9DE959B58438B27E5E6381FF015974C76DFEDAC7A4&addWatermark=true&watermarkText=%E6%B5%B7%E9%80%9A%E6%81%92%E4%BF%A1%2Flishaolin-172-17-42-1%2F2023+12+14+14%3A43%3A13&atk=14027a3cad2792555c80075849a97f37&vt=1702536193643'
            }
          ]
        },
        msg: ''
      }
    }
  }
]

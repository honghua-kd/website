const VITE_API = '/api/operations-mortgage'
export const express = [
  {
    url: `${VITE_API}/admin-api/mortgage/express/info/list1`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: '操作成功',
        data: {
          pageNo: 1,
          pageSize: 10,
          total: 1,
          totalPage: 1,
          list: [
            {
              id: '123',
              expressNo: 'SF1685550901301',
              expressCompany: '顺丰',
              expressStatus: 0,
              expressType: 0,
              sendTime: '2023-11-09',
              receiveTime: '',
              sendUser: '王五',
              receiveUser: '张三',
              expressContentRemark: 'KCG23112983',
              creator: '李四',
              createTime: '2023/11/08',
              updater: '李四',
              updateTime: '2023/11/09',
              expressContentList: [
                {
                  id: '111',
                  contentNo: 'SF1685550901301-001',
                  contentType: '抵押材料',
                  contentTypeNumber: '7897979790',
                  contractNo: 'KCG23117833'
                },
                {
                  id: '222',
                  contentNo: 'SF1685550901301-002',
                  contentType: '解压材料',
                  contentTypeNumber: '7897979790',
                  contractNo: 'KCG23117833'
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    url: `${VITE_API}/admin-api/mortgage/usual/address/list1`,
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: '操作成功',
        data: {
          pageNo: 1,
          pageSize: 10,
          total: 1,
          totalPage: 1,
          list: [
            {
              id: '111',
              userName: '曾三',
              userPhone: '18888888888',
              userMail: '123445@qq.com',
              userAddress: '广州市番禺区市桥街大北路420号',
              province: '广东省',
              city: '广州市',
              area: '番禺区'
            }
          ]
        }
      }
    }
  }
]

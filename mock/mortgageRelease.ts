const VITE_API = '/operations-management'
export const mortgage = [
  {
    url: `${VITE_API}/admin-api/mortgage/vehicleRegisterCard/list`,
    method: 'post',
    response: () => {
      return {
        msg: '操作成功',
        code: 200,
        data: {
          pageNo: 1,
          pageSize: 10,
          total: 10,
          totalPage: 1,
          list: [
            {
              id: '123',
              fileCode: '123',
              fileName: '测试',
              registerCardArchiveNo: 'sourceValue',
              verifyResult: '12234',
              registerCardNo: '1212234122341223412234',
              vinNo: '7880',
              engineNo: '12234',
              engineType: '12234',
              licensePlateNo: '12234',
              vehicleOwner: '12234',
              vehicleColor: '12234',
              useType: '12234',
              mortgagee: '12234',
              mortgageeUscc: '12234',
              mortgageRegisterDate: '12234',
              batchNo: '12234',
              contractNo: '12234',
              belongSystem: '12234',
              affiliatesName: '12234',
              channelName: '12234',
              creator: '12234',
              createTime: '12234',
              archivalStatus: '12234',
              archivalDate: '12234',
              compareResult: ['registerCardNo', 'vinNo', 'useType'],
              target: [
                {
                  fileCode: '123',
                  fileName: '系统文件',
                  registerCardArchiveNo: 'targetValue',
                  verifyResult: '12234',
                  registerCardNo: '12',
                  vinNo: '12',
                  engineNo: '12234',
                  engineType: '12234',
                  licensePlateNo: '12234',
                  vehicleOwner: '12234',
                  vehicleColor: '12234',
                  useType: '12234',
                  mortgagee: '12234',
                  mortgageeUscc: '12234',
                  mortgageRegisterDate: '12234',
                  batchNo: '12234',
                  contractNo: '12234',
                  belongSystem: '12234',
                  affiliatesName: '12234',
                  channelName: '12234',
                  creator: '12234',
                  createTime: '12234',
                  archivalStatus: '12234',
                  archivalDate: '12234'
                }
              ]
            },
            {
              id: '456',
              fileCode: '123',
              fileName: '测试',
              registerCardArchiveNo: 'sourceValue',
              verifyResult: '12234',
              registerCardNo: '12',
              vinNo: '12',
              engineNo: '12234',
              engineType: '12234',
              licensePlateNo: '12234',
              vehicleOwner: '12234',
              vehicleColor: '12234',
              useType: '12234',
              mortgagee: '12234',
              mortgageeUscc: '12234',
              mortgageRegisterDate: '12234',
              batchNo: '12234',
              contractNo: '12234',
              belongSystem: '12234',
              affiliatesName: '12234',
              channelName: '12234',
              creator: '12234',
              createTime: '12234',
              archivalStatus: '12234',
              archivalDate: '12234',
              compareResult: ['registerCardArchiveNo', 'vinNo'],
              target: [
                {
                  fileCode: '123',
                  fileName: '系统文件',
                  registerCardArchiveNo: 'targetValue',
                  verifyResult: '12234',
                  registerCardNo: '12',
                  vinNo: '12',
                  engineNo: '12234',
                  engineType: '12234',
                  licensePlateNo: '12234',
                  vehicleOwner: '12234',
                  vehicleColor: '12234',
                  useType: '12234',
                  mortgagee: '12234',
                  mortgageeUscc: '12234',
                  mortgageRegisterDate: '12234',
                  batchNo: '12234',
                  contractNo: '12234',
                  belongSystem: '12234',
                  affiliatesName: '12234',
                  channelName: '12234',
                  creator: '12234',
                  createTime: '12234',
                  archivalStatus: '12234',
                  archivalDate: '12234'
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    url: `${VITE_API}/admin-api/mortgage/vehicleRegisterCard/getInfo`,
    method: 'post',
    response: () => {
      return {
        msg: '操作成功',
        code: 200,
        data: {
          id: 'string',
          fileCode: 'string',
          fileName: 'string',
          registerCardNo: {
            sourceValue: 'string',
            targetValue: 'string'
          },
          vinNo: {
            sourceValue: 'string',
            targetValue: 'string'
          },
          licensePlateNo: {
            sourceValue: 'string',
            targetValue: 'string'
          },
          engineNo: {
            sourceValue: 'string',
            targetValue: 'string'
          },
          engineType: {
            sourceValue: 'string',
            targetValue: 'string'
          },
          vehicleOwner: {
            sourceValue: 'string',
            targetValue: 'string'
          },
          vehicleColor: {
            sourceValue: 'string',
            targetValue: 'string'
          },
          useType: {
            sourceValue: 'string',
            targetValue: 'string'
          },
          mortgagee: {
            sourceValue: 'string',
            targetValue: 'string'
          },
          mortgageeUscc: {
            sourceValue: 'string',
            targetValue: 'string'
          },
          mortgageRegisterDate: {
            sourceValue: 'string',
            targetValue: 'string'
          }
        }
      }
    }
  }
]

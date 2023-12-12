const VITE_API = '/api/operations-management'
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
              verifyResult: 'OCR_STATUS_YES',
              registerCardNo: '1212234122341223412234',
              vinNo: '7880',
              engineNo: '12234',
              engineType: '12234',
              licensePlateNo: '沪A09789',
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
              archivalStatus: 'ARCHIVE_STATUS_NO',
              archivalDate: '12234',
              compareResult: ['registerCardNo', 'vinNo', 'useType'],
              target: [
                {
                  fileCode: '123',
                  fileName: '系统文件',
                  registerCardArchiveNo: '',
                  verifyResult: '',
                  registerCardNo: '1212234122341223412234',
                  vinNo: '12',
                  engineNo: '12234',
                  engineType: '12234',
                  licensePlateNo: '浙B0978E',
                  vehicleOwner: '12234',
                  vehicleColor: '12234',
                  useType: '12234',
                  mortgagee: '12234',
                  mortgageeUscc: '12234',
                  mortgageRegisterDate: '12234',
                  batchNo: '',
                  contractNo: '',
                  belongSystem: '',
                  affiliatesName: '',
                  channelName: '',
                  creator: '',
                  createTime: '',
                  archivalStatus: '',
                  archivalDate: ''
                }
              ]
            },
            {
              id: '456',
              fileCode: '123',
              fileName: '测试',
              registerCardArchiveNo: 'sourceValue',
              verifyResult: 'OCR_STATUS_PRO',
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
              archivalStatus: 'ARCHIVE_STATUS_YES',
              archivalDate: '12234',
              compareResult: ['registerCardArchiveNo', 'vinNo'],
              target: [
                {
                  fileCode: '123',
                  fileName: '系统文件',
                  registerCardArchiveNo: '',
                  verifyResult: '',
                  registerCardNo: '12',
                  vinNo: '12',
                  engineNo: '12234',
                  engineType: '12234',
                  licensePlateNo: '浙B0978E',
                  vehicleOwner: '12234',
                  vehicleColor: '12234',
                  useType: '12234',
                  mortgagee: '12234',
                  mortgageeUscc: '12234',
                  mortgageRegisterDate: '12234',
                  batchNo: '',
                  contractNo: '',
                  belongSystem: '',
                  affiliatesName: '',
                  channelName: '',
                  creator: '',
                  createTime: '',
                  archivalStatus: '',
                  archivalDate: ''
                }
              ]
            },
            {
              id: '789',
              fileCode: '123',
              fileName: '测试',
              registerCardArchiveNo: 'sourceValue',
              verifyResult: 'OCR_STATUS_NO',
              registerCardNo: '1212234122341223412234',
              vinNo: '7880',
              engineNo: '12234',
              engineType: '12234',
              licensePlateNo: '沪A09789',
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
              archivalStatus: 'ARCHIVE_STATUS_NO',
              archivalDate: '12234',
              compareResult: ['registerCardNo', 'vinNo', 'useType'],
              target: [
                {
                  fileCode: '123',
                  fileName: '系统文件',
                  registerCardArchiveNo: '',
                  verifyResult: '',
                  registerCardNo: '12',
                  vinNo: '12',
                  engineNo: '12234',
                  engineType: '12234',
                  licensePlateNo: '浙B0978E',
                  vehicleOwner: '12234',
                  vehicleColor: '12234',
                  useType: '12234',
                  mortgagee: '12234',
                  mortgageeUscc: '12234',
                  mortgageRegisterDate: '12234',
                  batchNo: '',
                  contractNo: '',
                  belongSystem: '',
                  affiliatesName: '',
                  channelName: '',
                  creator: '',
                  createTime: '',
                  archivalStatus: '',
                  archivalDate: ''
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
            targetValue: '123'
          },
          vinNo: {
            sourceValue: 'string',
            targetValue: '456'
          },
          licensePlateNo: {
            sourceValue: 'string',
            targetValue: '789'
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

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
          pageNo: 0,
          pageSize: 0,
          total: 0,
          totalPage: 0,
          list: [
            {
              id: '123',
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
                  fileName: '测试',
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
            // {
            //   id: '123',
            //   fileCode: '123',
            //   fileName: '测试',
            //   registerCardArchiveNo: '1234',
            //   verifyResult: '12234',
            //   registerCardNo: {
            //     sourceValue: '12',
            //     targetValue: '12234',
            //     compareResult: true
            //   },
            //   vinNo: {
            //     sourceValue: 'string',
            //     targetValue: 'string',
            //     compareResult: true
            //   },
            //   engineNo: {
            //     sourceValue: '12234',
            //     targetValue: '12234',
            //     compareResult: true
            //   },
            //   engineType: {
            //     sourceValue: '12234',
            //     targetValue: '12234',
            //     compareResult: true
            //   },
            //   licensePlateNo: {
            //     sourceValue: '12234',
            //     targetValue: '12234',
            //     compareResult: true
            //   },
            //   vehicleOwner: {
            //     sourceValue: 'string',
            //     targetValue: 'string',
            //     compareResult: true
            //   },
            //   vehicleColor: {
            //     sourceValue: '12234',
            //     targetValue: '12234',
            //     compareResult: true
            //   },
            //   useType: {
            //     sourceValue: '12234',
            //     targetValue: '12234',
            //     compareResult: true
            //   },
            //   mortgagee: {
            //     sourceValue: '12234',
            //     targetValue: '12234',
            //     compareResult: true
            //   },
            //   mortgageeUscc: {
            //     sourceValue: '12234',
            //     targetValue: '12234',
            //     compareResult: true
            //   },
            //   mortgageRegisterDate: {
            //     sourceValue: '12234',
            //     targetValue: '12234',
            //     compareResult: true
            //   },
            //   batchNo: '12234',
            //   contractNo: '12234',
            //   belongSystem: '12234',
            //   affiliatesName: '12234',
            //   channelName: '12234',
            //   creator: '12234',
            //   createTime: '12234',
            //   archivalStatus: '12234',
            //   archivalDate: '12234'
            // }
          ]
        }
      }
    }
  }
]

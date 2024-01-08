const VITE_API = '/api/operations-mortgage'
export const mortgage = [
  {
    url: `${VITE_API}/admin-api/supplier/list`,
    method: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          list: [
            {
              id: '',
              supplierCode: '',
              supplierName: '',
              supplierTypeName: '',
              belongCompany: '',
              coverArea: '',
              contactName: '',
              phone: '',
              email: '',
              status: 0,
              expireDate: '',
              expireRemind: '',
              innerInterfaceStaffCode: '',
              innerInterfaceStaffName: '',
              creator: '',
              createdTime: '',
              updater: '',
              updatedTime: ''
            }
          ],
          total: 0,
          pageSize: 0,
          pageNo: 0,
          totalPage: 0
        },
        msg: ''
      }
    }
  }
]

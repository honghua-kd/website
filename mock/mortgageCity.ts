const VITE_API = '/api/operations-management'
export const mortgageCity = [
  {
    url: `${VITE_API}/admin-api/mortgage/cityConfiguration/list1`,
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
              id: 10,
              provinceCode: '100000',
              provinceName: '北京',
              cityCode: '100100',
              cityName: '北京',
              licensePlateCode: '沪W',
              applyMortgage: 0,
              applyDischarge: 1,
              creator: '张三',
              createTime: '2022-12-10',
              updater: '张三',
              updateTime: '2022-12-10'
            }
          ]
        }
      }
    }
  }
]

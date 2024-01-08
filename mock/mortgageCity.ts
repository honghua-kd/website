const VITE_API = '/api/operations-management'
export const mortgageCity = [
  {
    url: `${VITE_API}/admin-api/mortgage/cityConfiguration/list`,
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
              provinceCode: '140000',
              provinceName: '山西省',
              cityCode: '140100',
              cityName: '太原市',
              licensePlateCode: '沪A,沪B,沪C',
              applyMortgage: 0,
              applyDischarge: 1,
              creator: '张三',
              createTime: '2022-12-10',
              updater: '张三',
              updateTime: '2022-12-10',
            }
          ]
        }
      }
    }
  }
]

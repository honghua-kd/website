import dayjs from 'dayjs'
import { queryForm, tableLoading, API, tableData, pageTotal } from './index.vue'

export const getList = () => {
  // 在这里执行搜索逻辑，例如发送一个 API 请求。
  const parm = {
    pageNo: queryForm.pageNo,
    pageSize: queryForm.pageSize,
    startCreateTime:
      queryForm.startCreateTime !== ''
        ? dayjs(queryForm.startCreateTime).format('YYYY-MM-DD HH:mm:ss')
        : '',
    endCreateTime:
      queryForm.endCreateTime !== ''
        ? dayjs(queryForm.endCreateTime).format('YYYY-MM-DD HH:mm:ss')
        : ''
  }
  tableLoading.value = true
  API.uploadExportRecordPage(parm)
    .then((res) => {
      if (res && res.code === 200) {
        tableLoading.value = false
        res?.data?.list.forEach((el, index) => {
          el.indexStr = index + 1
        })
        tableData.splice(0, tableData.length)
        tableData.push(...(res?.data?.list || []))
        pageTotal.value = res?.data?.total || 0
      } else {
        tableLoading.value = false
      }
    })
    .catch((err: Error) => {
      tableLoading.value = false
      throw err
    })
}

import { CommonAPI } from '@/api'
import { useDictStore } from '@/store/dict'
import { ElMessageBox, ElLoading } from 'element-plus'

const API = new CommonAPI()
const dictStore = useDictStore()

export const useDicts = (dictTypes: string[]) => {
  const params = {
    dictTypes
  }
  const loading = ElLoading.service({
    lock: true,
    text: '加载中，请稍候...',
    background: 'rgba(0, 0, 0, 0.5)'
  })
  API.getDictsList(params)
    .then((res) => {
      loading.close()
      if (res && res.code === 200) {
        dictStore.setDicts(res.data || {})
      } else {
        ElMessageBox.alert('获取字典表失败，请联系管理员', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    })
    .catch((err: Error) => {
      loading.close()
      ElMessageBox.alert('获取字典表失败，请联系管理员', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      })
      throw err
    })
}

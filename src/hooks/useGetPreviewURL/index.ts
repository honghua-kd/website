import { ref } from 'vue'
import { CommonAPI } from '@/api'
import type { FilePreviewItem } from '@/api'

const CommonApi = new CommonAPI()
const preUrl = ref<string>('')
const fileName = ref<string>('')
const useGetPreviewURL = async (fileCode: string | undefined) => {
  const params = {
    // fileCodes: [fileCode] // 原来接口参数
    fileCode
  }
  const res = await CommonApi.getSinglePreviewURL(params)
  let fileInfo: FilePreviewItem = {}
  if (res && res.code === 200) {
    fileInfo = res?.data?.previewInfoList[0] || {}
    preUrl.value = fileInfo?.filePreview || ''
    fileName.value = fileInfo?.fileName || ''
  }
  return {
    preUrl: preUrl.value,
    fileName: fileName.value
  }
}

export default useGetPreviewURL

import { ref } from 'vue'
// import { openLink } from '@/utils'
import { CommonAPI } from '@/api'
import type { FilePreviewItem } from '@/api'
type PreviewParams = {
  fileCode?: string
}
const CommonApi = new CommonAPI()
const preUrl = ref<string>('')
const fileName = ref<string>('')
const useGetPreviewURL = async (params: PreviewParams) => {
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

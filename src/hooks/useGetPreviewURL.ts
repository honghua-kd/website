import { ref } from 'vue'
import { CommonAPI } from '@/api'
import type { FilePreviewItem } from '@/api'

export const useGetPreviewURL = () => {
  const CommonApi = new CommonAPI()
  const preUrl = ref<string>('')
  const fileName = ref<string>('')
  // 获取单个文件预览地址链接-decode
  const getSinglePreviewURL = async (fileCode: string) => {
    const params = {
      fileCode
    }
    const res = await CommonApi.getSinglePreviewURL(params)
    let fileInfo: FilePreviewItem = {}

    if (res && res.code === 200) {
      fileInfo = res?.data?.previewInfoList[0] || {}
      preUrl.value = fileInfo?.filePreview || ''
      fileName.value = fileInfo?.fileName || ''

      return {
        preUrl: preUrl.value,
        fileName: fileName.value
      }
    }
  }
  // 批量获取附件预览链接
  const getPreviewUrl = async (fileCode?: string[]) => {
    const params = {
      fileCodes: fileCode as string[]
    }
    const res = await CommonApi.getPreviewUrl(params)

    let fileInfoList: FilePreviewItem[] = []

    if (res && res.code === 200) {
      fileInfoList = res?.data?.previewInfoList || []

      return { fileInfoList }
    }
  }

  return {
    getSinglePreviewURL,
    getPreviewUrl
  }
}

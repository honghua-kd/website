import { useNoticeStore, mitt, useRouter } from '@toystory/lotso'
import { NoticeCenterAPI } from '@/api'
import type { NoticeListItem } from '@/api'
import { useDictStore } from '@/store/dict'
import { computed } from 'vue'
import { NOTICE_STATUS } from '@/constants'

const { UNREAD, READ } = NOTICE_STATUS

export const useNoticeCenter = () => {
  const noticeStore = useNoticeStore()
  const API = new NoticeCenterAPI()

  const getNoticeCount = () => {
    API.getNoticeCount({
      status: UNREAD
    }).then((res) => {
      if (res.data) {
        const badgeVal = String(res.data)
        noticeStore.setBadge(badgeVal)
      } else {
        noticeStore.setBadge('')
      }
    })
  }

  const getUnreadNotice = () => {
    const dictStore = useDictStore()
    noticeStore.setLoading(true)
    API.getAllNotice({
      status: UNREAD
    })
      .then((res) => {
        noticeStore.setLoading(false)
        if (res.data && res.data.length) {
          const noticeTypes = dictStore.dicts?.NOTICE_MESSGAE_TYPE
          if (noticeTypes && noticeTypes.length) {
            const noticeMap: Record<string, NoticeListItem[]> = {}

            res.data.forEach((item) => {
              if (!noticeMap[item.type]) {
                noticeMap[item.type] = []
              }
              noticeMap[item.type].push(item)
            })
            const noticeList = noticeTypes.map((item) => {
              const { label, value } = item
              const list = noticeMap[value]
                ? noticeMap[value].map((noticeListItem) => {
                    const { id, title, content, createTime, ...rest } =
                      noticeListItem
                    return {
                      id,
                      title,
                      content,
                      time: createTime,
                      ...rest
                    }
                  })
                : []
              return {
                name: value,
                title: `${label} (${list.length})`,
                list
              }
            })
            noticeStore.setNoticeList(noticeList)
          }
        } else {
          noticeStore.setNoticeList([])
        }
      })
      .catch((err) => {
        noticeStore.setLoading(false)
        throw err
      })
  }

  mitt.on('noticePopoverShow', () => {
    getUnreadNotice()
  })

  const { router } = useRouter()
  mitt.on('noticeItemClick', (item) => {
    API.changeNoticeStatus({
      ids: [(item as NoticeListItem).id],
      status: READ
    })
    router.push({
      path: (item as NoticeListItem).router,
      query: (item as NoticeListItem).routerParam
    })
  })

  const currentNoticeList = computed(() => {
    const currentNotice = noticeStore.noticeList.find(
      (item) => item.name === noticeStore.activeTab
    )
    if (currentNotice) {
      return currentNotice.list
    } else {
      return []
    }
  })
  // 标记已读
  mitt.on('noticeMarkClick', () => {
    const markIds = currentNoticeList.value.map((item) => String(item.id))
    API.changeNoticeStatus({
      ids: markIds,
      status: READ
    }).then(() => {
      getUnreadNotice()
      getNoticeCount()
    })
  })

  // 标记已读
  mitt.on('noticeMoreClick', () => {
    router.push('/noticeCenter/index')
  })

  getNoticeCount()

  return {
    getNoticeCount,
    getUnreadNotice
  }
}

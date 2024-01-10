import { useNoticeStore, useUserStore, mitt, useRouter } from '@toystory/lotso'
import { NoticeCenterAPI } from '@/api'
import type { NoticeListItem } from '@/api'
import { useDictStore } from '@/store/dict'
import { computed } from 'vue'
import { ElNotification } from 'element-plus'
import { NOTICE_STATUS } from '@/constants'
import { useWebsocket } from './useWebsocket'

const { UNREAD, READ } = NOTICE_STATUS

const MESSAGE_TYPE = {
  SERVER_PERMISSION_VERIFICATION: 'SERVER_PERMISSION_VERIFICATION',
  CLIENT_HEARTBEAT: 'CLIENT_HEARTBEAT',
  SERVER_MESSAGE_PUSH: 'SERVER_MESSAGE_PUSH',
  SERVER_HEARTBEAT: 'SERVER_HEARTBEAT'
}

export const useNoticeCenter = () => {
  const noticeStore = useNoticeStore()
  const API = new NoticeCenterAPI()

  // websocket 即时通知
  const userStore = useUserStore()
  const token = computed(() => {
    return userStore.token
  })

  if (!import.meta.env.VITE_APP_WEBSOCKET_URL) {
    console.error('缺少websocket URL配置')
  } else {
    let heartBeatTimer: NodeJS.Timeout | null
    const { socket, send } = useWebsocket(
      import.meta.env.VITE_APP_WEBSOCKET_URL + token.value,
      {
        onMessage(data) {
          if (data) {
            try {
              const message = JSON.parse(data as string)
              const { code, msgType, msg } = message
              if (code !== 200) {
                console.error('WebSocket Error:', message)
                heartBeatTimer && clearTimeout(heartBeatTimer)
                heartBeatTimer = null
                return
              }
              if (
                msgType === MESSAGE_TYPE.SERVER_PERMISSION_VERIFICATION &&
                !heartBeatTimer
              ) {
                heartBeatTimer = socketHeartBeat()
              }
              if (msgType === MESSAGE_TYPE.SERVER_MESSAGE_PUSH) {
                // 消息推送
                ElNotification({
                  title: '通知',
                  message: msg
                })
                getNoticeCount()
              }
            } catch (error) {
              console.error('WebSocket Error:', error)
            }
          }
        }
      }
    )

    const socketHeartBeat = () => {
      return setTimeout(() => {
        const msg = { msgType: MESSAGE_TYPE.CLIENT_HEARTBEAT }
        if (socket.readyState === 1) {
          send(JSON.stringify(msg))
        }
        socketHeartBeat()
      }, 30000)
    }
  }

  // 获取未读消息数量
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

  // 获取未读消息列表
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
    }).then(() => {
      getNoticeCount()
      router.push({
        path: (item as NoticeListItem).router,
        query: (item as NoticeListItem).routerParam
      })
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

import setting from '@/config/setting'
import dayjs from 'dayjs'

const { title } = setting

export const getPageTitle = (pageTitle: string) => {
  if (pageTitle) {
    return `${pageTitle}-${title}`
  }
  return `${title}`
}

export function parseTime(time: Date | string | number, cFormat?: string) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: Record<string, number> = {
    y: date && date.getFullYear(),
    m: date && date.getMonth() + 1,
    d: date && date.getDate(),
    h: date && date.getHours(),
    i: date && date.getMinutes(),
    s: date && date.getSeconds(),
    a: date && date.getDay()
  }
  const timeStr = format.replace(
    /{(y|m|d|h|i|s|a)+}/g,
    (result, key: string) => {
      const timeValue = formatObj[key]
      let value: string = ''
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][timeValue]
      }
      if (result.length > 0 && timeValue < 10) {
        value = '0' + timeValue
      }
      return value || '0'
    }
  )
  return timeStr
}

export function formatTime(time: Date | string | number, cFormat?: string) {
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d.getTime()) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (cFormat) {
    return parseTime(time, cFormat)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function getQueryObject(url: string) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj: Record<string, string> = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {Sting} input value
 * @returns {number} output value
 */
export function byteLength(str: string) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

export function cleanArray(actual: unknown[]) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json: Record<string, string | number | boolean>) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

export function param2Obj(url: string) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export function html2Text(val: string) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toggleClass(element: HTMLElement, className: string) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export function getTime(type?: 'start') {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce<
  Params extends unknown[],
  F extends (...args: Params) => void
>(func: F, wait: number, immediate?: boolean) {
  let timeout: ReturnType<typeof setTimeout> | undefined,
    args: Params,
    context: unknown,
    timestamp: number,
    result: void

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = undefined
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = null
      }
    }
  }

  return function (this: ThisParameterType<F>, ...args: Params) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
// 判断是否为数组

export function deepClone<T>(
  origin: T,
  target?: Record<string, unknown> | T
): T {
  const tar = target || {}
  const isArr = (origin: unknown): boolean => {
    const str = '[object Array]'
    return Object.prototype.toString.call(origin) === str
  }
  for (const key in origin) {
    if (Object.prototype.hasOwnProperty.call(origin, key)) {
      if (typeof origin[key] === 'object' && origin[key] !== null) {
        tar[key] = isArr(origin[key]) ? [] : {}
        deepClone(origin[key], tar[key])
      } else {
        tar[key] = origin[key]
      }
    }
  }

  return tar as T
}

export function uniqueArr(arr: Array<unknown>) {
  return Array.from(new Set(arr))
}

export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt(String((1 + Math.random()) * 65536)) + ''
  return (+(randomNum + timestamp)).toString(32)
}

export function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
export function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}
export function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export function isEmpty<T extends object>(data: T) {
  if (typeof data === 'object' && Object.keys(data).length === 0) {
    return true
  } else {
    return false
  }
}

export function blob2file(blob: Blob, name: string) {
  return new File([blob], name, { type: blob.type })
}

export function cutstr(str: string, len: number) {
  let strlength = 0
  let strLen = 0
  let strcut = ''
  strLen = str.length
  for (let i = 0; i < strLen; i++) {
    const a = str.charAt(i)
    strlength++
    if (escape(a).length > 4) {
      // 中文字符的长度经编码之后大于4
      strlength++
    }
    strcut = strcut.concat(a)
    if (strlength >= len) {
      strcut = strcut.concat('...')
      return strcut
    }
  }
  // 如果给定字符串小于指定长度，则返回源字符串；
  if (strlength < len) {
    return str
  }
}

export function openLink(url: string, target: string) {
  const link = <HTMLAnchorElement>document.createElement('A')
  link.target = target || ''
  link.href = url
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.parentNode?.removeChild(link)
}

export function formatDuring(mss: number) {
  const days = parseInt(String(mss / (1000 * 60 * 60 * 24)))
  const hours = parseInt(
    String((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  )
  const minutes = parseInt(String((mss % (1000 * 60 * 60)) / (1000 * 60)))
  const seconds = Math.round((mss % (1000 * 60)) / 1000)
  if (days > 0) {
    return (
      days + '天' + hours + ' 小时 ' + minutes + ' 分钟 ' + seconds + ' 秒 '
    )
  } else {
    if (hours > 0) {
      return hours + ' 小时 ' + minutes + ' 分钟 ' + seconds + ' 秒 '
    } else {
      if (minutes > 0) {
        return minutes + ' 分钟 ' + seconds + ' 秒 '
      } else {
        return seconds + ' 秒 '
      }
    }
  }
}

export function addElementColor(str = '', el = 'a', color: string) {
  return str.replace(new RegExp('<' + el + '.*?>', 'ig'), function (searchVal) {
    const styleAttr = searchVal.match(/(?<=style=['|"]).*?(?=['|"])/g)
    if (!styleAttr) {
      return searchVal.replace(
        new RegExp('<' + el),
        '<' + el + ' style="color: ' + color + ';"'
      )
    } else {
      return searchVal.replace(/(?<=style=['|"]).*?(?=['|"])/g, function (val) {
        if (!/color/.test(val)) {
          return 'color: ' + color + ';' + val
        } else {
          const _wcolor = val.match(/\w*-color/g)
          const _color = val.match(/color/g)
          if (_wcolor && _wcolor.length === _color?.length) {
            return 'color: ' + color + ';' + val
          } else {
            return val
          }
        }
      })
    }
  })
}

export function formatDate(date: Date, format?: string) {
  // 日期不存在，则返回空
  if (!date) {
    return ''
  }
  // 日期存在，则进行格式化
  if (format === undefined) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  return dayjs(date).format(format)
}

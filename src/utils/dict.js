/** 处理 map 数据结构的序列化 */
export const replacer = (key, value) => {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()) // or with spread: value: [...value]
    }
  } else {
    return value
  }
}
export const reviver = (key, value) => {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value)
    }
  }
  return value
}
export const formatDict = (list) => {
  if (!list || !list.length) return
  const keySet = new Set()
  const dictMap = new Map()
  list.forEach(item => {
    keySet.add(item.dictType)
  })
  const keyArr = [...keySet]
  for (let i = 0; i < keyArr.length; i++) {
    const arr = []
    for (let j = 0; j < list.length; j++) {
      if (list[j].dictType === keyArr[i]) {
        arr.push({
          value: Number(list[j].value),
          label: list[j].label
        })
      }
    }
    dictMap.set(keyArr[i], arr)
  }
  sessionStorage.setItem('DICTMAP', JSON.stringify(dictMap, replacer))
  return dictMap
}

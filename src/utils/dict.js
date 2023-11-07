
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

  return dictMap
}

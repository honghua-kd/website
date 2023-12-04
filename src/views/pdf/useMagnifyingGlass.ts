let imgEl: HTMLImageElement | HTMLCanvasElement
let magnifyingGlassView: HTMLCanvasElement
let interceptionTimer: NodeJS.Timeout | null
let originalPiexls: ImageData | undefined
let smallCanvas: HTMLCanvasElement
let isImageFlag: boolean = false

// 获取当前鼠标点的范围(放大范围，数值越小，放的越大)
let diffusionLength: number
// 放大镜窗口的大小
let viewSize: number

interface Options {
  diffusionLength: number
  viewSize: number
}

// 可以传入IMG标签，canvas标签
export const useMagnifyingGlass = (
  el: HTMLImageElement | HTMLCanvasElement,
  options?: Options
) => {
  if (!el) {
    throw new Error('请传入需要放大的图片')
  }

  if (el.tagName !== 'CANVAS' && el.tagName !== 'IMG') {
    throw new Error('请传入正确格式的图片')
  }
  diffusionLength = options?.diffusionLength || 100
  viewSize = options?.viewSize || 200
  imgEl = el
  if (el.tagName === 'IMG') {
    isImageFlag = true
  }
  listenerImgLoadSucceeded()
}

// 监听图片加载完成
async function listenerImgLoadSucceeded() {
  if (!(imgEl as HTMLImageElement).complete) {
    await new Promise((resolve) => {
      imgEl.onload = resolve
    })
  }
  // 添加鼠标事件
  addMouseEvent()
  // 创建一个放大预览视图
  createMagnifyingGlassView()
}

// 添加鼠标事件
function addMouseEvent() {
  // 添加鼠标滑过事件
  addMouseMoveToImageEl()
  // 鼠标滑出事件
  addMouseLeaveToImageEl()
}

// 创建一个放大预览视图
function createMagnifyingGlassView() {
  if (magnifyingGlassView) {
    magnifyingGlassView.remove()
  }
  magnifyingGlassView = document.createElement('canvas')
  magnifyingGlassView.style.cssText =
    'position: fixed;background:aliceblue;left:0;top:0;pointer-events:none;display:none'
  magnifyingGlassView.setAttribute('width', `${viewSize}px`)
  magnifyingGlassView.setAttribute('height', `${viewSize}px`)
  const body = document.getElementsByTagName('body')[0]
  body.appendChild(magnifyingGlassView)
}

// 添加鼠标滑过事件
function addMouseMoveToImageEl() {
  imgEl.onmousemove = (event) => {
    const x = event.clientX + 20
    const y = event.clientY + 20
    const position = { x, y }
    // 截流
    interceptionFunc(() => {
      // 修改放大视图位置
      changeMagnifyingGlassViewPosition(position)
      // 获取需要放大的像素
      getNeedMasgnifyingGlassPiexl({
        clientX: event.clientX - getElementPosition(imgEl).left,
        clientY: event.clientY - getElementPosition(imgEl).top
      })
    })
  }
}

// 鼠标滑出事件
function addMouseLeaveToImageEl() {
  imgEl.onmouseleave = () => {
    // 移除放大框
    // magnifyingGlassView.style.display = 'none'
    magnifyingGlassView.parentNode?.removeChild(magnifyingGlassView)
  }
  imgEl.onmouseenter = () => {
    createMagnifyingGlassView()
  }
}

// 获取元素在屏幕的位置
function getElementPosition(element: HTMLElement) {
  let top = element.offsetTop
  let left = element.offsetLeft

  // 相对偏移量
  let currentParent = element.offsetParent as HTMLElement
  while (currentParent !== null) {
    console.log('currentParent', currentParent.offsetTop)
    top += currentParent.offsetTop
    left += currentParent.offsetLeft
    currentParent = currentParent.offsetParent as HTMLElement
  }

  // 相对滚动的距离
  let parentElement = element.parentElement
  while (parentElement !== null) {
    // console.log('currentParent', currentParent.scrollTop)
    top -= parentElement.scrollTop
    left -= parentElement.scrollLeft
    parentElement = parentElement.parentElement
  }
  return { top, left }
}

// 截流
function interceptionFunc(cb: () => void) {
  if (interceptionTimer) {
    return
  }
  interceptionTimer = setTimeout(() => {
    cb()
    interceptionTimer = null
  }, 20)
}

// 修改放大视图位置
function changeMagnifyingGlassViewPosition<T extends { x: number; y: number }>(
  position: T
) {
  magnifyingGlassView.style.left = position.x + 'px'
  magnifyingGlassView.style.top = position.y + 'px'
  magnifyingGlassView.style.display = 'block'
}

// 获取需要放大的像素
async function getNeedMasgnifyingGlassPiexl(event: {
  clientX: number
  clientY: number
}) {
  // 获取原始像素
  getOriginalPiexls()
  // 如果像素为空，不进行操作
  if (!originalPiexls || originalPiexls.data.length === 0) {
    return
  }
  // 获取待放大IMG的宽度，用来计算像素
  const imageWidth = imgEl.offsetWidth
  // 鼠标触点
  const mouseX = event.clientX
  const mouseY = event.clientY
  // 规定区域的上下、左右宽度
  const sepX = parseInt(String(diffusionLength))
  const sepY = parseInt(String(diffusionLength))
  // 需要开始的点
  const startPoint = {
    x: mouseX - parseInt(String(sepX / 2.0)),
    y: mouseY - parseInt(String(sepY / 2.0))
  }
  // 需要结束的点
  const endPoint = {
    x: mouseX + parseInt(String(sepX / 2.0)),
    y: mouseY + parseInt(String(sepY / 2.0))
  }
  // 最终要展示的像素集合(乘以4是单一像素值宽度)
  const finallyOriginalPiexls = new Uint8ClampedArray(sepX * sepY * 4)
  let currentIndex = 0
  // 操作像素
  for (let i = startPoint.y; i < endPoint.y; i++) {
    for (let j = startPoint.x; j < endPoint.x; j++) {
      for (let k = 0; k < 4; k++) {
        const index = (i * imageWidth + j) * 4 + k
        if (index > 0 && index < originalPiexls.data.length) {
          // 超过宽度部分需要进行其他色值填充
          if (j < imageWidth) {
            finallyOriginalPiexls[currentIndex] = originalPiexls.data[index]
          } else {
            finallyOriginalPiexls[currentIndex] = 199
          }
        } else {
          finallyOriginalPiexls[currentIndex] = 199
        }
        currentIndex += 1
      }
    }
  }

  // 先绘制一个100*100单位长的小图
  if (!smallCanvas) {
    smallCanvas = document.createElement('canvas')
    smallCanvas.setAttribute('width', `${diffusionLength}px`)
    smallCanvas.setAttribute('height', `${diffusionLength}px`)
  }
  const smallCtx = smallCanvas.getContext('2d')
  // 初始化ImageData
  const finallyImageData = new ImageData(finallyOriginalPiexls, sepX, sepY)
  // 当前范围内需要放大的像素
  smallCtx?.putImageData(
    finallyImageData,
    0,
    0,
    0,
    0,
    diffusionLength,
    diffusionLength
  )
  const url = smallCanvas.toDataURL('image/jpeg', 1)

  // 将小图绘制到200*200的预览图上
  const image = new Image()
  image.src = url
  await new Promise((resolve) => {
    image.onload = resolve
  })
  const magnifyingGlassCtx = magnifyingGlassView.getContext('2d')
  magnifyingGlassCtx?.drawImage(image, 0, 0, viewSize, viewSize)
}

// 保存原像素（操作像素点时候用）
async function getOriginalPiexls() {
  if (!originalPiexls || originalPiexls.data.length === 0) {
    let canvas = imgEl
    if (isImageFlag) {
      canvas = await imageToCanvas(imgEl as HTMLImageElement)
    }
    const ctx = (canvas as HTMLCanvasElement).getContext('2d')
    const width = canvas.getAttribute('width')
    const height = canvas.getAttribute('height')
    try {
      // 保存像素
      originalPiexls = ctx?.getImageData(0, 0, Number(width), Number(height))
    } catch (error) {
      console.log(error)
    }
  }
}

// 处理图片标签
async function imageToCanvas(
  ele: HTMLImageElement
): Promise<HTMLCanvasElement> {
  const image = new Image()
  image.src = ele.src
  // 等待IMG标签加载完成后保存像素值
  await new Promise((resolve) => {
    image.onload = resolve
  })
  const width = image.width
  const height = image.height
  const canvas = document.createElement('canvas')
  canvas.setAttribute('width', `${width}px`)
  canvas.setAttribute('height', `${height}px`)
  const ctx = canvas.getContext('2d')
  ctx!.fillStyle = ctx?.createPattern(image, 'no-repeat') as CanvasPattern
  ctx?.fillRect(0, 0, width, height)
  return canvas
}

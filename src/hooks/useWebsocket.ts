interface Options {
  onOpen?: (ev: Event) => void
  onMessage?: (data: unknown) => void
  onError?: (ev: Event) => void
  onClosed?: () => void
}

export const useWebsocket = (url: string | URL, options?: Options) => {
  // Create WebSocket connection.
  const socket = new WebSocket(url)

  // Connection opened
  socket.addEventListener('open', function (event) {
    console.log('Websocket connection opened.', event)
    options?.onOpen && options?.onOpen(event)
  })

  // Listen for messages
  socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data)
    options?.onMessage && options?.onMessage(event.data)
  })

  socket.addEventListener('error', function (event) {
    console.error('Websocket error occurred.', event)
    options?.onError && options?.onError(event)
  })

  socket.addEventListener('closed', function () {
    console.error('Websocket connection closed.')
    options?.onClosed && options?.onClosed()
  })

  const send = (data: string) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(data)
    } else {
      console.error('Websocket connection not open.')
    }
  }

  const close = () => {
    socket.close()
  }

  return {
    socket,
    send,
    close
  }
}

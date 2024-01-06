import WebSocket from 'ws'

export const useWebsocket = (
  url: string | URL,
  options?: WebSocket.ClientOptions
) => {
  const ws = new WebSocket(url, options)

  ws.onopen = () => {
    console.log('Websocket connection opened.')
  }
  ws.onmessage = (event) => {
    console.log('Websocket message received.', event.data)
  }
  ws.onerror = (error) => {
    console.error('Websocket error occurred.', error)
  }
  ws.onclose = () => {
    console.log('Websocket connection closed.')
  }

  const send = (data: string) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data)
    } else {
      console.error('Websocket connection not open.')
    }
  }

  const close = () => {
    ws.close()
  }

  return {
    send,
    close
  }
}

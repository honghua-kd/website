import Cookies from 'js-cookie'

const TokenKey = 'lotsoUserToken'

const ExpiresInKey = 'Admin-Expires-In'

export function getToken() {
  let token = Cookies.get(TokenKey)
  if (window.location.href.includes('?token')) {
    const value = getParam(window.location.href, 'token')
    if (value) {
      token = value
    }
  }
  return token
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1
}

export function setExpiresIn(time: string) {
  return Cookies.set(ExpiresInKey, time)
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey)
}
function getParam(jspath: string, parm: string) {
  const urlparse = jspath.split('?')
  const parms = urlparse[1].split('&')
  for (let i = 0; i < parms.length; i++) {
    const pr = parms[i].split('=')
    if (pr[0] === parm) return pr[1]
  }
  return ''
}

import Cookies from 'js-cookie'

export const cleanCookies = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}

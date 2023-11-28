import type { FrameSetting } from '@toystory/lotso'

const frameSetting: FrameSetting = {
  // 是否显示顶部进度条
  progressBar: true,
  // 菜单栏默认打开路由
  defaultOpeneds: [],
  // vertical布局时是否只保持一个子菜单的展开
  uniqueOpened: false,
  // token名称
  tokenName: 'accessToken',
  // 是否跳过登录
  skipLogin: false,
  // default language
  lang: 'zh-cn',
  // 标题
  title: '海通恒信运营中台系统',
  // 系统名称
  systemName: 'HTHX-ADMIN',
  // 版权信息
  copyrightZh:
    '版权所有 © 海通恒信国际融资租赁股份有限公司 未经许可不得复制、转载或摘编，违者必究！',
  copyrightEn:
    'Copyright © Haitong Unitrust International Leasing CO.,LTD.All Rights Reserved',
  // 默认主题颜色
  themeColor: '#005BAC',
  // 默认左侧菜单背景颜色
  leftMenuBgColor: '#0d153c',
  // 默认顶部菜单背景颜色
  topMenuBgColor: '#ffffff',
  // 默认左侧菜单文字颜色
  leftMenuTextColor: '#FFF',
  // 默认顶部菜单文字颜色
  topMenuTextColor: '#333',
  // 是否显示用户名
  showName: false,
  // 头部工具栏布局
  showHeaderBar: false,
  // 是否显示页面底部自定义版权信息
  footerCopyright: true,
  // token失效回退到登录页时是否记录本次的路由
  recordRoute: true,
  // 是否显示全屏
  fullScreen: true,
  // 是否显示刷新
  refresh: true,
  // 是否显示通知
  notice: false,
  // 是否显示面包导航
  isBreadcrumb: true,
  // 是否显示logo
  isLogo: true,
  // logo图片 相对于public/static/image的路径
  logo: 'logo.png',
  // 菜单栏logo
  sideLogo: 'side-logo.png',
  // 是否显示标签
  tag: true,
  // 是否展开菜单
  collapse: false,
  // 路由白名单不经过token校验的路由
  routesWhiteList: ['/login', '/register', '/404', '/401'],
  // 权限信息白名单
  whiteAuthData: [
    {
      children: [
        {
          children: [],
          elements: [],
          menuType: 3,
          sort: 0,
          menu: 'homeIndex'
        }
      ],
      elements: [],
      menuType: 3,
      sort: 0,
      menu: 'home'
    }
  ],
  // 默认首页页面
  defaultPath: '/home',
  // 默认添加进路由表中的路由
  defaultRoutes: [],
  // 是否使用hash模式
  useHash: false,
  // base路径
  baseURL: '',
  // 登录页面路径，默认为'/login'，可配置SSO路径，建议用环境变量
  loginPath: import.meta.env.VITE_APP_SSO_URL
}

export default frameSetting

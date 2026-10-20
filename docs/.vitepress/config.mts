import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "不要糖醋放椒盐（椒盐音乐官网）",
  description: "Moriafly Official | 不要糖醋放椒盐 | 椒盐音乐 | Salt Player",
  base: '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Moriafly' },
    ],

    sidebar: {
      '/saltplayer/android/': [
        {
          text: 'Salt Player Android',
          items: [
            { text: '概述', link: '/saltplayer/android/' },
            { text: 'USB 独占模式', link: '/saltplayer/android/usb-exclusive' },
          ]
        }
      ],
      '/program/salt-ui/': [
        {
          text: 'Salt UI',
          items: [
            { text: '概述', link: '/program/salt-ui/' },
            {
              text: 'UI 模块',
              link: '/program/salt-ui/ui',
              items: [
                { text: '主题', link: '/program/salt-ui/ui#theme' },
                { text: 'Item（元项）', link: '/program/salt-ui/ui#item' },
                { text: '基础组件', link: '/program/salt-ui/ui#components' },
                { text: '弹层与对话框', link: '/program/salt-ui/ui#dialogs' },
                { text: '材质', link: '/program/salt-ui/ui#material' },
                { text: '手势', link: '/program/salt-ui/ui#gestures' },
                { text: 'Lazy 布局', link: '/program/salt-ui/ui#lazy' },
                { text: 'Android 平台', link: '/program/salt-ui/ui#android' },
              ]
            },
            {
              text: '构建页面',
              link: '/program/salt-ui/screen',
              items: [
                { text: 'BasicScreen', link: '/program/salt-ui/screen#basicscreen' },
                { text: 'TitleBarButton', link: '/program/salt-ui/screen#titlebarbutton' },
                { text: 'ScreenCard', link: '/program/salt-ui/screen#screencard' },
                { text: 'Cupertino 过渡滚动', link: '/program/salt-ui/screen#cupertino-scroll' },
                { text: '综合示例', link: '/program/salt-ui/screen#example' },
              ]
            },
            {
              text: 'Desktop',
              link: '/program/salt-ui/desktop',
              items: [
                { text: 'SaltWindow', link: '/program/salt-ui/desktop#saltwindow' },
                { text: 'DesktopCaptionBar', link: '/program/salt-ui/desktop#desktopcaptionbar' },
                { text: 'CaptionBarHitTest', link: '/program/salt-ui/desktop#captionbarhittest' },
                { text: 'SaltDialogWindow', link: '/program/salt-ui/desktop#saltdialogwindow' },
                { text: 'SaltWindowProperties', link: '/program/salt-ui/desktop#saltwindowproperties' },
                { text: 'LocalSaltWindowInfo', link: '/program/salt-ui/desktop#localsaltwindowinfo' },
                { text: 'SaltWindowExceptionHandler', link: '/program/salt-ui/desktop#saltwindowexceptionhandler' },
                { text: 'HWND', link: '/program/salt-ui/desktop#hwnd' },
              ]
            },
            {
              text: 'Core 模块',
              link: '/program/salt-ui/core',
              items: [
                { text: 'OS', link: '/program/salt-ui/core#os' },
                { text: 'UnstableSaltCoreApi', link: '/program/salt-ui/core#unstablesaltcoreapi' },
              ]
            },
            {
              text: 'Navigation 模块',
              link: '/program/salt-ui/navigation',
              items: [
                { text: 'SaltNavigator', link: '/program/salt-ui/navigation#saltnavigator' },
                { text: 'rememberSaltNavigator', link: '/program/salt-ui/navigation#remembersaltnavigator' },
              ]
            },
            {
              text: 'Adaptive Window 模块',
              link: '/program/salt-ui/adaptive-window',
              items: [
                { text: 'DeviceFormFactor', link: '/program/salt-ui/adaptive-window#deviceformfactor' },
                { text: 'WindowSizeClass', link: '/program/salt-ui/adaptive-window#windowsizeclass' },
                { text: 'currentSaltAdaptiveWindow', link: '/program/salt-ui/adaptive-window#currentsaltadaptivewindow' },
              ]
            },
          ]
        }
      ],
      '/program/spw/': [
        {
          text: 'SPW',
          items: [
            // { text: '加入测试', link: '/program/spw/join-dev' },
            { text: '更新日志', link: '/program/spw/changelog' },
            {
              text: '文档',
              items: [
                {
                  text: '渠道',
                  items: [
                    { text: 'Microsoft Store', link: '/program/spw/doc/channel-ms' },
                    { text: 'Steam', link: '/program/spw/doc/channel-steam' },
                  ]
                },
                { text: '安装', link: '/program/spw/doc/install' },
                { text: '启动行为', link: '/program/spw/doc/launch-behavior' },
                { text: '音乐库', link: '/program/spw/doc/music-library' },
                {
                  text: '外观',
                  collapsed: true,
                  link: '/program/spw/doc/appearance',
                  items: [
                    { text: 'DXGI 兼容模式', link: '/program/spw/doc/dxgi-compat-mode' },
                  ]
                },
                { text: '音轨项', link: '/program/spw/doc/track-item' },
                { text: 'SPW 音频引擎', link: '/program/spw/doc/audio-engine' },
                { text: '音频格式支持', link: '/program/spw/doc/audio-format-support' },
                { text: '无间隙播放', link: '/program/spw/doc/gapless-playback' },
                { text: '创意工坊', link: '/program/spw/doc/workshop' },
                { text: '渲染', link: '/program/spw/doc/render' },
                {
                  text: '常见问题 FAQ',
                  items: [
                    { text: 'FAQ（多渠道通用）', link: '/program/spw/doc/faq-common' },
                    { text: 'FAQ（Microsoft Store）', link: '/program/spw/doc/faq-ms' },
                    { text: 'FAQ（Steam）', link: '/program/spw/doc/faq-steam' },
                    { text: 'FAQ（Legacy）', link: '/program/spw/doc/faq-legacy' },
                  ]
                },
                {
                  text: '第三方 App',
                  items: [
                    { text: '音乐标签', link: '/program/spw/doc/app-music-tag' },
                  ]
                },
                {
                  text: '法律信息',
                  link: '/program/spw/doc/legal-information',
                  items: [
                    { text: '隐私协议', link: '/program/spw/doc/privacy_policy' }
                  ]
                },
              ]
            },
          ]
        }
      ]
    },

    footer: {
      message: 'Google/Android 是 Google LLC 的注册商标，Salt Player 和糖醋音乐均是寻浔科技（上海）有限公司在中华人民共和国的注册商标',
      copyright: 'Copyright © 2020-2025 Moriafly. All Rights Reserved.'
    },

    darkModeSwitchLabel: '主题模式',
    returnToTopLabel: '返回顶部'
  },
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
})
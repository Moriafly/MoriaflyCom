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
      '/program/spw/': [
        {
          text: 'SPW',
          items: [
            { text: '加入测试', link: '/program/spw/join-dev' },
            { text: '更新日志', link: '/program/spw/changelog' },
            {
              text: '文档',
              items: [
                {
                  text: '渠道',
                  items: [
                    { text: 'Microsoft Store', link: '/program/spw/doc/channel-ms' },
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
                { text: 'SPW 音频引擎', link: '/program/spw/doc/audio-engine' },
                { text: '无间隙播放', link: '/program/spw/doc/gapless-playback' },
                { text: '常见问题 FAQ', link: '/program/spw/doc/faq' },
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
  }
})
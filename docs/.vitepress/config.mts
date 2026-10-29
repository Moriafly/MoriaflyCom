import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "不要糖醋放椒盐（椒盐音乐官网）",
  description: "Moriafly Official | 不要糖醋放椒盐 | 椒盐音乐 | Salt Player",
  base: '/',
  // Organize sources by topic while preserving published page URLs and anchors.
  rewrites: {
    'program/salt-ui/guides/screen.md': 'program/salt-ui/screen.md',
    'program/salt-ui/guides/navigation.md': 'program/salt-ui/navigation.md',
    'program/salt-ui/components/sheet.md': 'program/salt-ui/sheet.md',
    'program/salt-ui/platforms/desktop.md': 'program/salt-ui/desktop.md',
    'program/salt-ui/platforms/adaptive-window.md': 'program/salt-ui/adaptive-window.md',
    'program/salt-ui/reference/core.md': 'program/salt-ui/core.md',
  },
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
          text: '开始使用',
          items: [
            { text: '概述', link: '/program/salt-ui/' },
            { text: '安装与接入', link: '/program/salt-ui/getting-started/installation' },
          ]
        },
        {
          text: '设计基础',
          items: [
            { text: '主题', link: '/program/salt-ui/foundations/theme' },
            { text: '材质', link: '/program/salt-ui/foundations/material' },
          ]
        },
        {
          text: '组件',
          items: [
            { text: '基础组件', link: '/program/salt-ui/components/primitives' },
            { text: 'Item 元项', link: '/program/salt-ui/components/items' },
            { text: '弹层与对话框', link: '/program/salt-ui/components/overlays' },
            { text: 'Sheet', link: '/program/salt-ui/sheet' },
          ]
        },
        {
          text: '使用指南',
          items: [
            { text: '构建页面', link: '/program/salt-ui/screen' },
            { text: '导航', link: '/program/salt-ui/navigation' },
            { text: '滚动与列表', link: '/program/salt-ui/guides/scrolling' },
          ]
        },
        {
          text: '平台适配',
          items: [
            { text: 'Android', link: '/program/salt-ui/platforms/android' },
            { text: 'Desktop', link: '/program/salt-ui/desktop' },
            { text: '自适应窗口', link: '/program/salt-ui/adaptive-window' },
          ]
        },
        {
          text: 'API 参考',
          items: [
            { text: 'UI 模块索引', link: '/program/salt-ui/ui' },
            { text: '修饰符与工具', link: '/program/salt-ui/reference/utilities' },
            { text: 'Core 模块', link: '/program/salt-ui/core' },
          ]
        },
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

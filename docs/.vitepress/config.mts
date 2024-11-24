import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Moriafly",
  description: "Moriafly Official",
  base: '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: '首页', link: '/' }
    ],

    socialLinks: [
      { icon: 'x', link: 'https://x.com/izumixuu' },
      { icon: 'github', link: 'https://github.com/Moriafly' },
    ],

    footer: {
      message: 'Google/Android 是 Google LLC 的注册商标，Salt Player 和糖醋音乐均是寻浔科技（上海）有限公司在中华人民共和国的注册商标',
      copyright: 'Copyright © 2020-2024 Moriafly. All Rights Reserved.'
    },

    darkModeSwitchLabel: '主题模式',
    returnToTopLabel: '返回顶部'
  }
})
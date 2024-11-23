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
      copyright: 'Copyright © 2020-2024 Moriafly. All Rights Reserved.'
    },

    darkModeSwitchLabel: '主题模式',
    returnToTopLabel: '返回顶部'
  }
})

import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "KAMITSUBAKI.CITY",
  description: "KAMITSUBAKI CITY",
  appearance: 'force-dark',
  srcDir: 'wiki',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'HOME\n主页', link: '/' },
      { text: 'WORLD\n世界观', link: '/world' },
      { text: 'CHARACTER\n登场人物', link: '/character' },
      { text: 'MUSIC\n音乐', link: '/music' },
      { text: 'NOVEL\n小说', link: 'https://b23.tv/bAX80f1' },
      { text: 'GAME\n游戏', link: 'https://srd.kamitsubaki.jp/cn/game' },
      { text: 'ANIMATE\n动画', link: 'https://www.bilibili.com/bangumi/media/md26640136' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/qianmo2233/kamitsubaki_city' }
    ],
  },
})

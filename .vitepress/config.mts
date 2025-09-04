import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "KAMITSUBAKI.CITY",
  description: "KAMITSUBAKI CITY",
  appearance: 'force-dark',
  srcDir: 'wiki',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  themeConfig: {
    outline: 'deep',
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
        text: 'KAMITSUBAKI VERSE',
        items: [
          { text: '大黑寂', link: '/city/blackout.html' },
          { text: '复兴课', link: '/city/fukkou.html' },
          { text: '破维魔' , link: '/city/tesseractor.html' },
          { text: '「Q」事件', link: '/city/quiz.html' },
          { text: '片段' , link: '/city/fragment.html' },
          { text: '记忆之卵', link: '/city/memory.html' },
          { text: '魔法与异能', link: '/city/magic.html' }, 
          { text: '现象', link: '/city/phenomen.html' },
        ]
      },
      {
        text: 'AREA 0 - 零番街',
        items: [
          { text: '市营团地', link: '/area0/danchi.html' },
          { text: '神椿学园', link: '/area0/gakuen.html' },
          { text: '市立阿迦奢图书馆', link: '/area0/library.html' },
        ]
      },
      {
        text: 'AREA 1 - 壹番街',
        items: [
          { text: "新和平町", link: '/area1/nyuheiwataun.html' },
          { text: "3号办公区", link: '/area1/office3.html' },
          { text: "十九里海岸", link: '/area1/shijukuri.html' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/qianmo2233/kamitsubaki_city' }
    ],
  },
})

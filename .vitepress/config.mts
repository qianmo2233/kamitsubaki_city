import { defineConfig } from 'vitepress'
import { HeaderNav, SideBarNav } from './nav'

export default defineConfig({
  title: "KAMITSUBAKI.CITY",
  description: "KAMITSUBAKI CITY",
  appearance: 'force-dark',
  cleanUrls: true,
  srcDir: 'wiki',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  themeConfig: {
    nav: HeaderNav,
    sidebar: SideBarNav,
    outline: {
      level: 'deep',
      label: '本页目录',
    },
    lastUpdated: {
      text: '最近更新于',
      formatOptions: { dateStyle: 'long', timeStyle: 'short' }
    },
    editLink: {
      pattern: 'https://github.com/qianmo2233/kamitsubaki_city/edit/main/wiki/:path',
      text: '在 GitHub 上编辑此页'
    },
  },
})

import { defineConfig } from 'vitepress'
import { HeaderNav, HeaderNavEN, HeaderNavES, HeaderNavFR, SideBarNav, SideBarNavEN, SideBarNavES, SideBarNavFR } from './nav'

export default defineConfig({
  title: "KAMITSUBAKI.CITY",
  description: "KAMITSUBAKI CITY",
  appearance: 'force-dark',
  cleanUrls: true,
  ignoreDeadLinks: true,
  srcDir: 'wiki',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
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
    },
    en: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: HeaderNavEN,
        sidebar: SideBarNavEN,
        outline: {
          level: 'deep',
          label: 'On this page',
        },
        lastUpdated: {
          text: 'Last Updated',
          formatOptions: { dateStyle: 'long', timeStyle: 'short' }
        },
        editLink: {
          pattern: 'https://github.com/qianmo2233/kamitsubaki_city/edit/main/wiki/:path',
          text: 'Edit this page on GitHub'
        },
      },
    },
    fr: {
      label: 'Français',
      lang: 'fr-FR',
      themeConfig: {
        nav: HeaderNavFR,
        sidebar: SideBarNavFR,
        outline: {
          level: 'deep',
          label: 'Sur cette page',
        },
        lastUpdated: {
          text: 'Dernière mise à jour',
          formatOptions: { dateStyle: 'long', timeStyle: 'short' }
        },
        editLink: {
          pattern: 'https://github.com/qianmo2233/kamitsubaki_city/edit/main/wiki/:path',
          text: 'Modifier cette page sur GitHub'
        },
      },
    },
    es: {
      label: 'Español',
      lang: 'es-ES',
      themeConfig: {
        nav: HeaderNavES,
        sidebar: SideBarNavES,
        outline: {
          level: 'deep',
          label: 'En esta página',
        },
        lastUpdated: {
          text: 'Última actualización',
          formatOptions: { dateStyle: 'long', timeStyle: 'short' }
        },
        editLink: {
          pattern: 'https://github.com/qianmo2233/kamitsubaki_city/edit/main/wiki/:path',
          text: 'Editar esta página en GitHub'
        },
      },
    },
  },
})

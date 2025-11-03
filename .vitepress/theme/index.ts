import { h } from 'vue'
import type { Theme } from 'vitepress'
import { initPageLoader } from './page_loader'
import { handleMobileBrowser } from './device_checker'
import KCTheme from './kc_theme'
import CursorDot from './kc_theme/components/CursorDot.vue'

import './style.css'
import KCWikiTop from './kc_theme/components/KCWikiTop.vue'
import Banner from './kc_theme/components/Banner.vue'

export default {
  extends: KCTheme,
  Layout: () => {
    return h(KCTheme.Layout, null, {
      "layout-top": ()=> h(Banner, {version: "1.0.0"}),
      "layout-bottom": () => h(CursorDot),
      "doc-before": () => h(KCWikiTop)
    })
  },
  enhanceApp({ app, router, siteData }) {
    handleMobileBrowser()
    initPageLoader()
  }
} satisfies Theme

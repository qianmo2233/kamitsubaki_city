import { h } from 'vue'
import type { Theme } from 'vitepress'
import { initPageLoader } from './page_loader'
import KCTheme from './kc_theme'
import CursorDot from './kc_theme/components/CursorDot.vue'

import './style.css'

export default {
  extends: KCTheme,
  Layout: () => {
    return h(KCTheme.Layout, null, {
      "layout-bottom": () => h(CursorDot),
    })
  },
  enhanceApp({ app, router, siteData }) {
    initPageLoader()
  }
} satisfies Theme

<script lang="ts" setup>
import type { DefaultTheme } from 'vitepress/theme'
import { useData } from '../composables/data'
import { isActive } from '../../shared'
import VPLink from './VPLink.vue'

defineProps<{
  item: DefaultTheme.NavItemWithLink
}>()

const { page } = useData()
</script>

<template>
  <VPLink
    :class="{
      VPNavBarMenuLink: true,
      active: isActive(
        page.relativePath,
        item.activeMatch || item.link,
        !!item.activeMatch
      )
    }"
    :href="item.link"
    :target="item.target"
    :rel="item.rel"
    :no-icon="item.noIcon"
    tabindex="0"
  >
    <!-- 包一层 span，让 \n 能生效 -->
    <span class="VPNavBarMenuLinkText" v-html="item.text"></span>
  </VPLink>
</template>

<style scoped>
.VPNavBarMenuLink {
  display: flex;
  align-items: center;
  padding: 0 12px;
  line-height: 1.25rem;
  font-size: 14px;
  font-weight: 900;
  color: var(--vp-c-text-1);
  position: relative;
  transition: color 0.25s;
}

/* 允许换行 */
.VPNavBarMenuLinkText {
  white-space: pre-line;
  text-align: center; /* 如果要居中换行的文字 */
}

/* 激活状态下方横线 */
.VPNavBarMenuLink.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 20%;
  width: 60%;
  height: 2px;
  background-color: white;
  border-radius: 2px;
  transform: translateY(0.75rem);
}

.VPNavBarMenuLink:hover {
  color: var(--vp-c-brand-1);
}
</style>
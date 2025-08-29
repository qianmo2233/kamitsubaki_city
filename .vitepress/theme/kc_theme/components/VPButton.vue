<script setup lang="ts">
import { computed } from 'vue'
import { normalizeLink } from '../support/utils'
import { EXTERNAL_URL_RE } from '../../shared'

interface Props {
  tag?: string
  size?: 'medium' | 'big'
  theme?: 'brand' | 'alt' | 'sponsor'
  text: string
  href?: string
  target?: string;
  rel?: string;
}
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  theme: 'brand'
})

const isExternal = computed(
  () => props.href && EXTERNAL_URL_RE.test(props.href)
)

const component = computed(() => {
  return props.tag || (props.href ? 'a' : 'button')
})
</script>

<template>
  <component :is="component" class="VPButton" :class="[size, theme]" :href="href ? normalizeLink(href) : undefined"
    :target="props.target ?? (isExternal ? '_blank' : undefined)"
    :rel="props.rel ?? (isExternal ? 'noreferrer' : undefined)">
    {{ text }}
  </component>
</template>

<style scoped>
.VPButton {
  display: inline-block;
  border: 5px solid white;
  /* 使用文字颜色作为边框色 */
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  background-color: transparent;
  /* 默认透明背景 */
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
}

.VPButton:active {
  transition: color 0.1s, border-color 0.1s, background-color 0.1s;
}

.VPButton.medium {
  border-radius: 0;
  /* 方形 */
  padding: 8px 28px;
  /* 增大内边距 */
  line-height: 1.4;
  /* 让高度随 padding 自然撑开 */
  font-size: 14px;
}

.VPButton.big {
  border-radius: 0;
  /* 方形 */
  padding: 12px 36px;
  /* 增大内边距 */
  line-height: 1.4;
  font-size: 16px;
}

/* Brand 按钮 outline */
.VPButton.brand {
  border-color: white;
  color: var(--vp-button-brand-text);
  background-color: transparent;
}

.VPButton.brand:hover {
  border-color: white;
  color: black;
  background-color: white;
  /* hover 时加轻微底色 */
}

.VPButton.brand:active {
  border-color: var(--vp-button-brand-active-border);
  color: var(--vp-button-brand-active-text);
  background-color: rgba(0, 0, 0, 0.08);
}

/* Alt 按钮 outline */
.VPButton.alt {
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: transparent;
}

.VPButton.alt:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: rgba(0, 0, 0, 0.04);
}

.VPButton.alt:active {
  border-color: var(--vp-button-alt-active-border);
  color: var(--vp-button-alt-active-text);
  background-color: rgba(0, 0, 0, 0.08);
}

/* Sponsor 按钮 outline */
.VPButton.sponsor {
  border-color: var(--vp-button-sponsor-border);
  color: var(--vp-button-sponsor-text);
  background-color: transparent;
}

.VPButton.sponsor:hover {
  border-color: var(--vp-button-sponsor-hover-border);
  color: var(--vp-button-sponsor-hover-text);
  background-color: rgba(0, 0, 0, 0.04);
}

.VPButton.sponsor:active {
  border-color: var(--vp-button-sponsor-active-border);
  color: var(--vp-button-sponsor-active-text);
  background-color: rgba(0, 0, 0, 0.08);
}
</style>

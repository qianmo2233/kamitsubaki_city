<script setup lang="ts">
import VPHomeHero from './VPHomeHero.vue'
import VPHomeFeatures from './VPHomeFeatures.vue'
import VPHomeContent from './VPHomeContent.vue'
import { useData } from '../composables/data'
import { ref, onMounted } from 'vue'

const { frontmatter, theme } = useData()

const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(true)

function togglePlay() {
  const video = videoRef.value
  if (!video) return

  if (video.paused) {
    video.play()
    isPlaying.value = true
  } else {
    video.pause()
    isPlaying.value = false
  }
}

onMounted(() => {
  const video = videoRef.value
  if (video) {
    isPlaying.value = true;
  }
})
</script>

<template>
  <div class="VPHome" :class="{
    'external-link-icon-enabled': theme.externalLinkIcon
  }">

    <slot name="home-hero-before" />
    <div class="hero-container">
      <div class="hero-video-wrapper">
        <video ref="videoRef" autoplay muted loop playsinline>
          <source src="/videos/bg.webm" type="video/webm" />
        </video>
        <div class="hero-video-overlay"></div>
      </div>

      <!-- 播放/暂停按钮 -->
      <button class="video-control-btn" @click="togglePlay">
        <span v-if="isPlaying">
          <!-- 暂停图标 -->
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="10" y1="15" x2="10" y2="9"></line>
            <line x1="14" y1="15" x2="14" y2="9"></line>
          </svg>
        </span>
        <span v-else>
          <!-- 播放图标 -->
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polygon points="10 8 16 12 10 16 10 8"></polygon>
          </svg>
        </span>
      </button>

      <VPHomeHero>
        <template #home-hero-info-before>
          <slot name="home-hero-info-before" />
        </template>
        <template #home-hero-info>
          <slot name="home-hero-info" />
        </template>
        <template #home-hero-info-after>
          <slot name="home-hero-info-after" />
        </template>
        <template #home-hero-actions-after>
          <slot name="home-hero-actions-after" />
        </template>
        <template #home-hero-image>
          <slot name="home-hero-image" />
        </template>
      </VPHomeHero>
    </div>
    <slot name="home-hero-after" />

    <slot name="home-features-before" />
    <VPHomeFeatures />
    <slot name="home-features-after" />

    <VPHomeContent v-if="frontmatter.markdownStyles !== false">
      <Content />
    </VPHomeContent>
    <Content v-else />
  </div>
</template>

<style scoped>
.VPHome {
  margin-bottom: none;
}

@media (min-width: 768px) {
  .VPHome {
    margin-bottom: none;
  }
}

/* 包裹 hero，方便定位 */
.hero-container {
  position: relative;
}

/* 视频背景 */
.hero-video-wrapper {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: -1;
}

.hero-video-wrapper video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 点状 + 渐变遮罩 */
.hero-video-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0.2) 40%,
      rgba(0, 0, 0, 0.2) 60%,
      rgba(0, 0, 0, 1)),
    radial-gradient(circle, rgba(0, 0, 0, 0.4) 1px, transparent 1px);
  background-size: 100% 100%, 6px 6px;
  mix-blend-mode: multiply;
}

/* 视频控制按钮 */
.video-control-btn {
  position: absolute;
  right: 3rem;
  bottom: 3rem;
  border: none;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
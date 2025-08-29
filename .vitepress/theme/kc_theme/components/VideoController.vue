<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

const props = defineProps<{
  videoId: string
}>()

const isPlaying = ref(false)
let videoEl: HTMLVideoElement | null = null

function togglePlay() {
  if (!videoEl) return
  if (videoEl.paused) {
    videoEl.play()
  } else {
    videoEl.pause()
  }
}

function updateState() {
  if (!videoEl) return
  isPlaying.value = !videoEl.paused
}

onMounted(() => {
  videoEl = document.getElementById(props.videoId) as HTMLVideoElement | null
  if (videoEl) {
    videoEl.addEventListener("play", updateState)
    videoEl.addEventListener("pause", updateState)
  }
})

onUnmounted(() => {
  if (videoEl) {
    videoEl.removeEventListener("play", updateState)
    videoEl.removeEventListener("pause", updateState)
  }
})
</script>

<template>
  <button @click="togglePlay" class="video-controller">
    <span v-if="isPlaying">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="feather feather-pause-circle">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="10" y1="15" x2="10" y2="9"></line>
        <line x1="14" y1="15" x2="14" y2="9"></line>
      </svg>
    </span>
    <span v-else>
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="feather feather-play-circle">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="10 8 16 12 10 16 10 8"></polygon>
      </svg>
    </span>
  </button>
</template>

<style scoped>
.video-controller {
  background: none;
  border: none;
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;  
}
</style>
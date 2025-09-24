<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const x = ref(0);
const y = ref(0);

const ringX = ref(0);
const ringY = ref(0);

const isPressed = ref(false);
const isHover = ref(false);
const isVisible = ref(false);

let rafId: number | null = null;

function move(e: MouseEvent) {
  x.value = e.clientX;
  y.value = e.clientY;
  if (!isVisible.value) isVisible.value = true;
}

function animate() {
  ringX.value += (x.value - ringX.value) * 0.15;
  ringY.value += (y.value - ringY.value) * 0.15;
  rafId = requestAnimationFrame(animate);
}

onMounted(() => {
  window.addEventListener("mousemove", move, { passive: true });
  window.addEventListener("mousedown", () => (isPressed.value = true));
  window.addEventListener("mouseup", () => (isPressed.value = false));

  document.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget) {
      isVisible.value = false;
    }
  });
  document.addEventListener("mouseover", () => {
    isVisible.value = true;
  });

  document.body.addEventListener("mouseover", (e) => {
    const target = (e.target as HTMLElement).closest(
      "a, button, [role='button'], input, textarea"
    );
    isHover.value = !!target;
  });

  animate();
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", move);
  window.removeEventListener("mousedown", () => (isPressed.value = true));
  window.removeEventListener("mouseup", () => (isPressed.value = false));

  document.removeEventListener("mouseout", () => {});
  document.removeEventListener("mouseover", () => {});
  document.body.removeEventListener("mouseover", () => {});

  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
    <div v-show="isVisible" class="cursor-dot" :style="{ left: x + 'px', top: y + 'px' }"></div>

    <div v-show="isVisible" class="cursor-ring" :class="{ pressed: isPressed, hover: isHover }"
        :style="{ left: ringX + 'px', top: ringY + 'px' }"></div>
</template>

<style scoped>
.cursor-dot {
    position: fixed;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 9999;
}

.cursor-ring {
    position: fixed;
    width: 32px;
    height: 32px;
    border: 2px solid white;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%) scale(1);
    transition: transform 0.2s ease-out, border-color 0.2s ease-out;
    z-index: 9998;
}

.cursor-ring.pressed {
    transform: translate(-50%, -50%) scale(0.8);
}

.cursor-ring.hover {
    border-color: #00ffff;
    transform: translate(-50%, -50%) scale(1.2);
}

.cursor-ring.hover.pressed {
    border-color: #00ffff;
    transform: translate(-50%, -50%) scale(0.9);
}
</style>
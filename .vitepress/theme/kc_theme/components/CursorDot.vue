<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const x = ref(0);
const y = ref(0);

const ringX = ref(0);
const ringY = ref(0);

const isPressed = ref(false);
const isHover = ref(false);
const isVisible = ref(false);

function move(e: MouseEvent) {
    x.value = e.clientX;
    y.value = e.clientY;
    isVisible.value = true;
}

function animate() {
    ringX.value += (x.value - ringX.value) * 0.15;
    ringY.value += (y.value - ringY.value) * 0.15;
    requestAnimationFrame(animate);
}

onMounted(() => {
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", () => (isPressed.value = true));
    window.addEventListener("mouseup", () => (isPressed.value = false));
    window.addEventListener("mouseleave", () => (isVisible.value = false)); // 移出页面隐藏
    window.addEventListener("mouseenter", () => (isVisible.value = true)); // 再次进入显示

    // 检测鼠标是否悬停在可点击元素上
    document.body.addEventListener("mouseover", e => {
        if ((e.target as HTMLElement).closest("a, button, [role='button'], input, textarea")) {
            isHover.value = true;
        }
    });
    document.body.addEventListener("mouseout", e => {
        if ((e.target as HTMLElement).closest("a, button, [role='button'], input, textarea")) {
            isHover.value = false;
        }
    });

    animate();
});

onBeforeUnmount(() => {
    window.removeEventListener("mousemove", move);
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
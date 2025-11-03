<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { ref, watchEffect, onMounted } from 'vue';

defineProps<{
    version: string;
}>();

const el = ref<HTMLElement>();
const dismissed = ref(false);
const { height } = useElementSize(el);

// 设置 CSS 变量，动态调整顶部间距
watchEffect(() => {
    if (height.value) {
        document.documentElement.style.setProperty(
            '--vp-layout-top-height',
            `${height.value + 16}px`
        );
    }
});

// 初始化：读取 localStorage 中保存的关闭状态
onMounted(() => {
    const stored = localStorage.getItem('bannerDismissed');
    dismissed.value = stored === 'true';
    if (dismissed.value) {
        document.documentElement.style.setProperty(
            '--vp-layout-top-height',
            `0px`
        );
    }
});

// 点击关闭按钮
const dismiss = () => {
    dismissed.value = true;
    localStorage.setItem('bannerDismissed', 'true');
    document.documentElement.style.setProperty(
        '--vp-layout-top-height',
        `0px`
    );
};
</script>

<template>
    <transition name="fade">
        <div v-if="!dismissed" ref="el" class="banner">
            <div class="text">
                KAMITSUBAKI FES'25 Day 1 record available soon! Click to watch →
                <a href="https://fes25.kamitsubaki.city" target="_blank">
                    fes25.kamitsubaki.city
                </a>
            </div>

            <button type="button" @click="dismiss">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>
        </div>
    </transition>
</template>

<style>
.banner-dismissed {
    --vp-layout-top-height: 0px !important;
}

html {
    --vp-layout-top-height: 88px;
}

@media (min-width: 375px) {
    html {
        --vp-layout-top-height: 64px;
    }
}

@media (min-width: 768px) {
    html {
        --vp-layout-top-height: 40px;
    }
}
</style>

<style scoped>
.banner-dismissed .banner {
    display: none;
}

.banner {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: var(--vp-z-index-layout-top);
    padding: 8px 16px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    overflow: hidden;

    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(6px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

/* 渐变文字 + 发光效果 */
.text {
    flex: 1;
    font-weight: 600;
    font-size: 16px;
    background: linear-gradient(90deg, #b300ff, #8b00ff, #00ffff);
    background-size: 65% 50%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

a {
    text-decoration: underline;
    font-weight: 500;
    -webkit-text-fill-color: transparent;
    background: linear-gradient(90deg, #a306a3, #9739e4, #00ffff);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    animation: gradientFlow 5s ease infinite;
}

button {
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
}

svg {
    width: 20px;
    height: 20px;
    margin-left: 8px;
    transition: transform 0.2s, filter 0.3s;
    filter: drop-shadow(0 0 4px #ff00ff);
}

button:hover svg {
    transform: scale(1.2);
    filter: drop-shadow(0 0 6px #00ffff);
}
</style>
<script setup>
import { computed, ref } from "vue"
import KCAreaMap from "./KCAreaMap.vue"
import { useData } from "vitepress"

const frontmatter = useData().frontmatter

// 当前区域索引（0 表示中心，1-6 表示环绕）
const currentArea = ref(-1)

// 点击事件：切换背景
function handleAreaClick(index) {
    currentArea.value = index
}

const bgImage = computed(() => {
    if (currentArea.value === -1) {
        return 'url(/kc.png)'
    } else {
        return `url(/kc_area_${currentArea.value}.png)`
    }
})

const area = computed(() => frontmatter.value.areas.find((i, _) => i.index === currentArea.value || currentArea.value === -1))

</script>

<template>
    <div class="world-bg" :style="{
        backgroundImage: bgImage
    }"></div>
    <div class="bg-overlay"></div>

    <div class="layout">
        <div class="map-wrapper">
            <KCAreaMap @click="handleAreaClick" />
        </div>

        <div class="info-section">
            <h1 class="title">{{ area.title }}</h1>
            <p class="description">
                {{ area.desc }}
            </p>
        </div>
    </div>
</template>

<style scoped>
/* 背景层 */
.world-bg {
    position: fixed;
    inset: 0;
    background: url("/kc_area_0.png") no-repeat top center;
    background-size: cover;
    transition: background-image 0.3s ease-in-out;
    animation: fadeIn 0.3s ease
}

@keyframes fadeIn {
    from {
        filter: blur(8px);
        opacity: 0;
    }

    to {
        filter: blur(0);
        opacity: 1;
    }
}

.bg-overlay {
    position: fixed;
    inset: 0;
    background: linear-gradient(to bottom,
            rgba(0, 0, 0, 1),
            rgba(0, 0, 0, 0.2) 40%,
            rgba(0, 0, 0, 0.2) 60%,
            rgba(0, 0, 0, 1)),
        radial-gradient(circle, rgba(0, 0, 0, 0.4) 1px, transparent 1px);
    background-size: 100% 100%, 6px 6px;
    mix-blend-mode: multiply;
}

/* 布局 */
.layout {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: space-between;
    padding: 2rem;
}

/* 左上角地图 */
.map-wrapper {
    position: fixed;
    bottom: 0rem;
    left: -4rem;
    width: 25rem;
    height: 100vh;

}

/* 底部文本 */
.info-section {
    position: fixed;
    bottom: 2rem;
    text-align: start;
    color: white;
}

.title {
    text-align: start;
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 1rem;
}

.description {
    text-align: start;
    font-size: 1rem;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
    white-space: pre-line;
}
</style>
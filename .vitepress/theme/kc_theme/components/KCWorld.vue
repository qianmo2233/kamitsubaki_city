<script setup>
import { computed, ref } from "vue"
import KCAreaMap from "./KCAreaMap.vue"
import { useData } from "vitepress"

const frontmatter = useData().frontmatter

const currentArea = ref(-1)

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
    <div class="world-bg" :style="{ backgroundImage: bgImage }"></div>
    <div class="bg-overlay"></div>

    <div class="area-wartermark" :class="{ 'is-text': currentArea >= 0 }">
        <span v-if="currentArea >= 0">AREA{{ currentArea }}</span>
    </div>

    <div class="layout">
        <div class="map-wrapper">
            <KCAreaMap @click="handleAreaClick" />
        </div>

        <div class="info-section">
            <h1 class="title">{{ area.title }}</h1>
            <p class="description">{{ area.desc }}</p>
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


.area-wartermark {
    position: fixed;
    right: -40px;
    height: 90vh;
    width: 100vw;
    background-image: url('/kc.svg');
    /* 默认 svg */
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: right center;
    filter: invert(1);
    opacity: 0.2;
    pointer-events: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.area-wartermark.is-text {
    background-image: none;
    right: 0;
    opacity: 0.2;
}

.area-wartermark span {
    writing-mode: vertical-rl;
    white-space: nowrap;
    letter-spacing: -5rem;
    text-orientation: upright;
    font-size: 12rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 1);
    filter: invert(1);
    margin-right: 2rem;
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

.layout {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: space-between;
    padding: 2rem;
}

.map-wrapper {
    position: fixed;
    bottom: 0rem;
    left: -4rem;
    width: 25rem;
    height: 100vh;

}

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
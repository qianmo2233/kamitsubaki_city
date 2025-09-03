<template>
    <div class="hex-map-container">
        <!-- SVG 六边形地图 -->
        <svg :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
            <g>
                <!-- 中心六边形 -->
                <polygon :points="hexPoints(0, 0, side)" class="hex center" :class="{ selected: selectedIndex === 0 }"
                    @click="onClick(0)" @mouseenter="onHover(0, true, $event)"
                    @mouseleave="onHover(0, false, $event)" />
                <!-- 外围六边形 -->
                <polygon v-for="(deg, idx) in ringAngles" :key="idx" :points="hexPoints(
                    neighborR * Math.cos(toRad(deg)),
                    neighborR * Math.sin(toRad(deg)),
                    side
                )" class="hex" :class="{ selected: selectedIndex === idx + 1 }" @click="onClick(idx + 1)"
                    @mouseenter="onHover(idx + 1, true, $event)" @mouseleave="onHover(idx + 1, false, $event)" />
            </g>
        </svg>

        <!-- 清除按钮 / 提示 -->
        <transition name="fade" mode="out-in">
            <button key="btn" v-if="selectedIndex !== -1" class="clear-btn" @click="clearSelection">
                眺望神椿市
            </button>
            <div key="tip" v-else class="tip">
                点击对应区域前往探索
            </div>
        </transition>

        <!-- 跟随提示容器 -->
        <div class="hover-tooltip"
            :style="{ left: tooltipPos.x + 'px', top: tooltipPos.y + 'px', opacity: hoverIndex !== -1 ? 1 : 0 }">
            {{ hoverIndex !== -1 ? areaNames[hoverIndex] : "" }}
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
    side: { type: Number, default: 80 },
    viewSize: { type: Number, default: 400 },
})

const emit = defineEmits(["click", "hover"])

const side = props.side
const neighborR = side * Math.sqrt(3)
const ringAngles = [0, 60, 120, 180, 240, 300]
const viewBox = `-${props.viewSize} -${props.viewSize} ${props.viewSize * 2} ${props.viewSize * 2}`

const selectedIndex = ref(-1)
const hoverIndex = ref(-1)
const tooltipPos = ref({ x: 0, y: 0 })

const areaNames = [
    "零番街",
    "一番街",
    "二番街",
    "三番街",
    "四番街",
    "五番街",
    "六番街"
]

function toRad(deg) {
    return (deg * Math.PI) / 180
}

function hexPoints(cx, cy, side) {
    const pts = []
    for (let i = 0; i < 6; i++) {
        const angle = -90 + i * 60
        const rad = toRad(angle)
        const x = cx + side * Math.cos(rad)
        const y = cy + side * Math.sin(rad)
        pts.push(`${x},${y}`)
    }
    return pts.join(" ")
}

function onClick(index) {
    selectedIndex.value = index
    emit("click", index)
}

function onHover(index, isEnter, e) {
    if (isEnter) {
        hoverIndex.value = index
        tooltipPos.value = { x: e.clientX + 10, y: e.clientY + 10 }
    } else {
        hoverIndex.value = -1
    }
    emit("hover", { index, enter: isEnter })
}

function clearSelection() {
    selectedIndex.value = -1
    emit("click", -1)
}
</script>

<style scoped>
.hex-map-container {
    position: relative;
    display: flex;
    flex-direction: column;
    /* 垂直排列 */
    align-items: center;
    /* 水平居中 */
    justify-content: center;
    /* 垂直居中（可选，看你是否要整体居中） */
}

svg {
    width: 100%;
    display: block;
}

/* 六边形样式 */
.hex {
    fill: #ffffff0b;
    stroke: #ffffff74;
    stroke-width: 5;
    transition: transform 0.25s ease, fill 0.25s ease, stroke-width 0.25s ease;
    cursor: pointer;
}

.hex:hover {
    transform: scale(1.08);
    fill: #ffffff27;
    stroke-width: 10;
}

.selected {
    fill: #4caf5033;
    stroke: #4caf50;
    stroke-width: 8;
}

.tip {
    font-size: small;
    margin-top: -4rem;
    background: rgba(0, 0, 0, 0.15);
    color: white;
    backdrop-filter: blur(4px);
    padding: 2px 8px;
    border-radius: 50px;
}

/* 按钮 */
.clear-btn {
    width: max-content;
    font-size: medium;
    font-weight: 900;
    padding: 6px 36px;
    background: transparent;
    color: white;
    border: 4px solid white;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: -3rem;
}

.clear-btn:hover {
    background: #ffffff;
    color: #000000;
}

/* 按钮切换动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* 悬浮提示 */
.hover-tooltip {
    position: fixed;
    background: rgba(50, 50, 50, 0.85);
    color: white;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 14px;
    pointer-events: none;
    white-space: nowrap;
    transition: all 0.3s ease;
}
</style>
<template>
    <div class="hero-page">
        <section class="hero" ref="heroRef">
            <div class="bg-overlay"></div>

            <h1 class="hero-title" ref="titleRef">CHARACTER</h1>

            <div class="scroll-hint" ref="hintRef">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-arrow-down">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
            </div>

            <div class="mv__main" ref="mainRef">
                <div v-for="i in 4" :key="i" :class="`mv__main__${i} mv__main__ph`">
                    <img src="/character_bg.jpeg" alt="" />
                </div>
            </div>
        </section>

        <section class="character-grid">
            <div v-for="i in 5" :key="'c' + i" class="character-card">
                <img :src="`/chara_main${i}_1.png`" :alt="`Character ${i}`" />
            </div>
        </section>

        <section class="placeholder" v-for="i in 3" :key="'p' + i">
            <h1>character page under construction</h1>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";

const mainRef = ref(null);
const titleRef = ref(null);
const hintRef = ref(null);
let tl = null;

onMounted(async () => {
    await nextTick();
    const imgs = mainRef.value.querySelectorAll("img");
    const title = titleRef.value;
    const hint = hintRef.value;

    const initValues = [
        { x: 10 }, { x: -15 }, { x: -40 }, { x: -65 }
    ];
    imgs.forEach((img, i) => {
        gsap.set(img, {
            xPercent: initValues[i].x,
            scale: 1.1,
            opacity: 0,
            filter: "grayscale(1) contrast(3)"
        });
    });

    gsap.set(title, {
        scale: 3,
        opacity: 0,
        yPercent: -50,
        xPercent: -50,
        left: "50%",
        top: "50%",
        position: "absolute",
    });

    gsap.set(hint, { opacity: 0, y: 20 });

    tl = gsap.timeline({ defaults: { ease: "circ.inOut" } });

    const runIfLoaded = () => {
        if (document.documentElement.classList.contains("loaded")) {
            runAnimations();
        } else {
            const observer = new MutationObserver(() => {
                if (document.documentElement.classList.contains("loaded")) {
                    runAnimations();
                    observer.disconnect();
                }
            });
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        }
    };

    runIfLoaded();
});

const runAnimations = () => {
    const imgs = mainRef.value.querySelectorAll("img");
    const title = titleRef.value;
    const hint = hintRef.value;

    tl.to(title, { scale: 1, opacity: 1, duration: 0.7 })
      .to(title, { scale: 0.7, yPercent: -1000, duration: 0.7 })
      .to(imgs[0], { xPercent: 0, scale: 1, opacity: 1, filter: "grayscale(0) contrast(1)", duration: 1.5 }, "-=1.0")
      .to(imgs[1], { xPercent: -25, scale: 1, opacity: 1, filter: "grayscale(0) contrast(1)", duration: 1.5 }, "-=1.4")
      .to(imgs[2], { xPercent: -50, scale: 1, opacity: 1, filter: "grayscale(0) contrast(1)", duration: 1.5 }, "-=1.4")
      .to(imgs[3], { xPercent: -75, scale: 1, opacity: 1, filter: "grayscale(0) contrast(1)", duration: 1.5 }, "-=1.4")
      .to(hint, { opacity: 1, y: 0, duration: 1 }, "-=0.4");

    gsap.to(hint, { y: 1, repeat: -1, yoyo: true, duration: 3, ease: "power1.inOut" });
}
</script>

<style scoped>
.hero-page {
    margin-top: -64px;
    background: black;
    color: white;
}

section {
    width: 100%;
    height: 100vh;
    position: relative;
}

.hero {
    overflow: hidden;
}

.scroll-hint {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.5);
    z-index: 15;
    pointer-events: none;
}

.hero-title {
    font-size: 6vw;
    font-weight: bold;
    text-align: center;
    color: white;
    z-index: 20;
    pointer-events: none;
}

.bg-overlay {
    position: absolute;
    z-index: 10;
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

.mv__main {
    aspect-ratio: 3840 / 2160;
    position: relative;
}

.mv__main__ph img {
    position: absolute;
    top: 0;
    left: 0;
    width: 400%;
    max-width: none;
    position: relative;
}

.mv__main__1,
.mv__main__2,
.mv__main__3,
.mv__main__4 {
    position: absolute;
    top: 0;
    width: 25%;
    height: 100%;
    overflow: hidden;
}

.mv__main__1 {
    left: 0;
}

.mv__main__2 {
    left: 25%;
}

.mv__main__3 {
    left: 50%;
}

.mv__main__4 {
    left: 75%;
}

/* 新增 Section: 五等分图片 */
.character-grid {
    height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
}

.character-card {
    align-self: self-end;
    height: 100%;
    flex: 1;
    overflow: hidden;
    border-radius: 12px;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.character-card img {
    object-fit: cover;
    height: 100%;
    display: block;
    transition: transform 0.4s ease;
}

.character-card:hover img {}

/* 占位 section */
.placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
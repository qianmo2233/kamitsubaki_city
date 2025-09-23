<template>
    <div class="hero-page" id="smooth-content">
        <section class="hero panel" ref="heroRef">
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

        <div class="horizontal-wrapper">
            <section class="character-grid h-section">
                <div class="character-overlay"></div>
                <h2 class="character-title" ref="section2TitleRef">WITCHLING 魔女之子</h2>
                <div v-for="i in 5" :key="'cw' + i" class="character-card">
                    <p class="character-name">{{ characters_witchling[i - 1].name }}</p>
                    <img :src="characters_witchling[i - 1].img" :alt="`CW ${i}`" />
                </div>
            </section>

            <section class="character-grid h-section">
                <div class="character-overlay"></div>
                <h2 class="character-title">FAMILIER 眷魔</h2>
                <div v-for="i in 5" :key="'cf' + i" class="character-card">
                    <p class="character-name">{{ characters_familier[i - 1].name }}</p>
                    <img :src="characters_familier[i - 1].img" :alt="`CF ${i}`" />
                </div>
            </section>
        </div>

        <div class="placeholder">
            <button class="read-more-btn" @click="window.location.href = '/character/kafu'">更多角色</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, ScrollSmoother);

const characters_witchling = ref([
    {
        img: "/chara_main1_1.png",
        name: "森先 化步",
    },
    {
        img: "/chara_main2_1.png",
        name: "谷置 狸眼",
    },
    {
        img: "/chara_main3_1.png",
        name: "潮主 派流",
    },
    {
        img: "/chara_main4_1.png",
        name: "夜河 世界",
    },
    {
        img: "/chara_main5_1.png",
        name: "轮回 此处",
    },
])

const characters_familier = ref([
    {
        img: "/chara_main6_1.png",
        name: "拉普拉斯",
    },
    {
        img: "/chara_main7_1.png",
        name: "哈斯塔",
    },
    {
        img: "/chara_main8_1.png",
        name: "阿耆尼",
    },
    {
        img: "/chara_main9_1.png",
        name: "阿涅摩斯",
    },
    {
        img: "/chara_main10_1.png",
        name: "库格尔",
    },
])

const mainRef = ref(null);
const titleRef = ref(null);
const hintRef = ref(null);
const section2TitleRef = ref(null);
let tl = null;
let smoother = null;

onMounted(async () => {
    await nextTick();

    document.body.style.overflow = "hidden";

    const imgs = mainRef.value.querySelectorAll("img");
    const title = titleRef.value;
    const hint = hintRef.value;

    const initValues = [{ x: 10 }, { x: -15 }, { x: -40 }, { x: -65 }];
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

    tl = gsap.timeline({
        defaults: { ease: "circ.inOut" },
        onComplete: () => {
            document.body.style.overflow = "auto";

            //enableSectionScroll();
        }
    });

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
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ["class"]
            });
        }
    };

    runIfLoaded();
    initST();

    nextTick(() => {
        const sections = gsap.utils.toArray(".horizontal-wrapper .character-grid");
        const totalScroll = (sections.length - 1) * window.innerWidth;

        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                pin: true,
                scrub: 1,
                start: "top top",
                trigger: ".horizontal-wrapper",
                end: () => "+=" + totalScroll,
            }
        });

        const grids = gsap.utils.toArray(".character-grid");
        grids.forEach((grid, i) => {
            const title = grid.querySelector(".character-title");
            if (!title) return;

            ScrollTrigger.create({
                trigger: ".horizontal-wrapper",
                start: () => "top top",
                end: () => "top top+=" + (i * window.innerWidth),
                pin: title,
                pinSpacing: false,
                scrub: false,
            });
        });

        smoother = ScrollSmoother.create({
            smooth: 1,
            effects: true
        })
    });
});


const initST = () => {
    const imgs = document.querySelectorAll(".character-card img");
    const names = document.querySelectorAll(".character-name");
    const titleEl = section2TitleRef.value;

    const split = new SplitText(titleEl, {
        type: "chars",
    });

    gsap.fromTo(
        names,
        { x: 200 }, // 初始：在右边不可见
        {
            x: 0,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
                trigger: ".character-grid",
                start: "top 100%",
                end: "top 20%",
                scrub: true,
            },
        }
    );

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".character-grid",
            start: "top 20%",
            toggleActions: "play none none reverse",
        },
    });

    // 文字入场
    tl.from(split.chars, {
        opacity: 0,
        y: 40,
        stagger: 0.02,
        duration: 0.4,
        ease: "expo.out",
    });

    // 图片入场
    imgs.forEach((img, i) => {
        const yOffset = 100 + i * 40;
        tl.fromTo(
            img,
            { opacity: 0, y: yOffset },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "circ.out",
            },
            "-=0.5"
        );
    });

    tl.add(() => {
        imgs.forEach((img) => {
            img.addEventListener("mouseenter", () => {
                gsap.to(img, {
                    scale: 1.1,
                    y: 30,
                    duration: 0.4,
                    ease: "power2.out",
                    background: "linear-gradient(to top, rgba(255,255,255,1), rgba(0,0,0,0))"
                });
            });

            img.addEventListener("mouseleave", () => {
                gsap.to(img, {
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    background: 'linear-gradient(to top, rgba(255,255,255,0.6), rgba(0,0,0,0))'
                });
            });
        });
    });
};

const runAnimations = () => {
    const imgs = mainRef.value.querySelectorAll("img");
    const title = titleRef.value;
    const hint = hintRef.value;

    tl.to(title, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        scrambleText: {
            text: "CHARACTER",
            chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            revealDelay: 0.4,
            speed: 2,
        },
    })
        .to(title, { scale: 0.7, yPercent: -1000, duration: 0.7 })
        .to(imgs[0], { xPercent: 0, scale: 1, opacity: 1, filter: "grayscale(0) contrast(1)", duration: 1.5 }, "-=1.0")
        .to(imgs[1], { xPercent: -25, scale: 1, opacity: 1, filter: "grayscale(0) contrast(1)", duration: 1.5 }, "-=1.4")
        .to(imgs[2], { xPercent: -50, scale: 1, opacity: 1, filter: "grayscale(0) contrast(1)", duration: 1.5 }, "-=1.4")
        .to(imgs[3], { xPercent: -75, scale: 1, opacity: 1, filter: "grayscale(0) contrast(1)", duration: 1.5 }, "-=1.4")
        .to(hint, { opacity: 1, y: 0, duration: 1 }, "-=0.4");

    gsap.to(hint, {
        y: 1,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "power1.inOut",
    });
};

onBeforeUnmount(() => {
    if (tl) {
        tl.kill();
        tl = null;
    }


    if (smoother) {
        smoother.kill();
        smoother = null;
    }

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
</script>

<style scoped>
.hero-page {
    margin-top: -64px;
    background: black;
    color: white;
}

section {
    width: 100%;
    height: calc(100vh + 64px);
    position: relative;
}

.read-more-btn {
    margin-top: 2rem;
    padding: 12px 36px;
    font-size: 1rem;
    font-weight: 700;
    color: white;
    background: transparent;
    border: 5px solid white;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.read-more-btn:hover {
    background: white;
    color: black;
    transform: scale(1.05);
}

.hero {
    overflow: hidden;
}

.horizontal-wrapper {
    display: flex;
    height: 100vh;
    width: max-content;
}

.character-title {
    position: absolute;
    top: 128px;
    left: 64px;
    font-size: 2rem;
    font-weight: bold;
    color: white;
    z-index: 10;
}

.character-name {
    position: absolute;
    right: 20px;
    top: 64px;
    font-size: 6rem;
    writing-mode: vertical-lr;
    text-orientation: mixed;
    font-family: "SimSun", "NSimSun", "Songti SC", "宋体", serif;
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

.character-overlay {
    pointer-events: none;
    position: absolute;
    z-index: 10;
    inset: 0;
    background: linear-gradient(to bottom,
            rgba(0, 0, 0, 0),
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
    flex: 0 0 100vw;
    justify-content: space-between;
    align-items: center;
    background: black;
}

.character-card {
    position: relative;
    align-self: self-end;
    height: 80%;
    flex: 1;
    overflow: hidden;
}

.character-card img {
    object-fit: cover;
    -webkit-user-drag: none;
    height: 220%;
    display: block;
    opacity: 0;
    transform: translateY(50px);
}

.placeholder {
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
}
</style>
export function handleMobileBrowser() {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return;
    }
    
    if (window.matchMedia("(pointer: coarse)").matches) {
        return window.location.href = "https://ayo.meow0.fun";
    }

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        window.location.href = "https://ayo.meow0.fun";
    }

    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = "https://ayo.meow0.fun";
    }
}
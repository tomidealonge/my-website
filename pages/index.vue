<template>
  <div
    v-touch:swipe="swipeListener"
    @wheel.prevent="scrollDirection"
    class="home"
  >
    <LottieComponent />
    <canvas ref="noiseCanvas" class="noise-canvas"></canvas>
    <div class="logo">TA.</div>
    <div class="hamburger" @click="toggleNavVisibility">
      <lottie-animation
        :animation-data="hamburgerData"
        :auto-play="false"
        :loop="false"
      />
    </div>

    <div class="nav-comp-wrapper">
      <NavComponent
        :navVisibility="isNavVisible"
        :activeComponent="activeComponent"
        @updateDestinationComponent="updateDestinationComponent"
      />
    </div>
    <component
      @updateActiveComponent="updateActiveComponent"
      :animatingOut="animatingOut"
      :is="components[activeComponent]"
    />
    <InteractiveComponent />
    <div ref="cursor" class="cursor"></div>
    <div class="scroll-indicator"></div>
  </div>
</template>

<script setup>
import { initWebflow } from "~/commons/utils";
import hamburgerData from "~/assets/lottie/hamburger.json";
import HeaderComponent from "~/components/HeaderComponent.vue";
import AboutComponent from "~/components/AboutComponent.vue";
import WorksComponent from "~/components/WorksComponent.vue";
import WorksComponentExtra from "~/components/WorksComponentExtra.vue";
import ContactComponent from "~/components/ContactComponent.vue";

// Map of section-component names to their definitions for `<component :is>`
const components = {
  HeaderComponent,
  AboutComponent,
  WorksComponent,
  WorksComponentExtra,
  ContactComponent,
};
const componentOrder = [
  "HeaderComponent",
  "AboutComponent",
  "WorksComponent",
  "WorksComponentExtra",
  "ContactComponent",
];

const noiseCanvas = ref(null);
const cursor = ref(null);

const isNavVisible = ref(false);
const isScrolling = ref(false);
const activeComponent = ref("HeaderComponent");
const destinationComponent = ref("");
const activeComponentIndex = ref(0);
const animatingOut = ref(false);
const isNotMobile = ref(
  import.meta.client ? window.matchMedia("(min-width: 414px)").matches : false
);

// Noise animation handles, kept for cleanup on unmount.
let noiseFrameId = null;
let noiseResizeHandler = null;

const generateNoise = () => {
  const canvas = noiseCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Small tile repeated across the screen. Generating a handful of tiles once
  // (instead of a full-screen buffer every frame) is what makes this cheap.
  const TILE_SIZE = 256;
  const FRAME_COUNT = 10;
  const ALPHA = 27;
  // Film-grain reads fine well below 60fps; throttling halves the work.
  const frameInterval = 1000 / 24;

  // Pre-render the noise frames ONCE into reusable patterns.
  const patterns = [];
  const tileCanvas = document.createElement("canvas");
  tileCanvas.width = TILE_SIZE;
  tileCanvas.height = TILE_SIZE;
  const tileCtx = tileCanvas.getContext("2d");
  const imageData = tileCtx.createImageData(TILE_SIZE, TILE_SIZE);
  const buffer = imageData.data;

  for (let f = 0; f < FRAME_COUNT; f++) {
    for (let i = 0; i < buffer.length; i += 4) {
      const value = Math.random() * 255;
      buffer[i] = value;
      buffer[i + 1] = value;
      buffer[i + 2] = value;
      buffer[i + 3] = ALPHA;
    }
    tileCtx.putImageData(imageData, 0, 0);

    const frameCanvas = document.createElement("canvas");
    frameCanvas.width = TILE_SIZE;
    frameCanvas.height = TILE_SIZE;
    frameCanvas.getContext("2d").drawImage(tileCanvas, 0, 0);
    patterns.push(ctx.createPattern(frameCanvas, "repeat"));
  }

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();

  let currentFrame = 0;
  let lastTime = 0;

  const draw = (time) => {
    noiseFrameId = requestAnimationFrame(draw);
    if (time - lastTime < frameInterval) return;
    lastTime = time;

    currentFrame = (currentFrame + 1) % FRAME_COUNT;
    // Just tile a ready-made pattern: no per-pixel work, no allocation.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = patterns[currentFrame];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  noiseFrameId = requestAnimationFrame(draw);

  let resizeTimeout;
  noiseResizeHandler = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 150);
  };
  window.addEventListener("resize", noiseResizeHandler);
};

const toggleNavVisibility = () => {
  isNavVisible.value = !isNavVisible.value;
};

const findActiveComponentIndex = () => {
  activeComponentIndex.value = componentOrder.indexOf(activeComponent.value);
};

const updateActiveComponent = () => {
  animatingOut.value = false;
  activeComponent.value = destinationComponent.value;
  findActiveComponentIndex();
};

const updateDestinationComponent = (component) => {
  isNavVisible.value = false;
  animatingOut.value = true;
  destinationComponent.value = component;
};

const mouseMove = () => {
  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  const animate = () => {
    // Lerp factor — lower = more lag/slippery (0.05–0.15 is a good range)
    const ease = 0.08;

    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;

    if (cursor.value) {
      cursor.value.style.left = `${cursorX}px`;
      cursor.value.style.top = `${cursorY}px`;
    }

    requestAnimationFrame(animate);
  };

  animate();
};

const goingUp = () => {
  if (activeComponentIndex.value === 0) return;
  updateDestinationComponent(componentOrder[activeComponentIndex.value - 1]);
};

const goingDown = () => {
  if (activeComponentIndex.value === componentOrder.length - 1) return;
  updateDestinationComponent(componentOrder[activeComponentIndex.value + 1]);
};

const scrollDirection = (e) => {
  if (isScrolling.value) return;
  if (e.deltaY === -0) return;

  isScrolling.value = true;
  if (e.deltaY < 0) {
    console.log("going up");
    goingUp();
  } else {
    console.log("going down");
    goingDown();
  }

  setTimeout(() => {
    isScrolling.value = false;
  }, 2000);
};

const swipeListener = (direction) => {
  if (isScrolling.value) return;

  isScrolling.value = true;
  if (direction === "bottom") {
    goingUp();
  } else if (direction === "top") {
    goingDown();
  }
  setTimeout(() => {
    isScrolling.value = false;
  }, 2000);
};

useHead({
  htmlAttrs: {
    lang: "en",
    "data-wf-page": "625c6a5308227842ea6f9d62",
    "data-wf-site": "6230b278fc8aa147cc32e94c",
  },
});

onMounted(() => {
  mouseMove();
  generateNoise();
  nextTick(() => {
    initWebflow();
  });
});

onUnmounted(() => {
  if (noiseFrameId) cancelAnimationFrame(noiseFrameId);
  if (noiseResizeHandler)
    window.removeEventListener("resize", noiseResizeHandler);
});
</script>

<style>
.cursor {
  position: absolute;
  transition: transform 0.3s ease-out;
  cursor: none;
}
</style>

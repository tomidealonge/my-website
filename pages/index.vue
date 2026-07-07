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
import InteractiveComponent from "~/components/InteractiveComponent.vue";

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

const generateNoise = () => {
  const canvas = noiseCanvas.value;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d");

  const draw = () => {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const buffer = imageData.data;

    for (let i = 0; i < buffer.length; i += 4) {
      const value = Math.random() * 255;
      buffer[i] = value;
      buffer[i + 1] = value;
      buffer[i + 2] = value;
      buffer[i + 3] = 27;
    }

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(draw);
  };

  draw();
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
  // generateNoise();
  nextTick(() => {
    initWebflow();
  });
});
</script>

<style>
.cursor {
  position: absolute;
  transition: transform 0.3s ease-out;
  cursor: none;
}
</style>

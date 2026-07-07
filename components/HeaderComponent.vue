<template>
  <transition appear @leave="leave">
    <div class="header">
      <div class="hero">
        <div class="text-wrapper">
          <div class="hero__first-line">
            <span>S</span>
            <span>O</span>
            <span>F</span>
            <span>T</span>
            <span>W</span>
            <span>A</span>
            <span>R</span>
            <span>E</span>
          </div>
          <div class="hero__first-line hero__first-line--overlay">
            <span>S</span>
            <span>O</span>
            <span>F</span>
            <span>T</span>
            <span>W</span>
            <span>A</span>
            <span>R</span>
            <span>E</span>
          </div>
        </div>
        <div class="text-wrapper">
          <div class="hero__last-line">
            <span>E</span>
            <span>N</span>
            <span>G</span>
            <span>I</span>
            <span>N</span>
            <span>E</span>
            <span>E</span>
            <span>R</span>
          </div>
        </div>
      </div>
      <p class="sub-hero">
        Hi, 👋🏻 I'm Tomide, a software engineer focused on creating functional
        products and unique experiences on the web.
      </p>
    </div>
  </transition>
</template>

<script setup>
const { $gsap } = useNuxtApp();
const { textAnimation } = useSplitText();

const props = defineProps({
  animatingOut: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["updateActiveComponent"]);

const selector = "sub-hero";
const timeline = $gsap.timeline({ paused: true });

const leave = async () => {
  await timeline.timeScale(2).reverse();
  emit("updateActiveComponent");
};

useAnimateOut(() => props.animatingOut, leave);

onMounted(() => {
  timeline
    .fromTo(
      ".hero__first-line span",
      {
        opacity: 0,
        x: "-100px"
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.07445,
        ease: "Power1.easeout"
      }
    )
    .to(".hero__first-line", {
      clipPath: "polygon(100% 100%, 100% 0, 0 0, 0 100%)",
      duration: 0.7,
      ease: "Power2.easeout"
    })
    .to(
      ".hero__first-line--overlay",
      {
        clipPath: "polygon(100% 100%, 100% 100%, 0 100%, 0 100%)",
        duration: 0.7,
        ease: "Power2.easeout"
      },
      "<"
    )
    .to(
      ".hero__last-line",
      {
        clipPath: "polygon(100% 100%, 100% 0, 0 0, 0 100%)",
        opacity: 1,
        duration: 0.7,
        ease: "Power2.easeout"
      },
      "-=0.5"
    )
    .from(
      ".sub-hero",
      {
        opacity: 0
      },
      "-=1"
    )
    .call(textAnimation, [selector], "-=1");

  // The header is the initial component, so it mounts via the transition's
  // `appear` path rather than a normal enter. Play the intro directly on mount
  // instead of relying on the appear hook firing.
  timeline.play();
});
</script>

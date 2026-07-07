<template>
  <transition appear @after-enter="afterEnter" @before-leave="leave">
    <div class="about">
      <div class="about__text-block">
        <p class="about__main-text">
          Over the past 6 years as a software engineer, I’ve worked on a wide
          range of projects.
        </p>
        <div class="about__white-bg-text-block">
          <p>
            I specialize in creating functional products, and immersive
            experiences for diverse set of users on the web. Currently, I lead
            an engineering team where I channel the teams energy and expertise
            into creating functional products and immersive web experiences.
            <br />
          </p>
        </div>
      </div>
      <div class="about__picture">
        <img :src="mePicture" alt="A picture of me, a very good one 🥰" />
      </div>
    </div>
  </transition>
</template>

<script setup>
import mePicture from "~/assets/images/me.png";

const { $gsap } = useNuxtApp();
const { textAnimation } = useSplitText();

const props = defineProps({
  animatingOut: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["updateActiveComponent"]);

const selector = "about__white-bg-text-block p";
const mainTextSelector = "about__main-text";
const timeline = $gsap.timeline({ paused: true });

const afterEnter = () => {
  timeline.play();
};

const leave = async () => {
  await timeline.timeScale(2).reverse();
  emit("updateActiveComponent");
};

useAnimateOut(() => props.animatingOut, leave);

onMounted(() => {
  timeline
    .to(".about__picture", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.2,
      ease: "Power2.easeout"
    })
    .to(
      `.about__white-bg-text-block`,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.2,
        ease: "Power2.easeout"
      },
      "<"
    )
    .to(`.about__main-text`, {
      opacity: 1
    })
    .call(textAnimation, [mainTextSelector], "<")
    .to(
      `.about__white-bg-text-block p`,
      {
        opacity: 1
      },
      "-=1"
    )
    .call(textAnimation, [selector], "<");
});
</script>

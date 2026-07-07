<template>
  <transition appear @after-enter="afterEnter" @before-leave="leave">
    <div class="contact">
      <div
        @mouseenter="increaseCursor"
        @mouseleave="decreaseCursor"
        class="contact__title"
      >
        Contact Me
      </div>
      <div class="contact__line"></div>
      <div class="contact__details">
        <div class="contact__block --first">
          <div class="contact__sub-title --big">
            Wanna Be Startin' Somethin
          </div>
          <p class="contact__sub-title">
            Feel free to reach out if you wanna collaborate with me, or simply
            have a chat
          </p>
        </div>
        <div class="contact__block">
          <div class="contact__sub-title">Say Hi / Collaborate</div>
          <ul class="contact__link">
            <li
              class="email"
              @mouseenter="increaseCursor"
              @mouseleave="decreaseCursor"
            >
              <a
                target="_blank"
                href="mailto:akintomide.alonge@gmail.com?subject=Enquiries From Website"
                >Email</a
              >
            </li>
          </ul>
        </div>
        <div class="contact__block ">
          <div class="contact__sub-title">Connect</div>
          <ul class="contact__link">
            <li
              class="socials"
              @mouseenter="increaseCursor"
              @mouseleave="decreaseCursor"
            >
              <a target="_blank" href="https://github.com/tomidealonge"
                >Github</a
              >
            </li>
            <li
              class="socials"
              @mouseenter="increaseCursor"
              @mouseleave="decreaseCursor"
            >
              <a target="_blank" href="https://www.linkedin.com/in/tomidealonge"
                >Linkedin</a
              >
            </li>
            <li
              v-if="false"
              class="socials"
              @mouseenter="increaseCursor"
              @mouseleave="decreaseCursor"
            >
              <a target="_blank" href="https://twitter.com/tomidealonge"
                >Twitter</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="site-credit">
        <div class="contact__line"></div>
        <div class="site-credit__text">
          Designed by
          <span
            ><a
              @mouseenter="increaseCursor"
              @mouseleave="decreaseCursor"
              target="_blank"
              href="https://joshuaoladiti.com/"
              >Josh</a
            ></span
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const { $gsap } = useNuxtApp();
const { increaseCursor, decreaseCursor } = useMouseHover();

const props = defineProps({
  animatingOut: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["updateActiveComponent"]);

const timeline = $gsap.timeline({ paused: true });

const afterEnter = () => {
  timeline.play();
};

const animateLines = () => {
  const lines = document.querySelectorAll(".contact__line");
  lines.forEach((line, index) => {
    const num = index + 1;
    if (num % 2 === 0) {
      line.classList.add("even");
    }
  });
};

const leave = async () => {
  await timeline.timeScale(2).reverse();
  emit("updateActiveComponent");
};

useAnimateOut(() => props.animatingOut, leave);

onMounted(() => {
  animateLines();
  timeline
    .to(".contact__line", {
      width: "100%",
      ease: "Power2.easeout"
    })
    .from(".contact__title", {
      opacity: 0,
      duration: 1,
      ease: "Power1.easeout"
    })
    .from(
      ".contact__sub-title",
      {
        opacity: 0,
        duration: 1,
        ease: "Power1.easeout"
      },
      "<"
    )
    .from(
      ".email",
      {
        opacity: 0,
        x: -30,
        duration: 0.7,
        ease: "Power1.easeout",
        stagger: 0.245
      },
      "-=1"
    )
    .from(
      ".socials",
      {
        opacity: 0,
        x: -30,
        duration: 0.7,
        ease: "Power1.easeout",
        stagger: 0.245
      },
      "<"
    );
});
</script>

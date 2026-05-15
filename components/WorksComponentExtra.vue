<template>
  <transition appear @after-enter="afterEnter" @leave="leave">
    <div class="projects">
      <div class="projects__container">
        <div class="project__wrapper">
          <div class="project__line "></div>
          <div class="project__desc">
            <a
              href="https://sliders.tomidealonge.com/"
              target="_blank"
              @mouseenter="increaseCursor"
              @mouseleave="decreaseCursor"
              class="project__title"
              >Sliders</a
            >
            <p class="project__summary">
              Fun build for full page slider
            </p>
          </div>
          <div class="project__line "></div>
        </div>
        <div v-if="false" class="project__wrapper">
          <div class="project__desc">
            <a
              href="https://pictures.tomidealonge.com"
              target="_blank"
              @mouseenter="increaseCursor"
              @mouseleave="decreaseCursor"
              class="project__title"
              >My wife and I</a
            >
            <ul class="project__summary">
              <p>Fun build with my wife</p>
            </ul>
          </div>
          <div class="project__line "></div>
        </div>
        <div class="project__wrapper">
          <div class="project__desc">
            <a
              href="https://3d-sticky-cards-peel-off.akintomide-alonge.workers.dev"
              target="_blank"
              @mouseenter="increaseCursor"
              @mouseleave="decreaseCursor"
              class="project__title"
              >Image peel off</a
            >
            <ul class="project__summary">
              <p>Items peel off on scroll</p>
            </ul>
          </div>
          <div class="project__line "></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import animateOut from "~/mixin.js/animate-out";
import mouseHover from "~/mixin.js/mouse-hover";

export default {
  mixins: [mouseHover, animateOut],

  data() {
    return {
      lines: null,
      timeline: this.$gsap.timeline({ paused: true })
    };
  },

  mounted() {
    this.animateLines();
    this.timeline
      .to(".project__line", {
        width: "100%",
        ease: "Power2.easeout",
        stagger: 0.15
      })
      .to(".project__title", {
        opacity: 1,
        y: "0",
        stagger: 0.15
      })
      .to(
        ".project__summary li",
        {
          opacity: 1,
          y: "0",
          stagger: 0.15
        },
        "<"
      );
  },

  methods: {
    afterEnter() {
      this.timeline.play();
    },

    async leave() {
      await this.timeline.timeScale(2).reverse();
      this.$emit("updateActiveComponent");
    },

    animateLines() {
      this.lines = document.querySelectorAll(".project__line");
      this.lines.forEach((line, index) => {
        const num = index + 1;
        if (num % 2 === 0) {
          line.classList.add("even");
        }
      });
    }
  }
};
</script>

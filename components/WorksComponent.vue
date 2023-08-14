<template>
  <transition appear @after-enter="afterEnter" @leave="leave">
    <div class="projects">
      <div class="projects__container">
        <div class="project__wrapper">
          <div class="project__line "></div>
          <div class="project__desc">
            <a
              href="https://pineapple.design"
              target="_blank"
              @mouseenter="increaseCursor"
              @mouseleave="decreaseCursor"
              class="project__title"
              >Pineapple</a
            >
            <ul class="project__summary">
              <li>UI Development</li>
              <li>Frontend Functionalities</li>
            </ul>
          </div>
        </div>
        <div class="project__wrapper">
          <div class="project__line "></div>
          <div class="project__desc">
            <a
              href="#"
              @mouseenter="false && increaseCursor"
              @mouseleave="false && decreaseCursor"
              class="project__title"
              >Qwiik</a
            >
            <ul class="project__summary">
              <li>UI Development</li>
              <li>Frontend Functionalities</li>
            </ul>
          </div>
        </div>
        <div class="project__wrapper">
          <div class="project__line "></div>
          <div class="project__desc">
            <a
              href="https://moovies.tomidealonge.com"
              target="_blank"
              @mouseenter="increaseCursor"
              @mouseleave="decreaseCursor"
              class="project__title"
              >Moovies Hub</a
            >
            <ul class="project__summary">
              <li>UI Development</li>
              <li>Frontend Functionalities</li>
            </ul>
          </div>
        </div>
        <div class="project__wrapper">
          <div class="project__line "></div>
          <div class="project__desc">
            <a
              href="https://redtown.xyz"
              target="_blank"
              @mouseenter="increaseCursor"
              @mouseleave="decreaseCursor"
              class="project__title"
              >RT Website</a
            >
            <ul class="project__summary">
              <li>UI Development</li>
              <li>Frontend Functionalities</li>
              <li>Strapi CMS</li>
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

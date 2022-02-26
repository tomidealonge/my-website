<template>
  <transition appear @after-enter="afterEnter" @before-leave="leave">
    <div class="header">
      <div
        @mouseenter="increaseCursor"
        @mouseleave="decreaseCursor"
        class="hero"
      >
        <div class="text-wrapper">
          <div class="hero__first-line">
            <span>F</span>
            <span>R</span>
            <span>O</span>
            <span>N</span>
            <span>T</span>
            <span>E</span>
            <span>N</span>
            <span>D</span>
          </div>
          <div class="hero__first-line hero__first-line--overlay">
            <span>F</span>
            <span>R</span>
            <span>O</span>
            <span>N</span>
            <span>T</span>
            <span>E</span>
            <span>N</span>
            <span>D</span>
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
      <p ref="splitText" class="sub-hero">
        Over the past 3 years, as an art director and designer, I’ve worked with
        big companies and up-and-coming startups to successfully help them reach
        their full potential.
      </p>
    </div>
  </transition>
</template>

<script>
import mouseHover from "~/mixin.js/mouse-hover";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

export default {
  mixins: [mouseHover],

  data() {
    return {
      lines: [],
      splitting: Splitting,
      timeline: this.$gsap.timeline({ paused: true })
    };
  },

  mounted() {
    this.timeline
      .fromTo(
        ".hero__first-line span",
        {
          opacity: 0,
          x: "-100px"
        },
        {
          duration: 0.4,
          opacity: 1,
          x: 0,
          stagger: 0.07445,
          ease: "Power1.easeout"
        }
      )
      .to(
        ".hero__first-line",
        {
          clipPath: "polygon(100% 100%, 100% 0, 0 0, 0 100%)",
          duration: 1.2,
          ease: "Power2.easeout"
        },
        "+1.5"
      )
      .to(
        ".hero__first-line--overlay",
        {
          clipPath: "polygon(100% 100%, 100% 100%, 0 100%, 0 100%)",
          duration: 1.2,
          ease: "Power2.easeout"
        },
        "<"
      )
      .to(
        ".hero__last-line",
        {
          clipPath: "polygon(100% 100%, 100% 0, 0 0, 0 100%)",
          opacity: 1,
          duration: 1.2,
          ease: "Power2.easeout"
        },
        "-=0.7"
      )
      .from(
        ".sub-hero",
        {
          opacity: 0
        },
        "-=2"
      )
      .add(this.textAnimation, "-=2");
  },

  methods: {
    textAnimation() {
      const target = document.querySelector(".sub-hero");
      const result = this.splitting({
        target,
        by: "lines"
      });

      result[0].lines.forEach((line, lineIndex) => {
        line.forEach((word, wordIndex) => {
          this.$gsap.from(word, {
            opacity: 0,
            y: 15,
            rotate: 6,
            delay: lineIndex * 0.2 + wordIndex * 0.02 + 0.5
          });
        });
      });
    },

    afterEnter() {
      this.timeline.play();
    },

    leave() {
      this.timeline.reverse();
    }
  }
};
</script>

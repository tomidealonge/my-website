<template>
  <transition
    appear
    @after-enter="afterEnter"
    @leave="leave"
    :css="false"
    :duration="{ enter: 500, leave: 2000 }"
  >
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
      <p class="sub-hero">
        Hi 👋🏻 I'm Tomide a frontend engineer based in Lagos Nigeria focused on
        creating functional products and unique experiences on the web.
      </p>
    </div>
  </transition>
</template>

<script>
import mouseHover from "~/mixin.js/mouse-hover";
import splitText from "~/mixin.js/splitting";
import animateOut from "~/mixin.js/animate-out";

export default {
  mixins: [mouseHover, splitText, animateOut],

  data() {
    return {
      lines: [],
      selector: "sub-hero",
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
      .call(this.textAnimation, [this.selector], "-=1");
  },

  methods: {
    afterEnter() {
      this.timeline.play();
    },

    async leave() {
      await this.timeline.timeScale(2).reverse();
      this.$emit("updateActiveComponent");
    }
  }
};
</script>

<template>
  <transition appear @after-enter="afterEnter" @before-leave="leave">
    <div class="about">
      <div class="about__text-block">
        <p class="about__main-text">
          Over the past 3 years, as an art director and designer, I’ve worked
          with big companies and up-and-coming startups.
        </p>
        <div class="about__white-bg-text-block">
          <p>
            Over the past 3 years, as an art director and designer, I’ve worked
            with big companies and up-and-coming startups to successfully help
            them reach their full potential and attract new customers. Over the
            past 3 years, as an art director and designer, I’ve worked with big
            companies and up-and-coming startups to successfully help them reach
            their full potential and attract new customers.
          </p>
        </div>
      </div>
      <div class="about__picture">
        <img
          src="@/assets/images/me.png"
          alt="A picture of me, a very good one 🥰"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import mouseHover from "~/mixin.js/mouse-hover";
import splitText from "~/mixin.js/splitting";

export default {
  mixins: [mouseHover, splitText],

  data() {
    return {
      selector: "about__white-bg-text-block p",
      mainTextSelector: "about__main-text",
      timeline: this.$gsap.timeline({ paused: true })
    };
  },

  mounted() {
    this.timeline
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
      .call(this.textAnimation, [this.mainTextSelector], "<")
      .to(
        `.about__white-bg-text-block p`,
        {
          opacity: 1
        },
        "-=1"
      )
      .call(this.textAnimation, [this.selector], "<");
  },

  methods: {
    afterEnter() {
      this.timeline.play();
    },

    leave() {
      // this.timeline.reverse();
    }
  }
};
</script>

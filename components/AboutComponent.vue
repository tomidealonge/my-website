<template>
  <transition appear @after-enter="afterEnter" @before-leave="leave">
    <div class="about">
      <div class="about__text-block">
        <p class="about__main-text">
          Over the past 5 years as a software engineer, I’ve worked on a wide
          range of projects.
        </p>
        <div class="about__white-bg-text-block">
          <p>
            I specialize in creating functional products, and immersive
            experiences for diverse set of users on the web. Currently, I lead
            the engineering team at
            <a href="https://check-dc.com" class="inline-link" target="_blank"
              >Check DC,
            </a>
            where I channel the teams energy and expertise into creating
            functional products and immersive web experiences.
            <br />
            <strong> Honorable mention: </strong>
            <a
              class="inline-link"
              target="_blank"
              href="https://nigerianmockups.com"
              >Nigerian Mockups
            </a>
            a photo-realistic mockup repository.
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
import animateOut from "~/mixin.js/animate-out";

export default {
  mixins: [mouseHover, splitText, animateOut],

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

    async leave() {
      await this.timeline.timeScale(2).reverse();
      this.$emit("updateActiveComponent");
    }
  }
};
</script>

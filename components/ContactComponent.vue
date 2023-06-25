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
            Wanna start something?
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
                href="mailto:Enquiries From Website?subject=akintomide.alonge%40gmail.com"
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
              href="https://twitter.com/_eljosh"
              >Josh</a
            ></span
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import animateOut from "~/mixin.js/animate-out";
import mouseHover from "~/mixin.js/mouse-hover";
import splitText from "~/mixin.js/splitting";

export default {
  mixins: [mouseHover, splitText, animateOut],

  data() {
    return {
      selector: "contact__sub-title",
      mainTextSelector: "about__main-text",
      timeline: this.$gsap.timeline({ paused: true })
    };
  },

  mounted() {
    this.animateLines();
    this.timeline
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
    // .call(this.textAnimation, [this.selector], "-=1");
  },

  methods: {
    afterEnter() {
      this.timeline.play();
    },

    animateLines() {
      this.lines = document.querySelectorAll(".contact__line");
      this.lines.forEach((line, index) => {
        const num = index + 1;
        if (num % 2 === 0) {
          line.classList.add("even");
        }
      });
    },

    async leave() {
      await this.timeline.timeScale(2).reverse();
      this.$emit("updateActiveComponent");
    }
  }
};
</script>

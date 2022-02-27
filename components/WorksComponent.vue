<template>
  <div class="projects">
    <div class="projects__container">
      <div class="project">
        <div class="project__line "></div>
        <div class="project__desc">
          <a
            href="https://kelloggsnigeria.ng/"
            target="_blank"
            @mouseenter="increaseCursor"
            @mouseleave="decreaseCursor"
            class="project__title"
            >Kelloggs</a
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
            href="https://www.qwiik.co/"
            target="_blank"
            @mouseenter="increaseCursor"
            @mouseleave="decreaseCursor"
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
            href="https://moovies-hub.netlify.app/"
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
        <div class="project__line "></div>
      </div>
      <div class="project__wrapper project__wrapper--in-coming">
        <div class="project__desc">
          <a
            href="#"
            target="_blank"
            @mouseenter="increaseCursor"
            @mouseleave="decreaseCursor"
            class="project__title"
            >Pineapple</a
          >
          <ul class="project__summary">
            <li>UI Development</li>
            <li>Frontend Functionalities</li>
            <li class="coming-soon">**Coming soon</li>
          </ul>
        </div>
        <div class="project__line "></div>
      </div>
    </div>
  </div>
</template>

<script>
import mouseHover from "~/mixin.js/mouse-hover";
export default {
  mixins: [mouseHover],

  data() {
    return {
      lines: null
    };
  },

  mounted() {
    this.$gsap
      .timeline()
      .add(this.animateLines)
      .add(this.animateTitle, "+=1")
      .add(this.animateDescription, "<");
  },

  methods: {
    animateLines() {
      this.lines = document.querySelectorAll(".project__line");
      this.lines.forEach((line, index) => {
        const num = index + 1;
        if (num % 2 === 0) {
          line.classList.add("even");
        }
        this.$gsap.to(line, {
          width: "100%",
          ease: "Power2.easeout",
          duration: 1
        });
      });
    },

    animateTitle() {
      this.$gsap.to(".project__title", {
        opacity: 1,
        y: "0",
        stagger: 0.5
      });
    },

    animateDescription() {
      this.$gsap.to(".project__summary li", {
        opacity: 1,
        y: "0",
        stagger: 0.25
      });
    }
  }
};
</script>

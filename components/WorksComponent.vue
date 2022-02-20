<template>
  <div class="projects">
    <div class="projects__container">
      <div class="project">
        <div class="project__line"></div>
        <div class="project__desc">
          <a href="https://kelloggsnigeria.ng/" target="_blank" @mouseenter="increaseCursor" @mouseleave="decreaseCursor" class="project__title">Kelloggs</a>
          <ul class="project__summary">
            <li>UI Development</li>
            <li>Frontend Functionalities</li>
          </ul>
        </div>
      </div>
      <div class="project__wrapper">
        <div class="project__line"></div>
        <div class="project__desc">
          <a href="https://www.qwiik.co/" target="_blank" @mouseenter="increaseCursor" @mouseleave="decreaseCursor" class="project__title">Qwiik</a>
          <ul class="project__summary">
            <li>UI Development</li>
            <li>Frontend Functionalities</li>
          </ul>
        </div>
      </div>
      <div class="project__wrapper">
        <div class="project__line"></div>
        <div class="project__desc">
          <a href="https://moovies-hub.netlify.app/" target="_blank" @mouseenter="increaseCursor" @mouseleave="decreaseCursor" class="project__title">Moovies Hub</a>
          <ul class="project__summary">
            <li>UI Development</li>
            <li>Frontend Functionalities</li>
          </ul>
        </div>
        <div class="project__line"></div>
      </div>
      <div v-if="false" class="project__wrapper">
        <div class="project__line"></div>
        <div class="project__desc">
          <a href="https://moovies-hub.netlify.app/" target="_blank" @mouseenter="increaseCursor" @mouseleave="decreaseCursor" class="project__title">Moovies Hub</a>
          <ul class="project__summary">
            <li>UI Development</li>
            <li>Frontend Functionalities</li>
          </ul>
        </div>
        <div class="project__line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import mouseHover from '~/mixin.js/mouse-hover'
export default {
  mixins: [mouseHover],
};
</script>

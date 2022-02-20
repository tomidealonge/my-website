<template>
  <div class="contact">
    <div @mouseenter="increaseCursor" @mouseleave="decreaseCursor" class="contact__title">Contact Me</div>
    <div class="contact__line"></div>
    <div class="contact__details">
      <div class="contact__block">
        <div class="contact__sub-title">Connect</div>
        <ul class="contact__link">
          <li @mouseenter="increaseCursor" @mouseleave="decreaseCursor">
            <a target="_blank" href="https://github.com/tomidealonge">Github</a>
          </li>
          <li @mouseenter="increaseCursor" @mouseleave="decreaseCursor">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/akintomidealonge"
              >Linkedin</a
            >
          </li>
          <li @mouseenter="increaseCursor" @mouseleave="decreaseCursor">
            <a target="_blank" href="https://twitter.com/tomidealonge"
              >Twitter</a
            >
          </li>
        </ul>
      </div>
      <div class="contact__block">
        <div class="contact__sub-title">Location</div>
        <ul class="contact__link">
          <li>Lagos, Nigeria</li>
        </ul>
      </div>
      <div class="contact__block">
        <div class="contact__sub-title">Say Hi / Collaborate</div>
        <ul class="contact__link">
          <li @mouseenter="increaseCursor" @mouseleave="decreaseCursor">
            <a
              target="_blank"
              href="mailto:Enquiries From Website?subject=akintomide.alonge%40gmail.com"
              >Email</a
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
          ><a @mouseenter="increaseCursor" @mouseleave="decreaseCursor" target="_blank" href="https://twitter.com/_eljosh">Josh</a></span
        >
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

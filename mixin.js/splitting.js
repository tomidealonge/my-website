import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

export default {
  data() {
    return {
      selector: '',
      splitting: Splitting,
    }
  },

  methods: {
    textAnimation(selector) {
      const target = document.querySelector(`.${selector}`);
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
  },
};
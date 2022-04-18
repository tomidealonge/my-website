import Vue from 'vue'
import "splitting/dist/splitting.css";
import Splitting from "splitting";
import * as utils from '@/commons/utils'
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue'

Vue.use(Splitting)
Vue.use(LottieAnimation)

for (const k in utils) {
  if (Object.hasOwnProperty.call(utils, k)) {
    const v = utils[k]
    Vue.prototype['$' + k] = v
  }
}
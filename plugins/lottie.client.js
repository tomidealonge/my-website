import { LottieAnimation } from "lottie-web-vue";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component("LottieAnimation", LottieAnimation);
});

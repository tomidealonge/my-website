import gsap from "gsap";

// Provides `$gsap` (via useNuxtApp) to replace the old nuxt-gsap-module,
// which is not compatible with Nuxt 3.
export default defineNuxtPlugin(() => {
  return {
    provide: {
      gsap
    }
  };
});

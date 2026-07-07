import { watch } from "vue";

/**
 * Reproduces the old `animate-out` mixin: when the `animatingOut` source
 * becomes truthy, run the component's own `leave` routine.
 *
 * @param {import('vue').Ref<boolean> | (() => boolean)} animatingOut reactive source
 * @param {() => (void | Promise<void>)} leave the component's leave animation
 */
export function useAnimateOut(animatingOut, leave) {
  watch(animatingOut, async newVal => {
    if (newVal) {
      await leave();
    }
  });
}

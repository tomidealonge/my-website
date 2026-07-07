<template>
  <div
    class="z-[10] fixed bottom-[20px] right-[20px] cursor-pointer border-amber-50"
  >
    <motion.div
      v-if="compState === 'idle'"
      layoutId="wrapper"
      class="rounded-[30px] bg-black text-white px-[30px] py-[8px] flex items-center gap-6 pl-[8px]"
      @click="changeCompState"
    >
      <span class="shrink-0">
        <motion.svg
          :animate="{ scale: 1.05 }"
          :initial="{
            scale: 0.9,
          }"
          :transition="{ repeat: Infinity, repeatType: 'reverse', duration: 2 }"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="currentColor"
        >
          <g
            style="
              translate: none;
              rotate: none;
              scale: none;
              transform-origin: 0px 0px;
            "
            data-svg-origin="20 20"
            transform="matrix(1,0,0,1,0,0)"
          >
            <circle cx="20" cy="14.893996" r="1.75" style="opacity: 1"></circle>
            <circle cx="25.106004" cy="20" r="1.75" style="opacity: 1"></circle>
            <circle cx="20" cy="25.106004" r="1.75" style="opacity: 1"></circle>
            <circle cx="14.893996" cy="20" r="1.75" style="opacity: 1"></circle>
          </g>
          <g
            style="
              translate: none;
              rotate: none;
              scale: none;
              transform-origin: 0px 0px;
            "
            data-svg-origin="20.000008791672197 19.99996417802896"
            transform="matrix(1,0,0,1,-0.00001,0.00003)"
          >
            <circle cx="20" cy="7.745591" r="1.75" style="opacity: 1"></circle>
            <circle
              cx="27.202961"
              cy="10.085975"
              r="1.75"
              style="opacity: 1"
            ></circle>
            <circle
              cx="31.654635"
              cy="16.213179"
              r="1.75"
              style="opacity: 1"
            ></circle>
            <circle
              cx="31.654635"
              cy="23.786821"
              r="1.75"
              style="opacity: 1"
            ></circle>
            <circle
              cx="27.202961"
              cy="29.914025"
              r="1.75"
              style="opacity: 1"
            ></circle>
            <circle cx="20" cy="32.254409" r="1.75" style="opacity: 1"></circle>
            <circle
              cx="12.797039"
              cy="29.914025"
              r="1.75"
              style="opacity: 1"
            ></circle>
            <circle
              cx="8.345365"
              cy="23.786821"
              r="1.75"
              style="opacity: 1"
            ></circle>
            <circle
              cx="8.345365"
              cy="16.213179"
              r="1.75"
              style="opacity: 1"
            ></circle>
            <circle
              cx="12.797039"
              cy="10.085975"
              r="1.75"
              style="opacity: 1"
            ></circle>
          </g>
        </motion.svg>
      </span>
      Lets work together
    </motion.div>
    <motion.div
      v-if="compState === 'active'"
      layoutId="wrapper"
      class="max-w-[378px] pt-[132px] bg-black border-be-mist-700 rounded-[20px] h-[450px] w-[340px]"
    >
      <div
        class="w-[36px] aspect-square rounded-full flex items-center justify-center absolute top-4 right-4"
        @click="changeCompState"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 256 256"
        >
          <path d="M0 0h256v256H0z" fill="none" />
          <path
            fill="white"
            d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
          />
        </svg>
      </div>
      <div class="text-white">
        Hey there, you look like someone with great taste
      </div>
    </motion.div>
  </div>
</template>

<script setup>
import { motion } from "motion-v";

const compState = ref("idle");

const changeCompState = () => {
  if (compState.value === "idle") {
    compState.value = "active";
  } else {
    compState.value = "idle";
  }
};
</script>

<style lang="scss" scoped></style>

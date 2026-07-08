<template>
  <div v-if="false">
    <link
      rel="preload"
      as="style"
      href="../assets/fonts/inter/Inter-Regular.woff2"
      crossorigin="anonymous"
      onload="this.rel='stylesheet'"
    />
    <link
      rel="preload"
      as="style"
      href="../assets/fonts/monument/monumentextended-regular.woff2"
      crossorigin="anonymous"
      onload="this.rel='stylesheet'"
    />
    <slot />
  </div>
</template>

<style lang="scss" scoped></style>

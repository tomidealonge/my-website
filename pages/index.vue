<template>
<div class="home">
  <NavComponent/>
  <HeaderComponent/>
  <AboutComponent/>
  <WorksComponent/>
  <ContactComponent/>
  <div ref="cursor" class="cursor"></div>
</div>
</template>

<script>
export default {
  mounted () {

    document.addEventListener('mousemove', (e) => {
      this.$refs.cursor.style.left = `${e.pageX}px`
      this.$refs.cursor.style.top = `${e.pageY}px`
    })
  },
}
</script>

<template>
  <div class="pdf-container">
    <pdf-views url="/static/demo.pdf" scale rotate magnifyingGlass />
  </div>
</template>

<script setup lang="ts">
import pdfViews from '@toystory/potato'
import '@toystory/potato/dist/style.css'
</script>

<style lang="scss" scoped>
.pdf-container {
  text-align: center;
}
</style>

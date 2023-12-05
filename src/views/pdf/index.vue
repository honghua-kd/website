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
  .pages-wrap {
    display: inline-block;
    max-width: 100%;
    height: calc(100vh - 292px);
    canvas {
      margin-bottom: 20px;
      box-shadow: 0 0 10px rgb(0 0 0 / 30%);
    }
  }
  :deep(.scroll-bar) {
    padding: 20px;
  }
  .current-page {
    width: 40px;
    :deep(input) {
      text-align: center;
    }
  }
  .current-scale {
    margin: 0 12px;
    width: 60px;
    :deep(input) {
      text-align: center;
    }
  }
  .page-num {
    display: inline-block;
    padding: 0 10px;
  }
  .wrapper-todo {
    padding: 10px 0;
  }
  .page-scale {
    display: inline-block;
    padding: 0 10px;
  }
}
</style>

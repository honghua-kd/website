<template>
  <div class="card-header">
    <div class="clearfix">
      <span class="word">{{ title }}</span>
      <slot name="more" />
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  width: 100%;
  .clearfix {
    display: flex;
    width: 100%;
    font-size: 16px;
    font-family: PingFangSC-Semibold, 'PingFang SC';
    font-weight: 600;
    color: #333333;
    line-height: 32px;
    &::before {
      display: block;
      clear: both;
      margin-top: 8px;
      width: 4px;
      height: 16px;
      border-radius: 3px;
      background: $base-color-primary;
      content: ' ';
    }
    .word {
      padding-left: 12px;
    }
  }
}
</style>

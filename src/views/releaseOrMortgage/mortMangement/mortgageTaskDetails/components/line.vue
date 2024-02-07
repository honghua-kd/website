<template>
  <div
    :class="`card-title ${props.botBorder ? 'bot-bottom' : ''} ${
      props.hasBgc ? 'has-bgc' : ''
    }`"
  >
    <div class="flag"></div>
    <div class="text">{{ props.name }}</div>
    <div class="btns">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String,
  tagInfo: String,
  tagType: String,
  tagEffect: String,
  popString: String,
  botBorder: {
    type: Boolean,
    default: true
  },
  hasBgc: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.card-title {
  display: flex;
  align-items: center;
  margin: 20px 0 10px;
  height: 30px;
  font-size: 14px;
  .text {
    font-weight: 500;
  }
}
.bot-bottom {
  border-bottom: 1px solid #eeeeee;
}
.has-bgc {
  color: $base-color-primary;
  background-color: #f8f8f8;
}
.flag {
  display: inline-block;
  margin-right: 5px;
  width: 4px;
  height: 14px;
  background-color: $base-color-primary;
}
.tag {
  margin-left: 5px;
}
.btns {
  margin-left: 10px;
}
</style>

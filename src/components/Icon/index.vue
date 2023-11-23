<template>
  <span class="icon-comp">
    <i
      v-if="name.indexOf('el-icon') !== -1"
      :class="name"
      :style="{ color, 'font-size': size + 'px' }"
    ></i>
    <component
      v-if="type === 'icon-park'"
      :theme="theme"
      :size="size"
      :strokeWidth="strokeWidth"
      :is="name"
      :fill="color"
      class="icon"
    />
    <el-icon
      v-if="type === 'el-icon'"
      :style="{ color, 'font-size': size + 'px' }"
    >
      <component :is="name" />
    </el-icon>
  </span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type: string
    size: number | string
    color: string
    theme: string
    strokeWidth: number
    name: string
    className: string
  }>(),
  {
    type: 'icon-park',
    size: 14,
    color: '#333',
    theme: 'outline',
    strokeWidth: 3,
    name: '',
    className: 'icon'
  }
)
</script>
<style lang="scss" scoped></style>

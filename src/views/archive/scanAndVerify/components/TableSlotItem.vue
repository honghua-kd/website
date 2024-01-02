<template>
  <div>
    <template v-if="rowInfo.fileCode">
      <span
        :class="
          compareHandler(rowKey, rowInfo.compareResult)
            ? 'font-color-error'
            : ''
        "
      >
        {{ rowInfo[rowKey] }}
      </span>
    </template>
    <template v-else>
      <span class="font-color-system">
        {{ rowInfo[rowKey] }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps({
  rowInfo: {
    type: Object,
    default: () => {}
  },
  rowKey: {
    type: String,
    default: ''
  }
})

// 比较结果处理
const compareHandler = (prop: string, compArray: string[]): boolean => {
  return compArray.includes(prop)
}
</script>

<style lang="scss" scoped>
.font-color-error {
  color: $base-color-red;
}
.font-color-system {
  color: $base-color-primary;
}
</style>

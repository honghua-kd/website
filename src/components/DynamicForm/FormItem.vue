<template>
  <el-form-item v-bind="props">
    <component v-model="value" :is="props.type" />
  </el-form-item>
</template>

<script lang="ts">
export default {
  name: 'DynamicFormItem'
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import type { DynamicFormItemProps } from './type'

const props = withDefaults(defineProps<DynamicFormItemProps>(), {})

const value = ref('')
</script>

<style lang="scss" scoped>
// .dynamic-form {
// }
</style>

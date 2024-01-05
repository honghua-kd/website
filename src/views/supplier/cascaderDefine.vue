<template>
  <!-- <el-cascader /> -->
  33
</template>

<script setup lang="ts">
// import { ref, onMounted } from 'vue'
// import { CommonAPI } from '@/api'
// import type { CascaderProps } from 'element-plus'
// const API = new CommonAPI()
// const props: CascaderProps = {
// lazy: true,
// async lazyLoad(node, resolve) {
// const nodes: CascaderOption[] = [] // 动态节点
// const { level } = node
// if (level === 0) {
//   const resParent = await API.getAllProvinces()
//   if (resParent && resParent?.data) {
//     resParent?.data.map((item) => {
//       const area = {
//         value: item.code,
//         label: item.name,
//         leaf: level >= 1
//       }
//       nodes.push(area)
//     })
//   }
// } else {
//   const params = {
//     code: node.value as number
//   }
//   const res = await API.getProvincesChildren(params)
//   if (res && res.data) {
//     res?.data.map((item) => {
//       const area = {
//         value: item.code,
//         label: item.name,
//         leaf: level >= 1
//       }
//       nodes.push(area)
//     })
//   }
// }
// resolve(nodes) // 回调
// }
// }

onMounted(async () => {})
</script>

<style scoped></style>

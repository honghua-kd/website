<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="下载" name="down">
        <downloadRecord />
      </el-tab-pane>
      <el-tab-pane label="上传" name="upload">
        <uploadRecord />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import downloadRecord from '@/views/downloadCenter/downloadRecord/index.vue'
import uploadRecord from '@/views/recordUpload/uploadRecord/index.vue'
import { ref } from 'vue'
// import type { TabsPaneContext } from 'element-plus'
const activeName = ref<string>('down')
// const changeTab = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event)
// }
</script>

<style scoped></style>

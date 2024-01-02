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
import { ref, onMounted } from 'vue'
import { useRoute } from '@toystory/lotso'
const route = useRoute()
// import type { TabsPaneContext } from 'element-plus'
const activeName = ref<string>('down')
// const changeTab = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event)
// }
onMounted(() => {
  if (route?.value.query.tab) {
    activeName.value = 'upload'
  }
})
</script>

<style scoped></style>

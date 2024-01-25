<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="60%"
    >
      <div class="routes-list" v-loading="loading" v-if="routes.traces">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in routes.traces"
            :key="index"
            :timestamp="
              activity.acceptTime + '&nbsp  ' + activity.acceptStation
            "
          >
            {{ activity.actionDesc }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ExpressAPI } from '@/api'
import { ElMessage } from 'element-plus'
import type { TraceList } from '@/api'
const API = new ExpressAPI()
const dialogTitle = ref<string>('物流信息')
const dialogVisible = ref<boolean>(false)
const loading = ref<boolean>(false)
const routes = reactive<TraceList>({
  orderCode: null,
  shipperCode: '',
  logisticCode: '',
  callback: null,
  success: true,
  reason: null,
  state: '签收',
  stateEx: '正常签收',
  location: '上海市',
  station: null,
  stationTel: null,
  stationAdd: null,
  deliveryMan: null,
  deliveryManTel: null,
  nextCity: null,
  traces: [],
  ebusinessID: ''
})

const getLogisticsInfo = (id: string) => {
  loading.value = true
  const params = {
    expressNo: id
    // expressNo: '78746538393827'
  }
  API.getLogisticsInfo(params)
    .then((res) => {
      if (
        res &&
        res.code === 200 &&
        res?.data?.traces &&
        res?.data?.traces.length
      ) {
        dialogVisible.value = true
        loading.value = false
        routes.traces = res?.data?.traces.reverse()
      } else {
        dialogVisible.value = false
        ElMessage({
          type: 'success',
          message: '暂无数据'
        })
      }
    })
    .catch((err: Error) => {
      throw err
    })
}

/** 打开弹窗 */
const open = async (id: string) => {
  await getLogisticsInfo(id)
}
defineExpose({ open })
</script>

<style lang="scss" scoped>
.routes-list {
  overflow-y: auto;
  padding-top: 10px;
  height: 45vh;
  :deep(.el-timeline-item__timestamp) {
    line-height: 18px;
  }
}
</style>

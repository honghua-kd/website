<template>
  <el-dialog
    width="30%"
    title="合同状态"
    v-model="overdueVis"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="contarct">
      <el-checkbox-group v-model="overdueListChren">
        <el-checkbox
          v-for="(item, index) in smContractStatus"
          :key="index"
          :label="item.dictValue"
        >
          {{ item.dictLabel }}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <template #footer class="dialog-footer">
      <el-button type="primary" @click="addOverdue">确 定</el-button>
      <el-button @click="cancelOverdus">取 消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue'
const emit = defineEmits(['success'])

type fromType = {
  overdueVis: boolean
  overdueListChren: string[]
}
const state = reactive<fromType>({
  overdueVis: false,
  overdueListChren: []
})
const { overdueVis, overdueListChren } = toRefs(state)
const smContractStatus = ref([
  { dictLabel: 'dictLabel', dictValue: 'dictValue' },
  { dictLabel: 'dictLabe2', dictValue: 'dictValue2' },
  { dictLabel: 'dictLabe3', dictValue: 'dictValue3' },
  { dictLabel: 'dictLabe4', dictValue: 'dictValue4' },
  { dictLabel: 'dictLabe5', dictValue: 'dictValue5' }
])
const addOverdue = () => {
  state.overdueVis = false
  emit('success', state.overdueListChren)
}
const cancelOverdus = () => {
  state.overdueVis = false
}
const open = (parm: string[]) => {
  state.overdueListChren = parm
  state.overdueVis = true
}
defineExpose({ open })
</script>

<style scoped>
.contarct {
  .el-checkbox {
    width: 40%;
  }
}
</style>

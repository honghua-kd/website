<template>
  <el-dialog
    width="30%"
    title="逾期天数"
    v-model="overdueVis"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      ref="formRef"
      :model="formP"
      label-position="left"
      label-width="120px"
      :rules="formDiaRules"
    >
      <el-row>
        <el-col :span="18">
          <el-form-item label="输入逾期天数" prop="overdueValue">
            <el-input v-model="formP.overdueValue" />
          </el-form-item>
        </el-col>
        <el-col :span="3" :offset="2">
          <el-button type="primary" @click="addTag()">+</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="margin-top: 15px">
      <el-tag
        v-for="item in overdueListChren"
        :key="item"
        closable
        style="margin-right: 10px; margin-bottom: 8px"
        @close="deleteOverdue(item)"
      >
        {{ item }}
      </el-tag>
    </el-row>
    <template #footer class="dialog-footer">
      <el-button type="primary" @click="addOverdue">确 定</el-button>
      <el-button @click="cancelOverdus">取 消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue'
import { ElMessage, ElForm } from 'element-plus'
const emit = defineEmits(['success'])

type fromType = {
  formP: {
    overdueValue: string
  }
  overdueVis: boolean
  overdueListChren: string[]
}
const formRef = ref<InstanceType<typeof ElForm>>()
const state = reactive<fromType>({
  formP: {
    overdueValue: ''
  },
  overdueVis: false,
  overdueListChren: []
})
const { overdueVis, formP, overdueListChren } = toRefs(state)

const formDiaRules = reactive({
  overdueValue: [
    { required: true, message: '逾期天数不能为空', trigger: 'blur' }
  ]
})
const addTag = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  if (state.overdueListChren.indexOf(state.formP.overdueValue) >= 0) {
    ElMessage.error('该逾期天数已存在')
  } else {
    state.overdueListChren.push(state.formP.overdueValue)
    state.formP.overdueValue = ''
  }
}
const deleteOverdue = (tag) => {
  state.overdueListChren.splice(state.overdueListChren.indexOf(tag), 1)
}
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

<style scoped></style>

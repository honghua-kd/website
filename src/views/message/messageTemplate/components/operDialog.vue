<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
    >
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        label-width="120px"
        :rules="formRules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="模板类型" prop="market">
              <el-select
                v-model="formParams.market"
                clearable
                placeholder="请选择"
                width="100%"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板名称" prop="market">
              <el-input
                v-model="formParams.chepai"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="业务类型" prop="market">
              <el-select
                v-model="formParams.market"
                clearable
                placeholder="请选择"
                width="100%"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="来源系统" prop="market">
              <!-- <el-tree
                ref="source"
                :data="systemOptions"
                v-bind="{ ...treeConfig }"
                :default-checked-keys="defaultCheckedkeys"
                @check="handleNodeClick"
              /> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="模板内容" prop="market">
              <el-input
                v-model="formParams.chepai"
                :rows="5"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="模板内容" prop="market">
              <div class="divfont-red">
                (注:在模板内容中,可在{}符号中插入左侧参数对应的配置模板参数名,添加后系统将会自动映射)
              </div>
              <!-- <el-table border size="mini">
                <el-table-column
                  label="一级来源"
                  prop="sourceSystem1"
                  width="120"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  label="二级来源"
                  prop="sourceSystem2"
                  width="120"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  label="业务类型"
                  prop="bizType"
                  width="120"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  label="名称"
                  prop="paramName"
                  width="120"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="模板变量名"
                  prop="paramCode"
                  width="120"
                  show-overflow-tooltip
                />
              </el-table> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :disabled="formLoading" type="primary" @click="submitForm">
          确 定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import { ElForm } from 'element-plus'
const dialogTitle: Ref<string> = ref('新增')
const dialogVisible: Ref<boolean> = ref(false)
const formLoading: Ref<boolean> = ref(false)
const currentType: Ref<string> = ref('')
const statusOpts = reactive([
  {
    dictLabel: '城',
    dictValue: 1
  },
  {
    dictLabel: '市',
    dictValue: 0
  }
])
interface paramsForm {
  city: string
  market: string
  chepai: string
}
const formParams = reactive<paramsForm>({
  city: '',
  market: '',
  chepai: ''
})
const formRules = reactive({
  city: [{ required: true, message: '城市不能为空', trigger: 'change' }]
})
const formRef = ref<InstanceType<typeof ElForm>>()

// const treeConfig = {
//   'empty-text': '暂无数据',
//   'default-expand-all': true,
//   'show-checkbox': true,
//   'default-expanded-keys': [],
//   // 'default-checked-keys': [], // 默认勾选的节点的 key 的数组
//   nodeKey: 'id',
//   indent: 15,
//   props: {
//     children: 'children',
//     label: 'name',
//     value: 'code'
//   }
// }
// const defaultCheckedkeys = ref<object>([])
// const handleNodeClick = () => {}

const submitForm = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  console.log('object')
}
interface TableItem {
  id: number
  downloadPerson: string
  downloadTime: string
  status: string
  isDiYa: boolean
  isJieYa: boolean
}
const open = (type: string, row: TableItem) => {
  dialogVisible.value = true
  currentType.value = type
  dialogTitle.value = type === 'add' ? '新增' : '编辑'
  if (type === 'edit') {
    console.log('object', row)
    // formParams.id = row?.id
    // formParams.name = row?.name
    // formParams.type = row?.type
    // formParams.status = row?.status || 0
    // formParams.remark = row?.remark
  }
}
defineExpose({ open })
</script>

<style lang="scss" scoped>
.divfont-red {
  color: red;
}
:deep(.el-select) {
  width: 100%;
}
:deep(.el-dialog__header) {
  text-align: initial;
}
</style>

<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
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
            <el-form-item label="模板类型" prop="templateType">
              <el-select
                v-model="formParams.templateType"
                clearable
                placeholder="请选择"
                width="100%"
              >
                <el-option
                  v-for="item in smsTemplteType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板名称" prop="templateName">
              <el-input
                v-model="formParams.templateName"
                placeholder="请输入"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人类型" prop="contactorType">
              <el-select
                v-model="formParams.contactorType"
                clearable
                placeholder="请选择"
                width="100%"
              >
                <el-option
                  v-for="item in smsContactorType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业务类型" prop="bizType">
              <el-select
                v-model="formParams.bizType"
                clearable
                multiple
                placeholder="请选择"
                width="100%"
              >
                <el-option
                  v-for="item in smsBizType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="来源系统" prop="sourceSystemWeb">
              <el-tree
                ref="treeRef"
                :data="sourceSystemOptions"
                v-bind="{ ...treeConfig }"
                :default-checked-keys="defaultCheckedkeys"
                @check="handleNodeClick"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="模板内容" prop="templateContent">
              <el-input
                v-model="formParams.templateContent"
                :rows="5"
                type="textarea"
                placeholder="请输入内容"
              />
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
    <!-- <overdueDialog ref="overdueRef" @success="overSuccess" />
    <showAfterDialog ref="afterRef" @success="afterSuccess" />
    <contractDialog ref="contractRef" @success="contractSuccess" /> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import { ElForm, ElMessage, ElTree } from 'element-plus'
import type { List } from '@/api/message/types/response.ts'
import type { DictItem } from '@/api'
import type { CascaderOption } from 'element-plus'
import { MessageAPI } from '@/api'
// import type {
//   TreeNodeData,
//   TreeKey
// } from 'element-plus/es/components/tree/src/tree.type'
// import overdueDialog from '@/views/message/messageTemplate/components/overdueDialog'
// import showAfterDialog from '@/views/message/messageTemplate/components/showAfterDialog'
// import contractDialog from '@/views/message/messageTemplate/components/contractDialog'

// import { deepClone } from '@/utils/index.js'
const API = new MessageAPI()
const treeRef = ref<InstanceType<typeof ElTree>>()
withDefaults(
  defineProps<{
    smsBizType: DictItem[]
    smsTemplteType: DictItem[]
    smsContactorType: DictItem[]
    sourceSystemOptions: CascaderOption[]
  }>(),
  {
    smsBizType: () => [],
    smsTemplteType: () => [],
    smsContactorType: () => [],
    sourceSystemOptions: () => []
  }
)
const emit = defineEmits(['getList'])
const dialogTitle: Ref<string> = ref('')
const dialogVisible: Ref<boolean> = ref(false)
const formLoading: Ref<boolean> = ref(false)
const currentType: Ref<string> = ref('')

type children = {
  value: string
  label: string
}
type System12List = {
  value: string
  label: string
  children: children[]
}
interface SubForm {
  bizType: string[]
  contactorType: string
  templateContent: string
  templateName: string
  templateType: string
  sourceSystem12List: System12List[]
  sourceSystemWeb?: string[] | undefined
  id: string
}

export interface PageChildren {
  label: string
  value: string
}
/**
 * 系统来源
 */
export interface PageList {
  children: PageChildren[]
  label: string
  value: string
}
const formParams = reactive<SubForm>({
  bizType: [],
  contactorType: '',
  templateContent: '',
  templateName: '',
  templateType: '',
  sourceSystem12List: [],
  sourceSystemWeb: [],
  id: ''
})
// // // 打开逾期天数弹框
// const overdueRef = ref()
// const ovlist = ref<string[]>(['1', '2', '3'])
// const showOverdueVisible = () => {
//   overdueRef.value.open([...ovlist.value])
// }
// const overSuccess = (result: string[]) => {
//   ovlist.value = result
// }
// const handleCancelOverdus = (tag: string) => {
//   ovlist.value.splice(ovlist.value.indexOf(tag), 1)
// }
// // // 打开 after 弹框
// const afterRef = ref()
// const afterlist = ref<string[]>(['11', '12', '13'])
// const showAfterVisible = () => {
//   afterRef.value.open([...afterlist.value])
// }
// const afterSuccess = (result: string[]) => {
//   afterlist.value = result
// }
// const handleCancelAfter = (tag: string) => {
//   afterlist.value.splice(afterlist.value.indexOf(tag), 1)
// }
// // // 打开 合同状态 弹框
// const contractRef = ref()
// const contractlist = ref<string[]>(['dictValue', 'dictValue3', 'dictValue2'])
// const showContractVisible = () => {
//   contractRef.value.open([...contractlist.value])
// }
// const contractSuccess = (result: string[]) => {
//   console.log('objcontractlistect', result)
//   contractlist.value = result
// }
// const handleCancelContract = (tag: string) => {
//   contractlist.value.splice(contractlist.value.indexOf(tag), 1)
// }

const formRules = reactive({
  bizType: [{ required: true, message: '业务类型不能为空', trigger: 'blur' }],
  contactorType: [
    { required: true, message: '联系人类型不能为空', trigger: 'blur' }
  ],
  templateContent: [
    { required: true, message: '模板内容不能为空', trigger: 'blur' }
  ],
  templateName: [
    { required: true, message: '模板名称不能为空', trigger: 'blur' }
  ],
  templateType: [
    { required: true, message: '模板类型不能为空', trigger: 'blur' }
  ],
  sourceSystemWeb: [
    { required: true, message: '请选择来源系统', trigger: 'blur' }
  ]
})
const formRef = ref<InstanceType<typeof ElForm>>()

const treeConfig = {
  'empty-text': '暂无数据',
  'default-expand-all': true,
  'show-checkbox': true,
  nodeKey: 'labelValue',
  indent: 15
}
const defaultCheckedkeys = ref<string[]>([])
// type CurType = {
//   checkedNodes: TreeNodeData[]
//   checkedKeys: TreeKey[]
//   halfCheckedNodes: TreeNodeData[]
//   halfCheckedKeys: TreeKey[]
// }
type CurType = {
  checkedNodes: []
  checkedKeys: []
  halfCheckedNodes: []
  halfCheckedKeys: []
}
// const handleNodeClick = (currentKeys: TreeNodeData, currentNode: CurType) => {
const handleNodeClick = (currentKeys: string, currentNode: CurType) => {
  console.log(currentKeys, currentNode)
  if (currentNode.checkedKeys.length === 0) {
    formParams.sourceSystemWeb = []
    return
  }
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
  console.log('object', currentNode.checkedKeys)
  const sysList: System12List[] = []
  const srotLs = currentNode.checkedKeys.sort((a: string, b: string) => {
    return a.length - b.length
  })
  srotLs.forEach((e: string) => {
    const eStr = e.split('+')
    if (eStr.length === 2) {
      const len = sysList.filter((cur) => {
        return cur.value === eStr[1]
      })
      if (len.length === 0) {
        const namevalue = e.split('+')
        sysList.push({
          label: namevalue[0],
          value: namevalue[1],
          children: []
        })
      }
    } else {
      const len = sysList.filter((cur) => {
        return cur.value === eStr[3]
      })
      if (len.length === 0) {
        const namevalue = e.split('+')
        sysList.push({
          label: namevalue[2],
          value: namevalue[3],
          children: [
            {
              label: namevalue[0],
              value: namevalue[1]
            }
          ]
        })
      } else {
        sysList.forEach((el) => {
          if (el.value === eStr[3]) {
            el.children.push({
              label: eStr[0],
              value: eStr[1]
            })
          }
        })
      }
    }
  })
  formParams.sourceSystemWeb = currentNode.checkedKeys
  formParams.sourceSystem12List = sysList || []
}
const submitForm = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate()
  if (!valid) return
  const parm = { ...formParams, bizType: formParams.bizType.join(',') }
  // parm.sourceSystem12List = parm.sourceSystemWeb
  delete parm.sourceSystemWeb
  if (currentType.value === 'add') {
    API.createSmsTemplate(parm)
      .then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
          dialogVisible.value = false
          emit('getList')
        }
      })
      .catch((err: Error) => {
        throw err
      })
  } else {
    API.updateSmsTemplate(parm)
      .then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
          dialogVisible.value = false
          emit('getList')
        }
      })
      .catch((err: Error) => {
        throw err
      })
  }
}
const open = (type: string, row: List) => {
  dialogVisible.value = true
  currentType.value = type
  dialogTitle.value = type === 'add' ? '新增' : '编辑'
  if (type === 'edit') {
    const defList: string[] = []
    if (row?.sourceSystem12List && row?.sourceSystem12List.length > 0) {
      row.sourceSystem12List.forEach((el) => {
        el.children.forEach((ch) => {
          defList.push(
            ch.label + '+' + ch.value + '+' + el.label + '+' + el.value
          )
        })
      })
    }
    treeRef.value?.setCheckedKeys(defList, true)
    // treeRef.value?.setCheckedKeys(defList, true)
    defaultCheckedkeys.value = defList
    formParams.id = row?.id
    formParams.bizType = row?.bizType ? row?.bizType?.split(',') : []
    formParams.contactorType = row?.contactorType
    formParams.templateContent = row?.templateContent
    formParams.templateName = row?.templateName
    formParams.templateType = row?.templateType ? row?.templateType : ''
    formParams.sourceSystem12List = []
    formParams.sourceSystemWeb = defList
  } else {
    treeRef.value?.setCheckedKeys([], true)
    defaultCheckedkeys.value = []
    formParams.id = ''
    formParams.bizType = []
    formParams.contactorType = ''
    formParams.templateContent = ''
    formParams.templateName = ''
    formParams.templateType = ''
    formParams.sourceSystem12List = []
    formParams.sourceSystemWeb = []
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
.flex-c {
  display: flex;
  flex-direction: column;
}
.tags-overdue {
  margin-right: 10px;
}
</style>

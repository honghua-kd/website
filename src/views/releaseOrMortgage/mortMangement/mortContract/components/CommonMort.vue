<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="通用材料出具申请"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="45%"
      top="5vh"
      style="overflow-y: scroll; max-height: 90vh"
    >
      <div class="btn-top">
        <el-button link type="primary" @click="addCity(listIndex)">
          +增加申请城市
        </el-button>
      </div>
      <el-form
        ref="ruleFormRef"
        :label-width="px2rem('110px')"
        :model="formParams"
        :rules="rules"
      >
        <div
          v-for="(item, index) in formParams.list"
          :key="index"
          :id="`list-${index + 1}`"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="上牌城市"
                :prop="`list[${index}].plateCity`"
                :rules="rules.plateCity"
              >
                <Area
                  v-model="item.plateCity"
                  :value="item.plateCity"
                  :level="1"
                  @changeAreaData="changeArea"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="材料数量"
                :prop="`list[${index}].count`"
                :rules="rules.count"
              >
                <el-input
                  placeholder="请输入"
                  v-model="formParams.list[index].count"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="材料清单"
                :rules="[{ required: true, message: '材料清单不能为空' }]"
              >
                <el-input placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="材料去向"
                :prop="`list[${index}].direction`"
                :rules="rules.direction"
              >
                <el-select
                  v-model="item.direction"
                  clearable
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in directionOpts"
                    :key="String(item.value)"
                    :label="String(item.label)"
                    :value="String(item.value)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备案人姓名">
                <el-input placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 移交客户 -->
          <div v-if="item.direction === 'a'">
            <el-row>
              <el-col :span="24">
                <el-form-item label="材料寄送地址" prop="">
                  <Area
                    v-model="item.sendAdderss"
                    :value="item.sendAdderss"
                    :level="2"
                    @changeAreaData="changeAddress"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="" prop="">
                  <el-input style="width: 100%" placeholder="请输入详细地址" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="联系人" prop="">
                  <el-input style="width: 100%" placeholder="请输入联系人" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="">
                  <el-input style="width: 100%" placeholder="请输入联系电话" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 移交其他 -->
          <div v-if="item.direction === 'c'">
            <el-row>
              <el-col>
                <el-form-item label="移交至">
                  <el-cascader
                    style="width: 100%"
                    :props="cascaderProps"
                    placeholder="请选择"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item>
                  <el-select clearable placeholder="请选择" style="width: 100%">
                    <el-option
                      v-for="item in directionOpts"
                      :key="String(item.value)"
                      :label="String(item.label)"
                      :value="String(item.value)"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="上传附件">
                <el-upload style="width: 100%">
                  <el-button style="width: 100%">+上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="备注">
                <el-input type="textarea" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="text-blue">
            <el-col :span="6">上次申请量：{{ 1111 }}</el-col>
            <el-col :span="8">距离上次申请新增起租量：{{ 1111 }}</el-col>
            <el-col :span="6"> 申请系数：{{ 1111 }} </el-col>
          </el-row>
          <el-divider border-style="dashed" style="margin-top: 10px" />
        </div>

        <el-row class="text-red">
          如对材料模版有异议，请联系运营管理部。
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm"> 确认 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import Area from './Area.vue'
import { px2rem } from '@/utils'
import { reactive, ref, computed } from 'vue'
import {
  ElForm,
  FormRules,
  FormInstance,
  CascaderProps,
  CascaderOption
} from 'element-plus'
import { CommonAPI } from '@/api'
const CommonApi = new CommonAPI()

interface Params {
  direction: string
  count: string
  sendAdderss: string[]
  plateCity: string[]
}
interface FormParams {
  list: Params[]
}
const formParams = reactive<FormParams>({
  list: [
    {
      direction: '',
      count: '',
      sendAdderss: [],
      plateCity: []
    }
  ]
})
const directionOpts = ref([
  {
    label: '移交客户',
    value: 'a'
  },
  {
    label: '移交运营',
    value: 'b'
  },
  {
    label: '移交其他',
    value: 'c'
  }
])
const rules = reactive<FormRules>({
  plateCity: [
    {
      required: true,
      message: '上牌城市不能为空',
      trigger: 'change'
    }
  ],
  count: [
    {
      required: true,
      message: '材料清单不能为空',
      trigger: 'change'
    }
  ],
  direction: [
    {
      required: true,
      message: '材料去向不能为空',
      trigger: 'change'
    }
  ]
})
const dialogVisible = ref(false)
const open = () => {
  dialogVisible.value = true
}
defineExpose({ open })

const listIndex = computed(() => {
  return formParams.list.length
})
const addCity = (index: number) => {
  formParams.list.push({
    direction: '',
    count: '',
    sendAdderss: [],
    plateCity: []
  })
  scrollToIndex(index)
}
// 滚动到指定的列表项
const scrollToIndex = (index: number) => {
  const element = document.getElementById(`list-${index}`) as HTMLElement
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  })
}

const ruleFormRef = ref<FormInstance>()
const submitForm = async () => {
  if (!ruleFormRef.value) return
  const valid = await ruleFormRef.value.validate()
  if (!valid) return
  console.error(1)
}

const changeAddress = () => {}
const changeArea = () => {}
const cascaderProps: CascaderProps = {
  lazy: true,
  multiple: false,
  async lazyLoad(node, resolve) {
    const nodes: CascaderOption[] = [] // 动态节点
    const { level } = node
    if (level === 0) {
      const first = await CommonApi.getDictTreeList({
        dictType: 'SOURCE_SYSTEM'
      })
      if (first && first?.data) {
        first.data.map((item) => {
          const area = {
            value: String(item.label),
            label: String(item.label),
            leaf: level > 2
          }
          nodes.push(area)
        })
      }
    } else {
      // const params = {
      //   code: node.value as number
      // }
      // const res = await API.getChildrenArea(params)
      // if (res && res.data) {
      //   res.data.map((item: AreaChildrenResponse) => {
      //     const area = {
      //       value: String(item.code),
      //       label: item.name,
      //       leaf: level >= props.level
      //     }
      //     nodes.push(area)
      //   })
      // }
    }
    resolve(nodes) // 回调
  }
}
</script>
<style lang="scss" scoped>
.btn-top {
  position: absolute;
  top: 22px;
  left: 180px;
}
.text-red {
  margin-top: 10px;
  font-size: $base-font-size-small;
  color: $base-color-red;
}
.text-blue {
  color: $base-color;
}
:deep(.el-upload) {
  width: 100% !important;
}
</style>

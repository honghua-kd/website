<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-menu :default-active="defaultActive" active-text-color="#ffd04b">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>变量</span>
            </template>
            <el-menu-item
              v-for="item in variableArr"
              :key="item.id"
              @click="selectMenuItem(item)"
              :index="item.keywordCode"
            >
              <span>{{ item.forwordName }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>函数</span>
            </template>
            <el-menu-item
              v-for="(item, index) in funcArr"
              :key="index"
              @click="selectMenuItem(item)"
              :index="item.keywordCode"
            >
              <span>{{ item.forwordName }}</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <SecondaryTitle title="公式定义器" />
        <div class="exp-container">
          <el-form :model="expForm" label-width="100" :disabled="editable">
            <el-form-item label="编辑公式：" prop="keywordName">
              <el-row :gutter="20" class="width-full">
                <el-col :span="20">
                  <el-input
                    v-model="expForm.keywordName"
                    type="textarea"
                    palceholder="请选择/输入公式"
                  />
                </el-col>
                <el-col :span="2">
                  <el-button @click="validateHandler" type="success" plain
                    >校验</el-button
                  >
                </el-col>
                <el-col :span="2">
                  <el-button @click="clearHandler" type="warning" plain
                    >清空</el-button
                  >
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="表达式：" prop="keywordCode">
              <el-input v-model="expForm.keywordCode" type="textarea" />
            </el-form-item>
            <el-form-item label="编辑器：">
              <el-row class="width-full">
                <el-col class="formula-cont">
                  <p v-for="(el, ind) in formulaList" :key="ind">
                    <span
                      v-for="(e, i) in el"
                      :key="i"
                      :class="e.class"
                      @click="selectUnitHandler(e.label)"
                    >
                      {{ e.label }}
                    </span>
                  </p>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div class="btn-bar">
            <el-button @click="delHandler" type="danger" plain>
              删除当前映射
            </el-button>
            <el-button v-if="editable" type="primary" @click="editHandler">
              编辑
            </el-button>
            <el-button v-else @click="submitForm" type="primary">
              提交
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, Ref } from 'vue'
import { SystemAPI } from '@/api/system'
import { Setting } from '@element-plus/icons-vue'
import SecondaryTitle from '@/components/SecondaryTitle/index.vue'
import { formulaList } from '@/views/system/role/config'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { ScopeMapping, ExpDetail } from '@/api'

const API = new SystemAPI()
const variableArr: Ref<ScopeMapping[]> = ref([])
const funcArr: Ref<ScopeMapping[]> = ref([])
const expForm: Omit<ScopeMapping, 'id' | 'forwordName' | 'url'> = reactive({
  keywordName: '',
  keywordCode: ''
})
const currentNode = reactive<ScopeMapping>({
  id: '',
  forwordName: '',
  keywordName: '',
  keywordCode: '',
  url: ''
})
const defaultActive = ref<string>('')
const editable = ref<boolean>(true)

const getExprList = () => {
  API.getRuleList()
    .then((res) => {
      if (res && res.code === 200) {
        variableArr.value = res?.data || []
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}

// 编辑
const editHandler = () => {
  editable.value = false
}

// 清空
const clearHandler = () => {
  expForm.keywordName = ''
  expForm.keywordCode = ''
}

// 校验
const validateHandler = () => {
  if (!expForm.keywordName) return
  const params = {
    dataScope: expForm.keywordName
  }
  API.checkRules(params)
    .then((res) => {
      if (res && res.code === 200) {
        expForm.keywordCode = res?.data || ''
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}
const reset = () => {
  expForm.keywordName = ''
  expForm.keywordCode = ''
  currentNode.id = ''
  currentNode.forwordName = ''
  currentNode.keywordName = ''
  currentNode.keywordCode = ''
  currentNode.url = ''
}
// 删除
const delHandler = () => {
  // 二次确认
  ElMessageBox.confirm(
    `确认要删除 ${currentNode.forwordName} 的规则吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      // 调用删除接口
      const params = {
        id: currentNode.id
      }
      API.delExp(params)
        .then((res) => {
          if (res && res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            reset()
            nextTick(() => {
              getExprList()
            })
          }
        })
        .catch((err) => {
          throw new Error(err)
        })
    })
    .catch(() => {})
}

// 提交
const submitForm = () => {
  const params = Object.assign(currentNode, expForm)
  API.saveScopeMapping(params)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '保存成功'
        })
        editable.value = true
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}

const selectMenuItem = (item: ScopeMapping) => {
  reset()
  const params = { id: item.id }
  API.getExpDetail(params)
    .then((res) => {
      if (res && res.code === 200) {
        const detail = res?.data as ExpDetail
        setCurrentNode(detail)
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}

const setCurrentNode = (item: ExpDetail) => {
  const { id, forwordName, keywordName, keywordCode, url } = item
  expForm.keywordName += keywordName as string
  expForm.keywordCode = keywordCode as string
  currentNode.id = id
  currentNode.forwordName = forwordName as string
  currentNode.keywordName = keywordName as string
  currentNode.keywordCode = keywordCode as string
  currentNode.url = url as string
}
// 选中公式
const selectUnitHandler = (unit: string) => {
  if (editable.value) return
  expForm.keywordName += unit
}

const init = () => {
  getExprList()
}
init()
</script>

<style lang="scss" scoped>
.exp-container {
  margin-top: 10px;
}
.formula-cont {
  padding: 0 !important;
  width: 100%;
  border-top: 1px solid #cccccc;
  border-left: 1px solid #cccccc;
  p {
    display: flex;
    justify-content: space-between;
    margin: 0;
    span {
      border-right: 1px solid #cccccc;
      border-bottom: 1px solid #cccccc;
      text-align: center;
      cursor: pointer;
      flex: 1;
    }
    .equals {
      flex: 2;
    }
  }
}
.width-full {
  width: 100%;
}
.btn-bar {
  width: 100%;
  text-align: right;
}
</style>

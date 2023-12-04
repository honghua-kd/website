<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      v-model="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="60%"
    >
      <el-form
        ref="formRef"
        :model="formParams"
        v-loading="formLoading"
        :rules="formRules"
        label-width="130px"
      >
        <el-form-item label="文件名">
          <el-link type="primary">primary</el-link>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="登记证编号" prop="registerNo">
              <el-input v-model="formParams.registerNo" />
              <span class="detail">test</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车架号" prop="vinNo">
              <el-input v-model="formParams.vinNo" />
              <span class="detail">LDP31B960NG103831</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车牌号" prop="licenseNo">
              <el-input v-model="formParams.licenseNo" />
              <span class="detail">沪A09789</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="发动机号" prop="engineNo">
              <el-input v-model="formParams.engineNo" />
              <span class="detail">370035624077</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发动机型号" prop="engineModel">
              <el-input v-model="formParams.engineModel" />
              <span class="detail">MCLL.XXXX</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机动车所有人" prop="owner">
              <el-input v-model="formParams.owner" />
              <span class="detail">XXXXXXYYYYYYYYYYYYYY</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="车身颜色" prop="color">
              <el-input v-model="formParams.color" />
              <span class="detail">白色</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用性质" prop="nature">
              <el-input v-model="formParams.nature" />
              <span class="detail">XXXXXXXXX</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="抵押权人" prop="mortgagee">
              <el-select v-model="formParams.mortgagee">
                <el-option
                  v-for="(item, index) in mortOpts"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <span class="detail">XXXXXXXXX</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="统一社会信用代码"
              prop="unifiedSocialCreditCode"
            >
              <el-input v-model="formParams.unifiedSocialCreditCode" />
              <span class="detail">XXXXXXXXX</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="抵押日期" prop="mortgageDate">
              <el-date-picker
                v-model="formParams.mortgageDate"
                type="date"
                placeholder="Pick a day"
              />
              <span class="detail">XXXXXXXXX</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button :disabled="formLoading" type="primary" @click="submitForm">
          保 存
        </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          关 闭
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { mortOpts } from './config'
const dialogTitle = ref<string>('编辑扫描结果')
const dialogVisible = ref<boolean>(false)
const formLoading = ref<boolean>(false)
const formRules = reactive({})
const formRef = ref()
const formParams = reactive({
  registerNo: '', // 登记证编号
  vinNo: '', // 车架号
  licenseNo: '', // 车牌号
  engineNo: '', // 发动机号
  engineModel: '', // 发动机型号
  owner: '', // 机动车所有人
  color: '', // 车身颜色
  nature: '', // 使用性质
  mortgagee: '', // 抵押权人
  unifiedSocialCreditCode: '', // 统一社会信用代码
  mortgageDate: '' // 抵押日期
})

/** 打开弹窗 */
const open = (type: string, id: string) => {
  dialogVisible.value = true
  console.log(type, id)
}

defineExpose({ open })

// 保存
const submitForm = () => {}
</script>

<style lang="scss" scoped>
.detail {
  color: #1893ff;
  line-height: 16px;
}
</style>

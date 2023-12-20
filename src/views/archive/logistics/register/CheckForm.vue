<template>
  <el-dialog
    width="80%"
    :title="dialogTitle"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="second-title">基本信息</div>
    <el-form ref="basicInfoFormRef" :model="basicInfoForm" label-width="90px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item
            label="快递单号:"
            prop="expressNo"
            :rules="[{ required: true }]"
          >
            <el-input
              v-model="basicInfoForm.expressNo"
              clearable
              placeholder="请输入快递单号"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            class="express-com"
            label="快递公司:"
            prop="expressCompany"
          >
            <el-input
              v-model="basicInfoForm.expressOtherCompany"
              clearable
              disabled
              placeholder="请输入快递公司"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="寄送/接收:" prop="postOrReceive">
            <el-select
              v-model="basicInfoForm.postOrReceiveStatus"
              style="width: 100%"
              clearable
              disabled
              placeholder="请选择寄送/接收"
            >
              <el-option
                v-for="(item, index) in postAndReceiveStatusOpts"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收件日期:" prop="registerTime">
            <el-date-picker
              v-model="basicInfoForm.registerTime"
              type="date"
              disabled
              :default-value="new Date()"
              format="YYYY/MM/DD"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <div class="address-info">
        <el-row :gutter="20">
          <el-col :span="3" class="sender-avatar">
            <div class="post-icon">
              <svg-icon name="send" size="52" />
            </div>
          </el-col>
          <el-col :span="20">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="寄件人名称:" prop="senderName">
                  <el-input
                    v-model="basicInfoForm.senderName"
                    clearable
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="寄件人联系方式:"
                  label-width="120px"
                  prop="postPhone"
                >
                  <el-input
                    v-model="basicInfoForm.senderPhone"
                    clearable
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="18">
                <el-form-item label="寄件人地址:" prop="senderAddress">
                  <el-input
                    v-model="basicInfoForm.senderAddress"
                    clearable
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-divider />
        <el-row :gutter="20">
          <el-col :span="3" class="recipient-avatar">
            <div class="post-icon">
              <svg-icon name="receive" size="52" />
            </div>
          </el-col>
          <el-col :span="20">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="收件人名称:" prop="senderName">
                  <el-input
                    v-model="basicInfoForm.recipientName"
                    clearable
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="收件人联系方式:"
                  label-width="120px"
                  prop="recipientPhone"
                >
                  <el-input
                    v-model="basicInfoForm.recipientPhone"
                    clearable
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="18">
                <el-form-item label="收件人地址:" prop="recipientAddress">
                  <el-input
                    v-model="basicInfoForm.recipientAddress"
                    clearable
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <el-row style="margin-top: 20px">
        <el-col :span="5">
          <el-form-item
            label="快递状态:"
            prop="postOrReceive"
            :rules="[{ required: true }]"
          >
            <el-input
              v-model="basicInfoForm.postOrReceiveStatus"
              clearable
              disabled
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="问题描述:" prop="postOrReceive">
            <el-input
              v-model="basicInfoForm.expressNo"
              clearable
              disabled
              :rows="4"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider />
      <!-- <div class="second-title">
          快递内容 
          
        </div> -->
      <div class="express-content">
        <div class="title">快递信息</div>
      </div>

      <el-row :gutter="20">
        <el-col>
          <el-form-item label="快递内容:" prop="expressContentList">
            <el-table
              :data="basicInfoForm.expressContentList"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              border
              row-key="id"
            >
              <el-table-column label="序号" prop="number" align="center" />
              <el-table-column
                label="快递内容编号"
                prop="expressContentNo"
                align="center"
              />
              <el-table-column
                label="快递内容类型"
                prop="expressContentType"
                align="center"
              />
              <el-table-column
                label="类型对应编号"
                prop="typeNo"
                align="center"
              />
              <el-table-column
                label="关联合同号"
                prop="contractNo"
                align="center"
              />
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="备注:" prop="postOrReceive">
            <el-input
              v-model="basicInfoForm.expressNo"
              clearable
              disabled
              :rows="3"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <div class="second-title">其他信息</div>
      <!-- <div>附件：<el-button type="primary">上传</el-button></div> -->
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="附件:" prop="otherInfoList">
            <div style="margin-bottom: 20px">
              <el-button type="primary" :icon="Download"></el-button>
            </div>
            <el-table
              :data="basicInfoForm.otherInfoList"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              border
              row-key="id"
              @selection-change="selectionChangeHandler"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column label="序号" prop="number" align="center" />
              <el-table-column
                label="文件名"
                prop="expressContentNo"
                align="center"
              />
              <el-table-column
                label="上传用户"
                prop="expressContentType"
                align="center"
              />
              <el-table-column label="上传时间" prop="typeNo" align="center" />
              <el-table-column label="备注" prop="remark" align="center" />
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="dialogVisible = false">
        关 闭
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  ArrowDownBold,
  ArrowUpBold,
  Plus,
  Delete,
  Upload,
  Download,
  Check
} from '@element-plus/icons-vue'
import { ref, reactive, Ref, watch, onMounted } from 'vue'
const dialogTitle = ref<string>('邮寄信息登记详情')
const dialogVisible = ref<boolean>(false)
const basicInfoForm = reactive({
  expressContentList: [
    {
      id: '1',
      number: '1',
      expressContentNo: 'SF1008926382181-001',
      expressContentType: '发票',
      typeNo: '7897979790',
      contractNo: 'KCG23117833...'
    }
  ],
  otherInfoList: [
    {
      id: '1',
      number: '1',
      expressContentNo: 'xxx.jpg',
      expressContentType: 'admin',
      typeNo: '2023-12-14 12:03:30',
      remark: '合同'
    }
  ]
})

/** 打开弹窗 */
const open = async (id: string) => {
  dialogVisible.value = true
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
.second-title {
  margin-bottom: 20px;
  font-size: $base-font-size-big;
}
.express-com {
  :deep(.el-form-item__content) {
    display: flex;
    flex-wrap: nowrap;
    :deep(.el-form-item) {
      margin-left: 10px;
    }
  }
}
.express-com {
  :deep(.el-select) {
    width: 50% !important;
  }
}
.express-com {
  :deep(.el-form-item) {
    margin-left: 5px;
  }
}
.address-info {
  padding: 20px 10px;
  border: 1px dashed $base-border-color;
  .sender-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .post-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .recipient-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.express-content {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .title {
    margin-right: 10px;
    font-size: $base-font-size-big;
  }
}
</style>

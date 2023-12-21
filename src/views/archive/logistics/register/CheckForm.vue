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
              v-model="basicInfoForm.expressCompany"
              clearable
              disabled
              placeholder="请输入快递公司"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="寄送/接收:" prop="expressType">
            <el-select
              v-model="basicInfoForm.expressType"
              style="width: 100%"
              clearable
              disabled
              placeholder="请选择寄送/接收"
            >
              <el-option
                v-for="(item, index) in expressTypeOpts"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收件日期:" prop="receiveTime">
            <el-date-picker
              v-model="basicInfoForm.receiveTime"
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
                <el-form-item label="寄件人名称:" prop="sendUser">
                  <el-input
                    v-model="basicInfoForm.sendUser"
                    clearable
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="寄件人联系方式:"
                  label-width="120px"
                  prop="sendPhone"
                >
                  <el-input
                    v-model="basicInfoForm.sendPhone"
                    clearable
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="18">
                <el-form-item label="寄件人地址:" prop="sendAddress">
                  <el-input
                    v-model="basicInfoForm.sendAddress"
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
                <el-form-item label="收件人名称:" prop="receiveUser">
                  <el-input
                    v-model="basicInfoForm.receiveUser"
                    clearable
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="收件人联系方式:"
                  label-width="120px"
                  prop="receivePhone"
                >
                  <el-input
                    v-model="basicInfoForm.receivePhone"
                    clearable
                    disabled
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="18">
                <el-form-item label="收件人地址:" prop="receiveAddress">
                  <el-input
                    v-model="basicInfoForm.receiveAddress"
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
            prop="expressStatus"
            :rules="[{ required: true }]"
          >
            <el-select
              v-model="basicInfoForm.expressStatus"
              style="width: 100%"
              clearable
              disabled
              placeholder="请选择快递状态"
            >
              <el-option
                v-for="(item, index) in expressStatusOpts"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="问题描述:" prop="expressStatusRemark">
            <el-input
              v-model="basicInfoForm.expressStatusRemark"
              clearable
              disabled
              :rows="4"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider />
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
                prop="contentNo"
                align="center"
              />
              <el-table-column
                label="快递内容类型"
                prop="contentType"
                align="center"
              />
              <el-table-column
                label="类型对应编号"
                prop="contentTypeNumber"
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
      <el-row :gutter="20">
        <el-col>
          <el-form-item label="附件:" prop="otherInfoList">
            <div style="margin-bottom: 20px">
              <!-- <el-button type="primary" :icon="Download"></el-button> -->
              <svg-icon name="download" size="24" />
            </div>
            <el-table
              :data="basicInfoForm.otherFileList"
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
import type {
  PageRequest,
  ExpressInfoCardListRequest,
  DictItem,
  ExpressListItem,
  ExpressContentList
} from '@/api'
import { CommonAPI, ExpressAPI } from '@/api'
const API = new ExpressAPI()
const CommonApi = new CommonAPI()
const dialogTitle = ref<string>('邮寄信息登记详情')
const dialogVisible = ref<boolean>(false)
let basicInfoForm = reactive({})

// 获取邮寄信息
const getList = (id: string) => {
  const params = {
    expressNo: id
  }
  API.checkExpressInfo(params)
    .then((res) => {
      if (res && res.code === 200) {
        basicInfoForm = res?.data
      }
    })
    .catch((err: Error) => {
      throw err
    })
}

/** 打开弹窗 */
const open = async (id: string) => {
  dialogVisible.value = true
  getList(id)
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

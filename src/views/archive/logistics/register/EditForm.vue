<template>
  <el-dialog
    width="80%"
    :title="title"
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
              :disabled="disFlag"
              placeholder="请输入快递单号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            class="express-com"
            label="快递公司:"
            prop="expressCompany"
            :rules="[{ required: true }]"
          >
            <el-select
              v-model="basicInfoForm.expressCompany"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="(item, index) in expressCompanyOpts"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-form-item prop="expressNo">
              <el-input
                v-model="basicInfoForm.expressCompanyOther"
                clearable
                placeholder="请输入快递公司"
              />
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            label="寄送/接收:"
            prop="postOrReceive"
            :rules="[{ required: true }]"
          >
            <el-select
              v-model="basicInfoForm.expressType"
              style="width: 100%"
              clearable
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
        <el-col :span="5">
          <el-form-item label="收件日期:" prop="receiveTime">
            <el-date-picker
              v-model="basicInfoForm.receiveTime"
              type="date"
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
                  <el-autocomplete
                    v-model="basicInfoForm.sendUser"
                    :fetch-suggestions="queryContractsSearch"
                    :trigger-on-focus="false"
                    clearable
                    placeholder="请输入寄件人名称"
                    @select="handleSelect"
                    :debounce="500"
                    @change="handleChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="寄件人联系电话:"
                  label-width="120px"
                  prop="postPhone"
                >
                  <el-input
                    v-model="basicInfoForm.sendPhone"
                    clearable
                    placeholder="请输入寄件人联系电话"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="18">
                <el-form-item label="寄件人地址:" prop="senderAddress">
                  <el-input
                    v-model="basicInfoForm.sendAddress"
                    clearable
                    placeholder="请输入寄件人地址"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button type="primary">设为常用地址</el-button>
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
                    placeholder="请输入收件人名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="收件人联系电话:"
                  label-width="120px"
                  prop="receivePhone"
                >
                  <el-input
                    v-model="basicInfoForm.receivePhone"
                    clearable
                    placeholder="请输入收件人联系电话"
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
                    placeholder="请输入收件人地址"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button type="primary">设为常用地址</el-button>
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
              :rows="4"
              type="textarea"
              placeholder="请输入问题描述"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider />
      <!-- <div class="second-title">
          快递内容 
          
        </div> -->
      <div class="express-content">
        <div class="title">快递内容</div>
        <div>
          <el-button type="primary">导入</el-button>
          <el-button type="primary" @click="addExpressHandler">新增</el-button>
        </div>
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
              <el-table-column
                label="序号"
                prop="number"
                width="180"
                align="center"
                type="index"
              />
              <el-table-column
                label="快递内容编号"
                prop="contentNo"
                width="180"
                align="center"
              />
              <el-table-column
                label="快递内容类型"
                prop="contentType"
                width="180"
                align="center"
              />
              <el-table-column
                label="类型对应编号"
                prop="contentTypeNumber"
                width="180"
                align="center"
              />
              <el-table-column
                label="关联合同号"
                prop="contractNo"
                width="180"
                align="center"
              />

              <el-table-column
                label="操作"
                fixed="right"
                width="180"
                align="center"
              >
                <template #default="scope">
                  <el-button
                    link
                    type="primary"
                    @click="editExpressHandler(scope.row.id)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    link
                    type="danger"
                    @click="delExpressHandler(scope.row.id)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="备注:" prop="expressContentRemark">
            <el-input
              v-model="basicInfoForm.expressContentRemark"
              clearable
              :rows="3"
              type="textarea"
              placeholder="请输入备注"
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
              <el-button type="primary">上传</el-button>
            </div>
            <el-table
              :data="basicInfoForm.otherFileList"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              border
              row-key="id"
            >
              <el-table-column
                label="序号"
                prop="number"
                width="180"
                align="center"
              />
              <el-table-column
                label="文件名"
                prop="expressContentNo"
                width="180"
                align="center"
              />
              <el-table-column
                label="上传用户"
                prop="expressContentType"
                width="180"
                align="center"
              />
              <el-table-column
                label="上传时间"
                prop="typeNo"
                width="180"
                align="center"
              />
              <el-table-column
                label="备注"
                prop="remark"
                width="180"
                align="center"
              >
                <template #default="scope">
                  <el-input
                    v-model="scope.row.remark"
                    clearable
                    placeholder="请输入备注"
                  />
                </template>
              </el-table-column>

              <el-table-column
                label="操作"
                fixed="right"
                width="180"
                align="center"
              >
                <template #default="scope">
                  <el-button link type="danger">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button type="primary"> 保 存 </el-button>
      <el-button type="primary" @click="dialogVisible = false">
        关 闭
      </el-button>
    </template>
    <EditExpressForm ref="editExpressFormRef" :title="dialogExpressTitle" />
  </el-dialog>
</template>

<script setup lang="ts">
import EditExpressForm from './components/EditExpressForm.vue'
import {
  ArrowDownBold,
  ArrowUpBold,
  Plus,
  Delete,
  Upload,
  Download,
  Check
} from '@element-plus/icons-vue'
import type {
  PageRequest,
  ExpressInfoCardListRequest,
  DictItem,
  ExpressListItem,
  ExpressContentList
} from '@/api'
import { ref, reactive, Ref, watch, onMounted } from 'vue'
import { CommonAPI, ExpressAPI } from '@/api'
const API = new ExpressAPI()
const CommonApi = new CommonAPI()
const dialogExpressTitle = ref<string>('')
const dialogVisible = ref<boolean>(false)
const disFlag = ref<boolean>(false)
defineProps({
  title: {
    type: String,
    default: ''
  }
})
let basicInfoForm = reactive<ExpressListItem>({})
const commonContracts = ref([])

const queryContractsSearch = (queryString: string, cb: any) => {
  const results = queryString
    ? commonContracts.value.filter(createFilter(queryString))
    : commonContracts.value
  cb(results)
}
const createFilter = (queryString: string) => {
  return (res) => {
    return res.value.indexOf(queryString) !== -1
  }
}
const handleSelect = (item) => {
  basicInfoForm.sendUser = item.userName
  basicInfoForm.sendPhone = item.userPhone
  basicInfoForm.sendAddress = item.userAddress
}
const handleChange = () => {
  const params = {
    userName: basicInfoForm.sendUser,
    userPhone: basicInfoForm.sendPhone
  }
  API.getUsualAddressList(params)
    .then((res) => {
      if (res && res.code === 200) {
        commonContracts.value = res?.data?.list || []
        commonContracts.value.forEach((item) => {
          item.value = '常用联系-' + item.userName + '-' + item.userPhone
        })
      }
    })
    .catch((err: Error) => {
      console.log(err)
    })
}

// 新增编辑快递内容弹窗
const editExpressFormRef = ref()
const editExpressHandler = (id: string) => {
  dialogExpressTitle.value = '编辑快递内容'
  editExpressFormRef.value.open(row)
}
const addExpressHandler = () => {
  dialogExpressTitle.value = '新增快递内容'
  editExpressFormRef.value.open()
}

// 删除快递内容
const delExpressHandler = (id: string) => {
  
}

/** 打开弹窗 */
const open = async (row: string) => {
  dialogVisible.value = true
  console.error(row)
  if (row) {
    disFlag.value = true
    basicInfoForm = row
  } else {
    disFlag.value = false
  }
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

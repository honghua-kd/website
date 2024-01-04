<template>
  <el-dialog
    width="80%"
    :title="dialogTitle"
    v-model="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="second-title">基本信息</div>
    <el-form
      ref="basicInfoFormRef"
      :model="basicInfoForm"
      :label-width="px2rem('100px')"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="快递单号" prop="expressNo">
            <el-input
              v-model="basicInfoForm.expressNo"
              clearable
              placeholder="请输入快递单号"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item
            class="express-com"
            label="快递公司"
            prop="expressCompany"
          >
            <el-select
              v-model="basicInfoForm.expressCompany"
              style="width: 100%"
              clearable
              disabled
            >
              <el-option
                v-for="(item, index) in expressCompanyOpts"
                :key="index"
                :label="item.label"
                :value="(item.label as string)"
              />
            </el-select>
            <el-form-item v-if="expressCompanyFlag" prop="expressNo">
              <el-input
                v-model="basicInfoForm.expressCompanyOther"
                clearable
                disabled
                placeholder="请输入快递公司"
              />
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="寄送/接收" prop="expressType">
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
          <el-form-item
            v-if="expressStatusFlag"
            label="收件日期"
            prop="receiveTime"
          >
            <el-date-picker
              v-model="basicInfoForm.receiveTime"
              type="date"
              disabled
              :default-value="new Date()"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item v-else label="寄件日期" prop="sendTime">
            <el-date-picker
              v-model="basicInfoForm.sendTime"
              type="date"
              disabled
              :default-value="new Date()"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
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
                <el-form-item label="寄件人名称" prop="sendUser">
                  <el-input
                    v-model="basicInfoForm.sendUser"
                    clearable
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="寄件人联系电话"
                  :label-width="px2rem('120px')"
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
                <el-form-item label="寄件人地址" prop="sendAddress">
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
                <el-form-item label="收件人名称" prop="receiveUser">
                  <el-input
                    v-model="basicInfoForm.receiveUser"
                    clearable
                    disabled
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="收件人联系电话"
                  :label-width="px2rem('120px')"
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
                <el-form-item label="收件人地址" prop="receiveAddress">
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
          <el-form-item label="快递状态" prop="expressStatus">
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
      <el-row v-if="problemFlag">
        <el-col :span="15">
          <el-form-item label="问题描述" prop="expressStatusRemark">
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
          <el-form-item label="快递内容" prop="expressContentList">
            <el-table
              :data="basicInfoForm.expressContentList"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              border
              row-key="id"
            >
              <el-table-column
                label="序号"
                prop="number"
                align="center"
                type="index"
              />
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
          <el-form-item label="备注" prop="expressContentRemark">
            <el-input
              v-model="basicInfoForm.expressContentRemark"
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
          <el-form-item label="附件" prop="otherInfoList">
            <div
              style="margin-bottom: 20px; cursor: pointer"
              @click="otherFileDownload"
            >
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
              <el-table-column
                label="序号"
                prop="number"
                align="center"
                type="selection"
              />
              <el-table-column label="文件名" prop="fileName" align="center" />
              <el-table-column label="上传用户" prop="creator" align="center" />
              <el-table-column
                label="上传时间"
                prop="createTime"
                align="center"
              />
              <el-table-column label="备注" prop="fileRemark" align="center" />
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
import { ref, reactive, Ref, watch, computed } from 'vue'
import type { ExpressDictItem, ExpressListItem, OtherFileList } from '@/api'
import fileDownload from 'js-file-download'
import { CommonAPI, ExpressAPI } from '@/api'
import {
  ElForm,
  ElFormItem,
  ElButton,
  ElDatePicker,
  ElTable,
  ElTableColumn,
  ElMessage
} from 'element-plus'
import { px2rem } from '@/utils'
const API = new ExpressAPI()
const CommonApi = new CommonAPI()
const dialogTitle = ref<string>('邮寄信息登记详情')
const dialogVisible = ref<boolean>(false)
const basicInfoForm = reactive<ExpressListItem>({
  id: '',
  expressNo: '',
  expressCompany: '',
  expressCompanyOther: '',
  expressStatus: 0,
  expressType: 0,
  sendTime: '',
  receiveTime: '',
  sendUser: '',
  sendPhone: '',
  sendAddress: '',
  receivePhone: '',
  receiveAddress: '',
  expressStatusRemark: '',
  receiveUser: '',
  expressContentRemark: '',
  creator: '',
  createTime: '',
  updater: '',
  updateTime: '',
  expressContentList: [],
  otherFileList: []
})
const selectData: Ref<OtherFileList[]> = ref([])
// 勾选数据
const selectionChangeHandler = (item: OtherFileList[]) => {
  selectData.value.splice(0, selectData.value.length)
  selectData.value.push(...item)
}
const selectIds = computed(() => {
  const ids: string[] = []
  selectData.value.forEach((item) => {
    if (item.fileCode) {
      ids.push(item.fileCode as string)
    }
  })
  return ids
})
// 获取邮寄信息
const getList = (id: string) => {
  const params = {
    expressNo: id
  }
  API.checkExpressInfo(params)
    .then((res) => {
      if (res && res.code === 200) {
        basicInfoForm.expressNo = res?.data?.expressNo
        basicInfoForm.expressCompany = res?.data?.expressCompany
        basicInfoForm.expressCompanyOther = res?.data?.expressCompanyOther
        basicInfoForm.expressStatus = res?.data?.expressStatus
        basicInfoForm.expressType = res?.data?.expressType
        basicInfoForm.sendTime = res?.data?.sendTime
        basicInfoForm.receiveTime = res?.data?.receiveTime
        basicInfoForm.sendUser = res?.data?.sendUser
        basicInfoForm.sendPhone = res?.data?.sendPhone
        basicInfoForm.sendAddress = res?.data?.sendAddress
        basicInfoForm.receivePhone = res?.data?.receivePhone
        basicInfoForm.receiveAddress = res?.data?.receiveAddress
        basicInfoForm.receiveUser = res?.data?.receiveUser
        basicInfoForm.expressStatusRemark = res?.data?.expressStatusRemark
        basicInfoForm.expressContentRemark = res?.data?.expressContentRemark
        basicInfoForm.creator = res?.data?.creator
        basicInfoForm.createTime = res?.data?.createTime
        basicInfoForm.updater = res?.data?.updater
        basicInfoForm.updateTime = res?.data?.updateTime
        basicInfoForm.expressContentList = res?.data?.expressContentList
      }
    })
    .catch((err: Error) => {
      throw err
    })
}
const expressCompanyOpts: Ref<ExpressDictItem[]> = ref([])
const expressTypeOpts: Ref<ExpressDictItem[]> = ref([])
const expressStatusOpts: Ref<ExpressDictItem[]> = ref([])
const getDicts = () => {
  expressCompanyOpts.value = JSON.parse(
    localStorage.getItem('EXPRESS_COMPANY') as string
  )
  expressTypeOpts.value = JSON.parse(
    localStorage.getItem('EXPRESS_TYPE') as string
  )
  expressTypeOpts.value.forEach((item) => {
    item.value = Number(item.value)
  })
  expressStatusOpts.value = JSON.parse(
    localStorage.getItem('EXPRESS_STATUS') as string
  )
  expressStatusOpts.value.forEach((item) => {
    item.value = Number(item.value)
  })
}
const getOtherContentList = (id: string) => {
  const params = {
    businessCategory: 'EXPRESS',
    businessSubCategory: 'INFO_OTHER',
    businessNoList: [],
    businessNo: id
  }
  CommonApi.getRelationList(params)
    .then((res) => {
      if (res && res.code === 200) {
        const data = res?.data || []
        data.forEach((item) => {
          basicInfoForm.otherFileList.push({
            fileCode: item.attachmentId,
            fileName: item.fileName,
            fileRemark: item.remark,
            creator: item.creator,
            createTime: item.createTime
          })
        })
      }
    })
    .catch((err: Error) => {
      console.log(err)
    })
}

const otherFileDownload = () => {
  if (!selectIds.value.length) {
    ElMessage({
      type: 'error',
      message: '请勾选要下载的内容'
    })
  } else {
    // const formData = new FormData()
    // formData.append('businessNo', basicInfoForm.expressNo as string)
    // formData.append('makeExcel', 'true')
    // formData.append('businessCategory', 'EXPRESS')
    // formData.append('businessSubcategory', 'INFO_OTHER')
    // formData.append('fileCodeList', selectIds.value as string)
    const params = {
      businessNo: basicInfoForm.expressNo,
      makeExcel: true,
      businessCategory: 'EXPRESS',
      businessSubcategory: 'INFO_OTHER',
      fileCodeList: selectIds.value
    }
    CommonApi.batchExport(params)
      .then((res) => {
        if (res) {
          ElMessage({
            type: 'success',
            message: '下载成功'
          })
          const fileStream = res?.data
          const fileName = '附件.zip'
          fileDownload(fileStream, fileName)
        }
      })
      .catch((err: Error) => {
        console.log(err)
      })
  }
}
const init = () => {
  basicInfoForm.id = ''
  basicInfoForm.expressNo = ''
  basicInfoForm.expressCompany = ''
  basicInfoForm.expressStatus = 0
  basicInfoForm.expressType = 0
  basicInfoForm.sendTime = ''
  basicInfoForm.receiveTime = ''
  basicInfoForm.sendUser = ''
  basicInfoForm.sendPhone = ''
  basicInfoForm.sendAddress = ''
  basicInfoForm.receivePhone = ''
  basicInfoForm.receiveAddress = ''
  basicInfoForm.expressStatusRemark = ''
  basicInfoForm.receiveUser = ''
  basicInfoForm.expressContentRemark = ''
  basicInfoForm.creator = ''
  basicInfoForm.createTime = ''
  basicInfoForm.updater = ''
  basicInfoForm.updateTime = ''
  basicInfoForm.expressContentList = []
  basicInfoForm.otherFileList = []
}
/** 打开弹窗 */
const open = async (id: string) => {
  dialogVisible.value = true
  init()
  getList(id)
  await getDicts()
  await getOtherContentList(id)
}

defineExpose({ open })
const expressStatusFlag = ref(true)
watch(
  () => basicInfoForm.expressType,
  (val) => {
    if (val === 0) {
      expressStatusFlag.value = false
    } else if (val === 1) {
      expressStatusFlag.value = true
    }
  },
  {
    immediate: true
  }
)
const expressCompanyFlag = ref(true)
watch(
  () => basicInfoForm.expressCompany,
  (val) => {
    if (val === '其他') {
      expressCompanyFlag.value = true
    } else {
      expressCompanyFlag.value = false
    }
  },
  {
    immediate: true
  }
)
const problemFlag = ref(false)
watch(
  () => basicInfoForm.expressStatus,
  (val) => {
    if (val === 2) {
      problemFlag.value = true
    } else {
      problemFlag.value = false
    }
  },
  {
    immediate: true
  }
)
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

<template>
  <el-dialog
    width="80%"
    :title="title"
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
          <el-form-item
            label="快递单号"
            prop="expressNo"
            :rules="[
              { required: true, message: '快递单号不能为空', trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="basicInfoForm.expressNo"
              clearable
              :disabled="disFlag"
              placeholder="请输入快递单号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item
            class="express-com"
            label="快递公司"
            prop="expressCompany"
            :rules="[{ required: true, message: '快递公司不能为空' }]"
          >
            <el-select
              v-model="basicInfoForm.expressCompany"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="(item, index) in dictStore.dicts.EXPRESS_COMPANY"
                :key="index"
                :label="item.label"
                :value="(item.label as string)"
              />
            </el-select>
            <el-form-item v-if="expressCompanyFlag" prop="expressCompanyOther">
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
            label="寄送/接收"
            prop="expressType"
            :rules="[{ required: true, message: '寄送/接收不能为空' }]"
          >
            <el-select
              v-model="basicInfoForm.expressType"
              style="width: 100%"
              clearable
              placeholder="请选择寄送/接收"
            >
              <el-option
                v-for="(item, index) in dictStore.dicts.EXPRESS_TYPE"
                :key="index"
                :label="item.label"
                :value="Number(item.value)"
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
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item v-else label="寄件日期" prop="sendTime">
            <el-date-picker
              v-model="basicInfoForm.sendTime"
              type="date"
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
                <el-form-item
                  label="寄件人名称"
                  prop="sendUser"
                  :rules="[
                    {
                      required: expressStatusFlag,
                      message: '寄件人名称不能为空',
                      trigger: 'blur'
                    },
                    {
                      max: 200,
                      message: '内容超长',
                      trigger: 'change'
                    }
                  ]"
                >
                  <el-autocomplete
                    v-model="basicInfoForm.sendUser"
                    :fetch-suggestions="queryContractsSearch"
                    :trigger-on-focus="false"
                    clearable
                    placeholder="请输入寄件人名称"
                    @select="handleSelect"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="寄件人联系电话"
                  :label-width="px2rem('120px')"
                  prop="sendPhone"
                  :rules="[
                    {
                      message: '请输入正确的联系电话',
                      type: 'string',
                      pattern: /^1[3456789]\d{9}$/,
                      trigger: ['change', 'blur']
                    }
                  ]"
                >
                  <el-autocomplete
                    v-model="basicInfoForm.sendPhone"
                    :fetch-suggestions="queryContractsSearchByPhone"
                    :trigger-on-focus="false"
                    clearable
                    placeholder="请输入寄件人联系电话"
                    @select="handleSelect"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="18">
                <el-form-item
                  label="寄件人地址"
                  prop="sendAddress"
                  :rules="[
                    {
                      max: 200,
                      message: '内容超长',
                      trigger: 'change'
                    }
                  ]"
                >
                  <el-input
                    v-model="basicInfoForm.sendAddress"
                    clearable
                    placeholder="请输入寄件人地址"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button
                  type="primary"
                  @click="
                    addAddressHandler(
                      basicInfoForm.sendUser,
                      basicInfoForm.sendPhone,
                      basicInfoForm.sendAddress,
                      'sendPhone'
                    )
                  "
                  >设为常用地址</el-button
                >
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
                <el-form-item
                  label="收件人名称"
                  prop="receiveUser"
                  :rules="[
                    {
                      required: !expressStatusFlag,
                      message: '收件人名称不能为空',
                      trigger: 'blur'
                    },
                    {
                      max: 200,
                      message: '内容超长',
                      trigger: 'change'
                    }
                  ]"
                >
                  <el-autocomplete
                    v-model="basicInfoForm.receiveUser"
                    :fetch-suggestions="queryContractsSearch"
                    :trigger-on-focus="false"
                    clearable
                    placeholder="请输入收件人名称"
                    @select="handleSelectRe"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="收件人联系电话"
                  :label-width="px2rem('120px')"
                  prop="receivePhone"
                  :rules="[
                    {
                      message: '请输入正确的联系电话',
                      type: 'string',
                      pattern: /^1[3456789]\d{9}$/,
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-autocomplete
                    v-model="basicInfoForm.receivePhone"
                    :fetch-suggestions="queryContractsSearchByPhone"
                    :trigger-on-focus="false"
                    clearable
                    placeholder="请输入收件人联系电话"
                    @select="handleSelectRe"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="18">
                <el-form-item
                  label="收件人地址"
                  prop="receiveAddress"
                  :rules="[
                    {
                      max: 200,
                      message: '内容超长',
                      trigger: 'change'
                    }
                  ]"
                >
                  <el-input
                    v-model="basicInfoForm.receiveAddress"
                    clearable
                    placeholder="请输入收件人地址"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button
                  type="primary"
                  @click="
                    addAddressHandler(
                      basicInfoForm.receiveUser,
                      basicInfoForm.receivePhone,
                      basicInfoForm.receiveAddress,
                      'receivePhone'
                    )
                  "
                  >设为常用地址</el-button
                >
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <el-row style="margin-top: 20px">
        <el-col :span="5">
          <el-form-item
            label="快递状态"
            prop="expressStatus"
            :rules="[{ required: true, message: '快递状态不能为空' }]"
          >
            <el-select
              v-model="basicInfoForm.expressStatus"
              style="width: 100%"
              clearable
              placeholder="请选择快递状态"
            >
              <el-option
                v-for="(item, index) in dictStore.dicts.EXPRESS_STATUS"
                :key="index"
                :label="item.label"
                :value="Number(item.value)"
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
          <el-button type="primary" @click="importContent">导入</el-button>
          <el-button type="primary" @click="addExpressHandler">新增</el-button>
        </div>
      </div>

      <el-row :gutter="20">
        <el-col>
          <el-form-item label="快递内容" prop="expressContentList">
            <el-table
              :data="basicInfoForm.expressContentList"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              border
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
                show-overflow-tooltip
              />
              <el-table-column
                label="关联合同号"
                prop="contractNo"
                align="center"
              />

              <el-table-column label="操作" fixed="right" align="center">
                <template #default="scope">
                  <el-button
                    link
                    type="primary"
                    @click="editExpressHandler(scope.row)"
                  >
                    编辑
                  </el-button>
                  <el-button
                    link
                    type="danger"
                    @click="delExpressHandler(scope.row.contentNo)"
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
          <el-form-item
            label="备注"
            prop="expressContentRemark"
            :rules="[
              {
                max: 200,
                message: '内容超长',
                trigger: 'change'
              }
            ]"
          >
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
          <el-form-item label="附件" prop="otherInfoList">
            <div style="margin-bottom: 20px">
              <el-button type="primary" @click="importOtherFile"
                >上传</el-button
              >
            </div>
            <el-table
              :data="basicInfoForm.otherFileList"
              :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
              border
              :max-height="px2rem('320px')"
            >
              <el-table-column
                label="序号"
                prop="number"
                align="center"
                type="index"
              />
              <el-table-column
                label="文件名"
                prop="fileName"
                align="center"
                show-overflow-tooltip
              />
              <el-table-column
                label="上传用户"
                prop="creatorName"
                align="center"
              />
              <el-table-column
                label="上传时间"
                prop="createTime"
                align="center"
              />
              <el-table-column label="备注" prop="fileRemark" align="center">
                <template #default="scope">
                  <el-input
                    v-model="scope.row.fileRemark"
                    clearable
                    placeholder="请输入备注"
                    @input="limitWords"
                  />
                </template>
              </el-table-column>

              <el-table-column label="操作" fixed="right" align="center">
                <template #default="scope">
                  <el-button
                    link
                    type="danger"
                    @click="delOtherFile(scope.row.fileCode)"
                  >
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
      <el-button type="primary" @click="updateHandler" :loading="btnLoading">
        保 存
      </el-button>
      <el-button type="primary" @click="dialogVisible = false">
        关 闭
      </el-button>
    </template>
    <EditExpressForm
      ref="editExpressFormRef"
      :title="dialogExpressTitle"
      @editcontent="updateExpressHandler"
    />
    <ImportContent ref="importContentRef" @importcontent="imContent" />
    <ImportOtherFile ref="importOtherFileRef" @otherfileinfo="getFileInfo" />
  </el-dialog>
</template>

<script setup lang="ts">
import EditExpressForm from './components/EditExpressForm.vue'
import ImportContent from './components/ImportContent.vue'
import ImportOtherFile from './components/ImportOtherFile.vue'
import { Delete } from '@element-plus/icons-vue'
import { useDictStore } from '@/store/dict'
import type {
  ExpressListItem,
  ExpressContentList,
  OtherFileList,
  UsualAddressListItem,
  PageRequest,
  ExpressInfoCardListRequest
} from '@/api'
import { px2rem } from '@/utils'
import { ElMessageBox, ElMessage, ElForm, dayjs } from 'element-plus'
import type { AutocompleteFetchSuggestionsCallback } from 'element-plus'
import { ref, reactive, watch } from 'vue'
import { CommonAPI, ExpressAPI } from '@/api'
import { useUserStore } from '@toystory/lotso'
const API = new ExpressAPI()
const CommonApi = new CommonAPI()
const dictStore = useDictStore()
const dialogExpressTitle = ref<string>('')
const dialogVisible = ref<boolean>(false)
const disFlag = ref<boolean>(false)
const basicInfoFormRef = ref<InstanceType<typeof ElForm>>()
type QueryParams = ExpressInfoCardListRequest & PageRequest
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
const basicInfoForm = reactive<ExpressListItem>({
  id: '',
  expressNo: '',
  expressCompany: '顺丰',
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
const commonContracts = ref<UsualAddressListItem[]>([])
let timeout: ReturnType<typeof setTimeout>
const queryContractsSearch = (
  queryString: string,
  cb: AutocompleteFetchSuggestionsCallback
) => {
  const params = {
    userName: queryString
  }
  API.getUsualAddressList(params)
    .then((res) => {
      if (res && res.code === 200) {
        commonContracts.value = res?.data?.list || []
        commonContracts.value.forEach((item) => {
          item.value = '常用联系-' + item.userName + '-' + item.userPhone
        })
        const results = queryString
          ? commonContracts.value.filter(createFilter(queryString))
          : commonContracts.value
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          cb(results)
        }, 2000 * Math.random())
      }
    })
    .catch((err: Error) => {
      console.log(err)
    })
}
const queryContractsSearchByPhone = (
  queryString: string,
  cb: AutocompleteFetchSuggestionsCallback
) => {
  const params = {
    userPhone: queryString
  }
  API.getUsualAddressList(params)
    .then((res) => {
      if (res && res.code === 200) {
        commonContracts.value = res?.data?.list || []
        commonContracts.value.forEach((item) => {
          item.value = '常用联系-' + item.userName + '-' + item.userPhone
        })
        const results = queryString
          ? commonContracts.value.filter(createFilter(queryString))
          : commonContracts.value
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          cb(results)
        }, 2000 * Math.random())
      }
    })
    .catch((err: Error) => {
      console.log(err)
    })
}
const createFilter = (queryString: string) => {
  return (res: UsualAddressListItem) => {
    return res.value.indexOf(queryString) !== -1
  }
}
const handleSelect = (item: Record<string, undefined>) => {
  basicInfoForm.sendUser = item.userName
  basicInfoForm.sendPhone = item.userPhone
  basicInfoForm.sendAddress = item.userAddress
}
const handleSelectRe = (item: Record<string, undefined>) => {
  basicInfoForm.receiveUser = item.userName
  basicInfoForm.receivePhone = item.userPhone
  basicInfoForm.receiveAddress = item.userAddress
}

const addAddressHandler = async (
  user?: string,
  phone?: string,
  address?: string,
  type?: string
) => {
  if (!basicInfoFormRef.value) return
  const valid = await basicInfoFormRef.value.validateField(type)
  if (!valid) return
  if (!user || !phone || !address) {
    ElMessage({
      type: 'error',
      message: '请填写信息'
    })
    return
  }
  const params = {
    userName: user,
    userPhone: phone,
    userAddress: address,
    userMail: ''
  }
  API.addUsualAddress(params)
    .then((res) => {
      if (res && res.code === 200) {
        ElMessage({
          type: 'success',
          message: '添加成功'
        })
      }
    })
    .catch((err: Error) => {
      console.log(err)
    })
}

// 新增编辑快递内容弹窗
const editExpressFormRef = ref()
const editExpressHandler = (row: ExpressContentList) => {
  dialogExpressTitle.value = '编辑快递内容'
  editExpressFormRef.value.open(row)
}
const addExpressHandler = () => {
  if (!basicInfoForm.expressNo) {
    ElMessage({
      type: 'error',
      message: '请先填写快递单号'
    })
  } else {
    dialogExpressTitle.value = '新增快递内容'
    editExpressFormRef.value.open(basicInfoForm.expressNo)
  }
}

// 删除快递内容
const delExpressHandler = (contentNo: string) => {
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      const index = basicInfoForm.expressContentList!.findIndex(
        (item) => item.contentNo === contentNo
      )
      if (index !== -1) {
        basicInfoForm.expressContentList!.splice(index, 1)
      }
    })
    .catch((err: Error) => {
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
      throw err
    })
}

const updateExpressHandler = (val: ExpressContentList) => {
  if (val) {
    const index = basicInfoForm.expressContentList!.findIndex(
      (item) => item.contentNo === val.contentNo
    )
    if (index !== -1) {
      basicInfoForm.expressContentList!.splice(index, 1, val)
    } else {
      basicInfoForm.expressContentList!.push(val)
    }
  }
}
const getOtherContentList = () => {
  const params = {
    businessCategory: 'EXPRESS',
    businessSubCategory: 'INFO_OTHER',
    businessNoList: [],
    businessNo: basicInfoForm.expressNo
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
            creatorName: item.creatorName,
            createTime: item.createTime
          })
        })
      }
    })
    .catch((err: Error) => {
      console.log(err)
    })
}
/** 打开弹窗 */
const open = async (row?: ExpressListItem) => {
  dialogVisible.value = true
  init(row)
}
const limitWords = (val: string) => {
  if (val.length > 200) {
    ElMessage({
      type: 'error',
      message: '内容超长'
    })
  }
}
const init = (row?: ExpressListItem) => {
  if (row) {
    disFlag.value = true
    const data = JSON.parse(JSON.stringify(row))
    basicInfoForm.id = data.id
    basicInfoForm.expressNo = data.expressNo
    basicInfoForm.expressCompany = data.expressCompany
    basicInfoForm.expressCompanyOther = data.expressCompanyOther
    basicInfoForm.expressStatus = data.expressStatus
    basicInfoForm.expressType = data.expressType
    basicInfoForm.sendTime = data.sendTime
    basicInfoForm.receiveTime = data.receiveTime
    basicInfoForm.sendUser = data.sendUser
    basicInfoForm.sendPhone = data.sendPhone
    basicInfoForm.sendAddress = data.sendAddress
    basicInfoForm.receivePhone = data.receivePhone
    basicInfoForm.receiveAddress = data.receiveAddress
    basicInfoForm.expressStatusRemark = data.expressStatusRemark
    basicInfoForm.receiveUser = data.receiveUser
    basicInfoForm.expressContentRemark = data.expressContentRemark
    basicInfoForm.creator = data.creator
    basicInfoForm.createTime = data.createTime
    basicInfoForm.updater = data.updater
    basicInfoForm.updateTime = data.updateTime
    basicInfoForm.expressContentList = data.expressContentList || []
    basicInfoForm.otherFileList = data.otherFileList || []
    getOtherContentList()
  } else {
    disFlag.value = false
    basicInfoForm.id = ''
    basicInfoForm.expressNo = ''
    basicInfoForm.expressCompany = '顺丰'
    basicInfoForm.expressCompanyOther = ''
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
}

defineExpose({ open })
const emit = defineEmits(['success'])
const btnLoading = ref<boolean>(false)
const updateHandler = async () => {
  // 校验
  if (!basicInfoFormRef.value) return
  const valid = await basicInfoFormRef.value.validate()
  if (!valid) return
  basicInfoForm.sendTime = basicInfoForm.sendTime
    ? basicInfoForm.sendTime.slice(0, 10)
    : ''
  basicInfoForm.receiveTime = basicInfoForm.receiveTime
    ? basicInfoForm.receiveTime.slice(0, 10)
    : ''
  btnLoading.value = true
  if (!basicInfoForm.expressContentList?.length) {
    ElMessage({
      type: 'error',
      message: '快递内容不能为空'
    })
  } else {
    if (props.title === '新增邮寄信息') {
      const preParams: QueryParams = {
        pageNo: 1,
        pageSize: 10,
        expressNo: basicInfoForm.expressNo as string,
        expressCompany: '',
        createTime: '',
        expressType: '',
        expressContent: '',
        expressContentRemark: ''
      }
      API.getExpressInfoCardList(preParams)
        .then((res) => {
          if (res && res.code === 200 && res.data?.list.length !== 0) {
            ElMessage({
              type: 'error',
              message: '快递单号已存在'
            })
          } else {
            const params = basicInfoForm
            API.addExpressInfo(params)
              .then((res) => {
                if (res && res.code === 200) {
                  ElMessage({
                    type: 'success',
                    message: '新增成功'
                  })
                  btnLoading.value = false
                  dialogVisible.value = false
                  emit('success')
                }
              })
              .catch((err: Error) => {
                btnLoading.value = false
                console.log(err)
              })
          }
        })
        .catch((err: Error) => {
          console.log(err)
        })
    } else {
      const params = basicInfoForm
      API.editExpressInfo(params)
        .then((res) => {
          if (res && res.code === 200) {
            ElMessage({
              type: 'success',
              message: '修改成功'
            })
            btnLoading.value = false
            dialogVisible.value = false
            emit('success')
          }
        })
        .catch((err: Error) => {
          btnLoading.value = false
          console.log(err)
        })
    }
  }
}
const importContentRef = ref()
const importContent = () => {
  importContentRef.value.open(basicInfoForm.expressNo)
}
// 导入快递内容数据回显
const imContent = (params: ExpressContentList[]) => {
  // basicInfoForm.expressContentList?.push([...params])
  params.forEach((item) => {
    basicInfoForm.expressContentList?.push({
      contentNo: item.contentNo,
      contentType: item.contentType,
      contentTypeNumber: item.contentTypeNumber
    })
  })
}
// 导入上传附件数据回显
const getFileInfo = (params: OtherFileList[]) => {
  const userStore = useUserStore()
  const user = userStore.userInfo?.staffName as string
  console.error(params)
  if (params && params.length) {
    params.forEach((item) => {
      basicInfoForm.otherFileList.push({
        fileCode: item.fileCode,
        fileName: item.fileName,
        fileRemark: '',
        creatorName: user,
        createTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    })
  }
}
// 删除附件信息
const delOtherFile = (code: string) => {
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      const index = basicInfoForm.otherFileList.findIndex(
        (item) => item.fileCode === code
      )
      if (index !== -1) {
        basicInfoForm.otherFileList.splice(index, 1)
      }
    })
    .catch((err: Error) => {
      ElMessage({
        type: 'error',
        message: '删除失败'
      })
      throw err
    })
}

const importOtherFileRef = ref()
const importOtherFile = () => {
  importOtherFileRef.value.open()
}

const expressStatusFlag = ref(true)
// const requiredMes = ref()
watch(
  () => basicInfoForm.expressType,
  (val) => {
    if (val === 0) {
      expressStatusFlag.value = false
      basicInfoFormRef.value?.clearValidate('sendUser')
    } else if (val === 1) {
      expressStatusFlag.value = true
      basicInfoFormRef.value?.clearValidate('receiveUser')
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

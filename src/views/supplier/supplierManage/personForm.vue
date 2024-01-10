<template>
  <el-dialog
    class="edit-supplier-dialog"
    v-model="dialogVisible"
    :title="dialogTitle"
    width="400px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
  >
    <el-form :model="basicInfoForm" label-width="120px" label-position="top">
      <el-form-item label="城市" prop="proandcity">
        <el-cascader
          ref="cascader"
          v-model="basicInfoForm.proandcity"
          clearable
          :props="props"
          :options="casOption"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="联系人" prop="contactsName">
        <el-input
          placeholder="请输入联系人"
          v-model="basicInfoForm.contactsName"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input
          placeholder="请输入联系电话"
          v-model="basicInfoForm.phone"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="addHandler"> 确 定 </el-button>
      <el-button type="primary" @click="dialogVisible = false">
        取 消
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, Ref } from 'vue'
import { CommonAPI, SupplierAPI } from '@/api'
import { ElForm, ElMessage } from 'element-plus'
import type { CascaderProps, CascaderOption } from 'element-plus'
const CommonApi = new CommonAPI()
const API = new SupplierAPI()
const dialogVisible = ref<boolean>(false)
const basicInfoForm = reactive({
  id: '',
  supplierId: '',
  provinceCode: 0,
  provinceName: '',
  cityCode: 0,
  cityName: '',
  contactsName: '',
  phone: '',
  proandcity: []
})

interface OptionsItem {
  value?: string
  label?: string
  leaf: boolean
}
const casOption = ref<OptionsItem[]>([])
const cascader = ref()
const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const nodes: CascaderOption[] = [] // 动态节点
    const { level } = node
    if (level === 0) {
      const resParent = await CommonApi.getAllProvinces()
      if (resParent && resParent?.data) {
        resParent?.data.map((item) => {
          const area = {
            value: item.code,
            label: item.name,
            leaf: level >= 1
          }
          nodes.push(area)
        })
      }
    } else {
      const params = {
        code: node.value as number
      }
      const res = await CommonApi.getProvincesChildren(params)
      if (res && res.data) {
        res?.data.map((item) => {
          const area = {
            value: item.code,
            label: item.name,
            leaf: level >= 1
          }
          nodes.push(area)
        })
      }
    }
    resolve(nodes) // 回调
  }
}
const initOptions = async () => {
  casOption.value = []
  const resParent = await CommonApi.getAllProvinces()
  if (resParent && resParent?.data) {
    resParent?.data.map(async (item) => {
      const children: OptionsItem[] = []
      if (item.code === Number(basicInfoForm.provinceCode)) {
        const params = {
          code: Number(basicInfoForm.provinceCode)
        }
        const res = await CommonApi.getProvincesChildren(params)
        if (res && res.data) {
          res?.data.map((item) => {
            const area = {
              value: String(item.code),
              label: item.name,
              leaf: true
            }
            children.push(area)
          })
        }
      }
      const resArea = {
        value: String(item.code),
        label: item.name,
        children: children,
        leaf: false
      }
      casOption.value.push(resArea)
    })
  }
}
/** 打开弹窗 */
const dialogTitle: Ref<string> = ref('新增城市联系人')
const open = async (row?: string, no?: string) => {
  dialogTitle.value = no === 'sid' ? '新增城市联系人' : '编辑城市联系人'
  dialogVisible.value = true
  if (no === 'sid') {
    basicInfoForm.supplierId = row
    basicInfoForm.provinceCode = 0
    basicInfoForm.provinceName = ''
    basicInfoForm.cityCode = 0
    basicInfoForm.cityName = ''
    basicInfoForm.contactsName = ''
    basicInfoForm.phone = ''
    basicInfoForm.proandcity = []
    await initOptions()
  } else {
    const data = JSON.parse(JSON.stringify(row))
    basicInfoForm.id = data.id
    basicInfoForm.provinceCode = data.provinceCode
    basicInfoForm.provinceName = data.provinceName
    basicInfoForm.cityCode = data.cityCode
    basicInfoForm.cityName = data.cityName
    basicInfoForm.contactsName = data.contactsName
    basicInfoForm.phone = data.phone
    basicInfoForm.proandcity = data.proandcity || []
  }
}
const emit = defineEmits(['success'])
const addHandler = () => {
  basicInfoForm.provinceCode = basicInfoForm.proandcity[0]
  basicInfoForm.cityCode = basicInfoForm.proandcity[1]
  basicInfoForm.provinceName =
    cascader.value.getCheckedNodes()[0].pathLabels[0] || ''
  basicInfoForm.cityName =
    cascader.value.getCheckedNodes()[0].pathLabels[1] || ''
  if (dialogTitle.value === '新增城市联系人') {
    const params = {
      supplierId: basicInfoForm.supplierId,
      provinceCode: basicInfoForm.provinceCode,
      provinceName: basicInfoForm.provinceName,
      cityCode: basicInfoForm.cityCode,
      cityName: basicInfoForm.cityName,
      contactsName: basicInfoForm.contactsName,
      phone: basicInfoForm.phone,
    }
    API.addCityContacts(params)
      .then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '新增成功'
          })
          dialogVisible.value = false
          emit('success')
        }
      })
      .catch((err: Error) => {
        throw err
      })
  } else {
    const params = {
      provinceCode: basicInfoForm.provinceCode,
      provinceName: basicInfoForm.provinceName,
      cityCode: basicInfoForm.cityCode,
      cityName: basicInfoForm.cityName,
      contactsName: basicInfoForm.contactsName,
      phone: basicInfoForm.phone,
      id: basicInfoForm.id
    }
    API.editCityContacts(params)
      .then((res) => {
        if (res && res.code === 200) {
          ElMessage({
            type: 'success',
            message: '修改成功'
          })
          dialogVisible.value = false
          emit('success')
        }
      })
      .catch((err: Error) => {
        throw err
      })
  }
}
defineExpose({ open })
</script>

<style scope lang="scss"></style>

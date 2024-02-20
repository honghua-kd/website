<template>
  <div class="material-detail">
    <SecondaryTitle title="操作记录">
      <template #more>
        <el-button type="primary" link @click="openDrawer"
          >操作记录详情</el-button
        ></template
      >
    </SecondaryTitle>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in activities" :key="index">
          <template #default>
            <div>
              <p>{{ activity.person }}</p>
              <p>{{ activity.content }}</p>
              <p>{{ activity.img }}</p>
              <TableField
                v-if="index === 3"
                :data="tableData"
                :loading="tableLoading"
                :columns="operatingTableConfig"
                :height="200"
                :setColumnEnable="false"
                name="peratingTable"
              >
              </TableField>
            </div>
          </template>
        </el-timeline-item>
      </el-timeline>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import SecondaryTitle from '@/components/SecondaryTitle/index.vue'
import TableField from '@/components/TableField/index.vue'
import { operatingTableConfig } from './data'
import { operatingTableType } from './type'
import { ref } from 'vue'

const drawer = ref(false)
const activities = [
  {
    person: '姜领    2023-12-12  12:21',
    content: '转派给 恒运-业务运营部-102345张三',
    img: ''
  },
  {
    person: '姜领    2023-12-12  12:21',
    content: '发起抵押材料申请'
  },
  {
    person: '姜领    2023-12-12  12:21',
    content: '发起委托业务运营办理抵押'
  },
  {
    person: '姜领    2023-12-12  12:2',
    content: '修改补充信息'
  }
]
const tableData = ref<operatingTableType[]>([])
const tableLoading = ref(false)
// 操作记录详情
const openDrawer = () => {
  drawer.value = true
  tableData.value = [
    {
      id: 1,
      Fileds: '车牌号',
      beforeUpdate: '沪df235',
      update: '沪df234'
    },
    {
      id: 2,
      Fileds: '车号',
      beforeUpdate: '沪d23f5',
      update: '沪df234'
    },
    {
      id: 3,
      Fileds: '车号',
      beforeUpdate: '沪d23f5',
      update: '沪df234'
    }
  ]
}
</script>

<style lang="scss" scoped></style>

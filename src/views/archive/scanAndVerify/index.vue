<template>
  <div>
    <SecondaryTitle title="核验车辆登记证" />
    <!-- 搜索工作栏 -->
    <el-card>
      <el-form ref="queryFormRef" :model="queryParams">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="核验时间:"></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建人"></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="核对结果"></el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="批次号"></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发动机号"></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发动机型号"></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="归档状态"></el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="合同号"></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车牌号"></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车架号"></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办事处"></el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="挂靠商"></el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="渠道商"></el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 表格 -->
  </div>
</template>

<script setup lang="ts">
import SecondaryTitle from '@/components/SecondaryTitle/index.vue'
import { ref, reactive } from 'vue'
import { ElForm } from 'element-plus'

const queryFormRef = ref<InstanceType<typeof ElForm>>()

const queryParams = reactive({})
</script>

<style lang="scss" scoped></style>

<template>
  <div class="build-content">
    <el-empty :image="Building" :image-size="300">
      <template #description>
        <span class="desc">功能全力建设中。。。</span>
      </template>
    </el-empty>
  </div>
</template>

<script lang="ts" setup>
import Building from '@/assets/common/building.png'
</script>

<style lang="scss">
.desc {
  font-size: 20px;
  color: #909399;
}
</style>

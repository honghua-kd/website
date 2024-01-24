<template>
  <div class="build-content">
    <el-empty :image="Building" :image-size="500">
      <template #description>
        <p class="desc">功能全力建设中，敬请期待~</p>
      </template>
    </el-empty>
  </div>
</template>

<script lang="ts" setup>
import Building from '@/assets/common/building.gif'
</script>

<style lang="scss">
.build-content {
  display: flex;
  justify-content: center;
  .desc {
    padding-top: 60px;
    font-size: 24px;
    color: #666666;
  }
}
</style>

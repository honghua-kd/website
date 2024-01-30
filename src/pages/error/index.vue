<template>
  <div class="page-exception">
    <div class="exception-text">{{ exceptionText }}</div>
    <img
      v-if="exceptionType === '403'"
      src="@/assets/error/403.png"
      alt=""
      class="exception-img"
    />
    <img
      v-if="exceptionType === '404'"
      src="@/assets/error/404.png"
      alt=""
      class="exception-img"
    />
    <img
      v-if="exceptionType === '500'"
      src="@/assets/error/500.png"
      alt=""
      class="exception-img"
    />
    <el-button
      v-if="hasPermission"
      class="pay-custom-btn exception-btn"
      primary
      @click="goHome"
    >
      返回首页
    </el-button>
    <el-button
      v-else
      class="pay-custom-btn exception-btn"
      primary
      @click="goLogin"
    >
      返回登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, Ref } from 'vue'
import type { LocationQueryValue } from 'vue-router'
import { useRouter, useRoute } from '@toystory/lotso'
import { CoreAPI } from '@/api/core'

const API = new CoreAPI()

const { router } = useRouter()
const route = useRoute()

const exceptionText = ref('服务器开小差了，请稍后再试')
const exceptionType: Ref<string | LocationQueryValue[]> = ref('500')

onMounted(() => {
  const type = route?.value.query?.type
  exceptionType.value = type || '500'
  if (type === '404') {
    exceptionText.value = '抱歉，您访问的页面不存在'
  }
  if (type === '403') {
    exceptionText.value = '抱歉，您没有权限访问该页面'
  }
  if (type === '500') {
    exceptionText.value = '服务器开小差了，请稍后再试'
  }
})

const hasPermission = computed(() => {
  const permissionData = {}
  // store.getters['user/permissions'] ||
  if (permissionData && Object.keys(permissionData).length) {
    return true
  } else {
    return false
  }
})

const goLogin = () => {
  API.logout()
    .then(() => {
      // SSO跳转
      window.location.href = `${
        import.meta.env.VITE_APP_SSO_URL
      }?redirect_url=${window.location.origin}`
    })
    .catch((err) => {
      console.error(err)
    })
}

const goHome = () => {
  router.replace('/')
}
</script>
<style lang="scss" scoped>
.page-exception {
  display: flex;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
  .exception-text {
    margin-top: 130px;
    font-size: 24px;
    text-align: center;
    color: #333333;
  }
  .exception-img {
    margin-top: 40px;
    width: 560px;
  }
  .exception-btn {
    margin-top: 88px;
  }
}
</style>

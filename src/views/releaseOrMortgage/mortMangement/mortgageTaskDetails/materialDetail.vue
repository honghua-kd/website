<template>
  <div class="material-detail" id="materialDetail">
    <SecondaryTitle title="材料明细" />
    <div class="wrap">
      <div class="title">登记证书 │ 已归档 2023-12-23</div>
      <div class="top-table">
        <el-carousel
          class="carousel"
          height="150px"
          arrow="never"
          indicator-position="outside"
          trigger="click"
        >
          <el-carousel-item v-for="(item, index) in images" :key="index">
            <div
              class="carousel-container"
              style="position: relative; width: 100%"
              @mouseover="handleMouseOver(index)"
              @mouseleave="handleMouseLeave"
            >
              <img style="width: 100%" :src="item.url" alt="轮播图片" />
              <div class="carousel-mask" v-show="currentHoverIndex === index">
                <div class="carousel-buttons">
                  <span
                    class="item-preview"
                    @click.prevent="previewImage(item.url)"
                  >
                    <el-icon><ZoomIn /></el-icon>
                  </span>
                  <span
                    class="item-delete"
                    @click.prevent="downloadFile(item.url, '登记证书')"
                  >
                    <el-icon><Download /></el-icon>
                  </span>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="container">
          <TableField
            :data="firstTableData"
            :loading="firstTableLoading"
            :columns="MaterialDetailTableConfig"
            :height="150"
            v-if="firstTableData.length > 0"
            name="firstTable"
          >
            <template #action="scope">
              <el-button
                link
                type="primary"
                @click="handleDetails(scope.row.id)"
                >详情</el-button
              >
            </template>
          </TableField>
          <el-empty
            style="padding: 0"
            v-else
            description="暂无数据"
            :image-size="100"
          />
        </div>
      </div>
      <div class="title">抵押材料</div>
      <TableField
        :data="secondTableData"
        :loading="secondTableLoading"
        :columns="MaterialDetailSecondTableConfig"
        :height="200"
        :setColumnEnable="false"
        name="secondTable"
      >
        <template #action="scope">
          <el-button link type="primary" @click="handleDetails(scope.row.id)"
            >详情</el-button
          >
        </template>
      </TableField>
    </div>
    <el-dialog v-model="dialogVisible">
      <img
        w-full
        style="width: 100%"
        :src="dialogImageUrl"
        alt="Preview Image"
      />
    </el-dialog>
    <div class="bottom-line"></div>
  </div>
</template>

<script setup lang="ts">
import SecondaryTitle from '@/components/SecondaryTitle/index.vue'
import { ref, onMounted, reactive } from 'vue'
import {
  MaterialDetailTableConfig,
  MaterialDetailSecondTableConfig
} from './data'
import { SupplierAPI } from '@/api'
import type { firstTableDataType, secondTableDataType } from './type'
import TableField from '@/components/TableField/index.vue'
import { downloadFile } from '@/utils/index'
import { ZoomIn, Download } from '@element-plus/icons-vue'

const API = new SupplierAPI()
let firstTableData = reactive<firstTableDataType[]>([])
let secondTableData = reactive<secondTableDataType[]>([])
const firstTableLoading = ref(false)
const secondTableLoading = ref(false)
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const queryFormList = reactive({
  pageNo: 1,
  pageSize: 10
})
const images = ref([
  {
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  },
  {
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  }
])

const currentHoverIndex = ref(-1)

// 鼠标悬停事件处理函数
const handleMouseOver = (index: number) => {
  currentHoverIndex.value = index
}

// 鼠标离开事件处理函数
const handleMouseLeave = () => {
  currentHoverIndex.value = -1
}

onMounted(() => {
  getList()
})
// 获取列表数据
const getList = async () => {
  firstTableLoading.value = true
  secondTableLoading.value = true
  await API.getSupplierList(queryFormList)
    .then((res) => {
      if (res && res.code === 200) {
        secondTableData || [].splice(0, secondTableData || [].length)
        const list: secondTableDataType[] = (res?.data?.list || []).map(
          (i) => ({
            supplierName: i.supplierName,
            supplierTypeName: i.supplierTypeName,
            coverArea: i.coverArea,
            contactName: i.contactName,
            phone: i.phone,
            uid: i.phone,
            list: i.phone,
            belongCompanyName: i.phone,
            startTime: i.phone,
            endTime: i.phone,
            status: i.phone,
            time: i.phone,
            adress: i.phone,
            name: i.phone,
            mailingStatus: i.phone,
            mailingTime: i.phone
          })
        )
        const firstList: firstTableDataType[] = (res?.data?.list || []).map(
          (i) => ({
            supplierName: i.supplierName,
            supplierTypeName: i.supplierTypeName,
            coverArea: i.coverArea,
            contactName: i.contactName,
            phone: i.phone,
            uid: i.phone,
            list: i.phone,
            belongCompanyName: i.phone,
            startTime: i.phone,
            endTime: i.phone,
            status: i.phone,
            time: i.phone,
            adress: i.phone,
            name: i.phone,
            mailingStatus: i.phone,
            mailingTime: i.phone
          })
        )
        secondTableData = [...list]
        firstTableData = [...firstList]
        firstTableLoading.value = false
        secondTableLoading.value = false
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
const previewImage = (url: string) => {
  dialogImageUrl.value = url
  dialogVisible.value = true
}
// const downloadImage = (url: string) => {
// fetch(url).then((res) =>
//   res.blob().then((blob) => {
//     const a = document.createElement('a')
//     const url = window.URL.createObjectURL(blob)
//     a.href = url
//     a.download = '登记证书.jpg'
//     a.click()
//     window.URL.revokeObjectURL(url)
//   })
// )
// }

// 详情
const handleDetails = (id: number) => {
  console.log(id)
}
</script>

<style lang="scss" scoped>
.material-detail {
  .title {
    font-weight: 900;
    // margin-bottom: 10px;
  }
  .top-table {
    display: flex;
    margin-bottom: 10px;
    .container {
      width: 100%;
    }
  }
  .carousel {
    margin-right: 10px;
    width: 17%;
  }
  .carousel-container {
    position: relative; /* 或者使用 flexbox 布局 */
    height: 100%;
  }
  .carousel-buttons {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: space-around;
    width: 100%;
    color: #ffffff;
    transform: translate(-50%, -50%);
    .item-preview,
    .item-delete {
      font-size: 20px;
    }
  }
  :deep(.operation-row) {
    margin: 0;
  }
  .carousel-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(
      0 0 0 / 50%
    ); /* 这里是半透明黑色作为遮罩颜色，可自定义 */
  }
}
</style>
<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}
.el-carousel__item h3 {
  margin: 0;
  text-align: center;
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

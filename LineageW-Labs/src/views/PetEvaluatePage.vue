<template>
  <div class="pet-evaluate-view">
    <PetEvaluateMain />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PetEvaluateMain from '../../modules/pet-evaluate/components/PetEvaluateMain.vue'
import { setPageMeta, pageMeta } from '../../modules/shared/utils/seo'
import { trackPageView } from '../../modules/shared/utils/analytics'

onMounted(() => {
  // 設置頁面 Meta 標籤
  setPageMeta(pageMeta.petEvaluate)

  // 追蹤頁面瀏覽
  trackPageView('pet-evaluate', '寵物評價系統 - 天堂W 綜合計算器')
})
</script>

<style scoped>
.pet-evaluate-view {
  min-height: 100vh;
}
</style>

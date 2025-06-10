<template>
  <div class="job-change-page">
    <!-- 頁面頭部 -->
    <div class="page-header">
      <h1>{{ t('nav.jobChangeCalculator') }}</h1>
      <p class="page-description">
        {{ t('jobChange.description') }}
      </p>
    </div>

    <!-- 主要功能區域 -->
    <div class="main-content">
      <JobChangeCalculator />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import JobChangeCalculator from '@/job-change/components/JobChangeCalculator.vue'
import { setPageMeta } from '@/shared/utils/seo'
import { trackEvent } from '@/shared/utils/analytics'

const { t } = useI18n()

onMounted(() => {
  // SEO 設定
  setPageMeta({
    title: '天堂W 轉職硬幣計算器 - 精確計算轉職成本',
    description:
      '專業的天堂W轉職硬幣計算工具，支援裝備、技能、魔法等各項轉職成本計算，幫助玩家精確規劃轉職預算',
    keywords: '天堂W,轉職計算,硬幣計算,裝備轉職,技能轉職,魔法轉職,成本計算',
    canonical: '/job-change',
  })

  // 頁面追蹤
  trackEvent('page_view', {
    page_name: 'job_change_calculator',
    category: 'Calculator Tools',
    page_path: '/job-change',
  })
})
</script>

<style scoped>
.job-change-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-header {
  text-align: center;
  padding: 32px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 8px;
}

.page-header h1 {
  font-size: 2.5em;
  margin-bottom: 16px;
  font-weight: 600;
}

.page-description {
  font-size: 1.2em;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

.main-content {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

@media (max-width: 768px) {
  .job-change-page {
    padding: var(--spacing-md);
    gap: var(--spacing-lg);
  }

  .page-header {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .page-header h1 {
    font-size: var(--font-size-2xl);
  }

  .page-description {
    font-size: var(--font-size-base);
  }
}

@media (max-width: 480px) {
  .job-change-page {
    padding: var(--spacing-sm);
    gap: var(--spacing-md);
  }

  .page-header {
    padding: var(--spacing-md) var(--spacing-sm);
  }

  .page-header h1 {
    font-size: var(--font-size-xl);
  }

  .page-description {
    font-size: var(--font-size-sm);
  }
}

@media (min-width: 1200px) {
  .job-change-page {
    max-width: 1600px;
    padding: var(--spacing-xl);
  }
}

@media (min-width: 1600px) {
  .job-change-page {
    max-width: none;
    padding: 0 5%;
  }
}
</style>

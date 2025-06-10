<template>
  <nav class="mobile-nav">
    <router-link to="/" class="nav-item" exact>
      <div class="nav-icon">🏠</div>
      <span class="nav-label">{{ t('nav.home', '首頁') }}</span>
    </router-link>

    <router-link to="/pet-evaluate" class="nav-item">
      <div class="nav-icon">🐾</div>
      <span class="nav-label">{{ t('nav.petEvaluate', '寵物評估') }}</span>
    </router-link>

    <router-link to="/job-change" class="nav-item">
      <div class="nav-icon">💎</div>
      <span class="nav-label">{{ t('nav.jobChangeCalculator', '轉職計算') }}</span>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border-primary);
  display: flex;
  justify-content: space-around;
  padding: var(--spacing-sm) var(--spacing-md);
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--color-text-muted);
  transition: all var(--transition-base);
  min-width: 60px;
}

.nav-item:hover,
.nav-item.router-link-active {
  color: var(--color-text-accent);
  background: color-mix(in hsl, var(--color-text-accent) 10%, transparent);
}

.nav-icon {
  font-size: var(--font-size-lg);
}

.nav-label {
  font-size: var(--font-size-xs);
  font-weight: 500;
  text-align: center;
}

/* 只在小螢幕顯示 */
@media (min-width: 769px) {
  .mobile-nav {
    display: none;
  }
}

/* 為內容區域添加底部間距 */
@media (max-width: 768px) {
  :global(body) {
    padding-bottom: 80px;
  }
}
</style>

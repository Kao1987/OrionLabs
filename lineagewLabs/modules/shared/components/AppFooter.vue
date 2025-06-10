<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <p>&copy; 2024 Lineage W Labs. All rights reserved.</p>
        <p class="footer-note">本工具僅供參考，實際遊戲數據可能有所差異</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer 組件不需要額外邏輯
</script>

<style scoped>
.app-footer {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border-primary);
  padding: var(--spacing-lg) 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.footer-content {
  text-align: center;
  color: var(--color-text-muted);
}

.footer-content p {
  margin: var(--spacing-xs) 0;
  font-size: var(--font-size-sm);
}

.footer-note {
  font-size: var(--font-size-xs);
  opacity: 0.8;
}

/* 手機版底部間距調整 */
@media (max-width: 1024px) {
  .app-footer {
    margin-bottom: 80px; /* 為手機版底部導航留空間 */
  }
}
</style>

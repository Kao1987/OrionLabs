<template>
  <div class="job-change-calculator">
    <!-- 標題區域 -->
    <header class="calculator-header">
      <h2>{{ t('jobChange.title') }}</h2>
      <p class="description">
        {{ t('jobChange.subtitle') }}
      </p>
    </header>

    <!-- 裝備選擇器 -->
    <section class="selector-section">
      <!-- 幫助按鈕 -->
      <div class="help-section">
        <button class="help-btn" @click="showHelpModal = true" :title="t('common.help')">
          <span class="help-icon">❓</span>
          <span class="help-text">{{ t('common.help') }}</span>
        </button>
      </div>

      <!-- 選擇器表單 -->
      <div class="selector-form">
        <!-- 裝備類型選擇 -->
        <select
          v-model="selectedEquipmentType"
          class="equipment-type-select"
          @change="onEquipmentTypeChange"
        >
          <option value="">{{ t('jobChange.categories.equipment') }}</option>
          <option v-for="(config, key) in equipmentOptions" :key="key" :value="key">
            {{ t(`jobChange.categories.${key}`) }}
          </option>
        </select>

        <!-- 具體類型選擇 -->
        <select
          v-model="selectedSubtype"
          class="equipment-subtype-select"
          :disabled="!selectedEquipmentType"
        >
          <option value="">{{ t('jobChange.selectSubtype') }}</option>
          <option v-for="(name, key) in subtypeOptions" :key="key" :value="key">
            {{ name }}
          </option>
        </select>

        <!-- 品質選擇 -->
        <select v-model="selectedQuality" class="quality-select" :disabled="!selectedSubtype">
          <option value="">{{ t('jobChange.selectQuality') }}</option>
          <option v-for="(name, key) in qualityOptions" :key="key" :value="key">
            {{ t(`jobChange.quality.${key}`) }}
          </option>
        </select>

        <!-- 數量輸入 -->
        <input
          v-model.number="selectedQuantity"
          type="number"
          class="quantity-input"
          min="1"
          :placeholder="t('common.quantity')"
          :disabled="!selectedQuality"
        />

        <!-- 添加按鈕 -->
        <button
          class="add-to-calculation-btn"
          :disabled="!canAddToCalculation"
          @click="handleAddToCalculation"
        >
          <i class="icon-plus"></i>
          {{ t('jobChange.cart.addToCart') }}
        </button>
      </div>

      <!-- 驗證錯誤提示 -->
      <div v-if="validationErrors.length > 0" class="validation-errors">
        <div v-for="error in validationErrors" :key="error" class="error-message">
          ⚠️ {{ error }}
        </div>
      </div>
    </section>

    <!-- 使用說明彈窗 -->
    <div v-if="showHelpModal" class="modal-overlay" @click="showHelpModal = false">
      <div class="help-modal" @click.stop>
        <div class="modal-header">
          <h3>📚 轉職花費計算器使用說明</h3>
          <button class="close-btn" @click="showHelpModal = false">✕</button>
        </div>

        <div class="modal-content">
          <div class="help-section-content">
            <h4>🎯 使用步驟</h4>
            <ol>
              <li>選擇要轉職的裝備類型</li>
              <li>選擇具體的裝備子類型</li>
              <li>選擇裝備品質（稀有、英雄、傳說、神話）</li>
              <li>輸入要轉職的數量</li>
              <li>點擊「加入計算」按鈕</li>
              <li>如需優惠，可勾選「轉職硬幣禮包」獲得300枚折扣</li>
            </ol>
          </div>

          <div class="help-section-content">
            <h4>💰 費用說明</h4>
            <div class="cost-table">
              <div class="cost-row">
                <span class="quality-label rare">稀有品質</span>
                <span class="cost-value">1 枚轉職硬幣</span>
              </div>
              <div class="cost-row">
                <span class="quality-label hero">英雄品質</span>
                <span class="cost-value">9 枚轉職硬幣</span>
              </div>
              <div class="cost-row">
                <span class="quality-label legend">傳說品質</span>
                <span class="cost-value">27 枚轉職硬幣</span>
              </div>
              <div class="cost-row">
                <span class="quality-label mythic">神話品質</span>
                <span class="cost-value">81 枚轉職硬幣</span>
              </div>
              <div class="cost-row">
                <span class="quality-label cash">商城裝備</span>
                <span class="cost-value">5 枚轉職硬幣</span>
              </div>
            </div>
          </div>

          <div class="help-section-content">
            <h4>📊 數量限制</h4>
            <ul>
              <li><strong>武器：</strong>最多 3 個（不分品質）</li>
              <li>
                <strong>防具各部位：</strong>頭盔、胸甲、臂甲、手套、腿甲、鞋子、腰帶、斗篷各最多 2
                個
              </li>
              <li>
                <strong>飾品：</strong>項鍊、耳環各最多 2 個，戒指最多 4 個，裂痕耳環最多 1 個
              </li>
              <li><strong>符石：</strong>最多 2 個</li>
              <li><strong>商城裝備：</strong>T恤最多 3 個，肩甲、面甲各最多 1 個</li>
            </ul>
          </div>

          <div class="help-section-content">
            <h4>🎁 禮包說明</h4>
            <p>勾選「轉職硬幣禮包 (-300枚)」可享受 300 枚轉職硬幣的折扣優惠。</p>
          </div>

          <div class="help-section-content">
            <h4>⚠️ 注意事項</h4>
            <ul>
              <li>基本轉職費用為 <strong>500 鑽石</strong></li>
              <li>裂痕耳環只有稀有和英雄品質</li>
              <li>商城裝備無品質分別，統一消耗 5 枚轉職硬幣</li>
              <li>技能和咒語卡片有複雜的累進費用，詳請參考官方說明</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 計算項目清單 -->
    <section class="calculation-container">
      <div class="calculation-header">
        <h3>📊 {{ t('jobChange.cart.cartItems') }}</h3>
        <button
          class="clear-calculation-btn"
          @click="clearCart"
          :disabled="state.cartItems.length === 0"
        >
          {{ t('jobChange.cart.clearCart') }}
        </button>
      </div>

      <div class="calculation-content">
        <!-- 空計算項目提示 -->
        <div v-if="state.cartItems.length === 0" class="empty-calculation">
          <i class="icon-calculator"></i>
          <p>{{ t('jobChange.emptyCart') }}</p>
          <small>{{ t('jobChange.emptyCartHint') }}</small>
        </div>

        <!-- 計算項目列表 -->
        <div v-else class="calculation-items">
          <CartItem
            v-for="item in state.cartItems"
            :key="item.id"
            :item="item"
            @remove="removeFromCart"
            @update-quantity="updateCartItemQuantity"
            @show-info="handleShowInfo"
          />
        </div>
      </div>
    </section>

    <!-- 轉職硬幣禮包選項 -->
    <section class="package-option">
      <label class="package-checkbox">
        <input v-model="state.hasPackageDiscount" type="checkbox" class="package-input" />
        <span class="checkmark">✓</span>
        <span class="package-text"
          >{{ t('jobChange.packageDiscount') }} (-300{{ t('currency.coin') }})</span
        >
      </label>
      <small class="package-note">{{ t('jobChange.packageNote') }}</small>
    </section>

    <!-- 費用總計顯示 -->
    <section v-if="costDetails" class="cost-summary">
      <div class="cost-breakdown">
        <!-- 基本轉職費用 -->
        <div class="cost-item">
          <span class="cost-label">{{ t('jobChange.cost.baseCost') }}:</span>
          <span class="cost-value">{{ formatCost(costDetails.baseCost, 'diamond') }}</span>
        </div>

        <!-- 各類成本明細 -->
        <div v-if="costDetails.equipmentCost > 0" class="cost-item">
          <span class="cost-label">{{ t('modal.info.equipmentCost') }}:</span>
          <span class="cost-value">{{ formatCost(costDetails.equipmentCost) }}</span>
        </div>

        <div v-if="costDetails.skillCost > 0" class="cost-item">
          <span class="cost-label">{{ t('modal.info.skillCost') }}:</span>
          <span class="cost-value">{{ formatCost(costDetails.skillCost) }}</span>
        </div>

        <div v-if="costDetails.spellCost > 0" class="cost-item">
          <span class="cost-label">{{ t('modal.info.spellCost') }}:</span>
          <span class="cost-value">{{ formatCost(costDetails.spellCost) }}</span>
        </div>

        <div v-if="costDetails.cashCost > 0" class="cost-item">
          <span class="cost-label">{{ t('jobChange.cashEquipmentCost') }}:</span>
          <span class="cost-value">{{ formatCost(costDetails.cashCost) }}</span>
        </div>

        <!-- 套餐折扣 -->
        <div v-if="costDetails.packageDiscount > 0" class="cost-item discount">
          <span class="cost-label">{{ t('jobChange.cost.packageDiscount') }}:</span>
          <span class="cost-value">-{{ formatCost(costDetails.packageDiscount) }}</span>
        </div>

        <!-- 總計 -->
        <div class="cost-item total-cost">
          <span class="cost-label">{{ t('jobChange.cost.coinCost') }}:</span>
          <span class="cost-value">{{ formatCost(costDetails.finalCoinCost) }}</span>
        </div>

        <div class="cost-item grand-total">
          <span class="cost-label">{{ t('jobChange.cost.totalCost') }}:</span>
          <span class="cost-value">
            {{ formatCost(costDetails.baseCost, 'diamond') }} +
            {{ formatCost(costDetails.finalCoinCost) }}
          </span>
        </div>
      </div>

      <!-- 驗證警告 -->
      <div v-if="validation.warnings.length > 0" class="validation-warnings">
        <div v-for="warning in validation.warnings" :key="warning" class="warning-message">
          ⚠️ {{ warning }}
        </div>
      </div>

      <!-- 驗證錯誤 -->
      <div v-if="validation.errors.length > 0" class="validation-errors">
        <div v-for="error in validation.errors" :key="error" class="error-message">
          ❌ {{ error }}
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="calculator-footer">
      <div class="footer-content">
        <div class="contact-section">
          <h4>📝 與我聯繫</h4>
          <p>有任何建議或意見嗎？歡迎填寫回饋表單！</p>
          <a
            href="mailto:orion@lineagewlabs.com?subject=轉職計算器意見回饋&body=親愛的Orion，%0A%0A我對轉職計算器有以下建議：%0A%0A"
            class="feedback-link"
          >
            📧 點擊寄送意見回饋
          </a>
        </div>

        <div class="footer-info">
          <div class="author-info">Created by <strong>Orion</strong></div>
          <div class="version-info">Last Update: {{ formatDate(new Date()) }} V3.0</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useJobChangeCalculator } from '../composables/useJobChangeCalculator'
import type {
  EquipmentCategory,
  EquipmentType,
  CashEquipmentType,
  QualityLevel,
  InfoContent,
} from '../types'
import CartItem from './CartItem.vue'
import {
  EQUIPMENT_OPTIONS,
  QUALITY_OPTIONS,
  SKILL_QUALITY_OPTIONS,
  SPELL_QUALITY_OPTIONS,
} from '../utils/costData'
// === 組件事件 ===
const emit = defineEmits<{
  'show-help': []
  'show-info': [content: InfoContent]
}>()

// === 使用 Composable ===
const { t } = useI18n()
const calculatorService = useJobChangeCalculator()

const {
  // 狀態
  state,
  costDetails,
  cartItems,

  // 購物車操作
  addToCart,
  removeFromCart: removeFromCartService,
  clearCart,

  // 工具函數
  formatCurrency,
} = calculatorService

// 本地狀態
const selectedEquipmentType = ref<string>('')
const selectedSubtype = ref<string>('')
const selectedQuality = ref<string>('')
const selectedQuantity = ref<number>(1)
const showHelpModal = ref<boolean>(false)

// 計算屬性
const validation = computed(() => ({
  isValid: true,
  errors: [] as string[],
  warnings: [] as string[],
}))

const validationErrors = computed(() => [])

const subtypeOptions = computed(() => {
  if (!selectedEquipmentType.value) return {}

  const equipmentConfig =
    EQUIPMENT_OPTIONS[selectedEquipmentType.value as keyof typeof EQUIPMENT_OPTIONS]
  return equipmentConfig?.subtypes || {}
})

const qualityOptions = computed(() => {
  if (selectedEquipmentType.value === 'skill') {
    return SKILL_QUALITY_OPTIONS
  } else if (selectedEquipmentType.value === 'spell') {
    return SPELL_QUALITY_OPTIONS
  } else if (selectedEquipmentType.value === 'cash') {
    return { cash: '💼 商城' }
  } else {
    return QUALITY_OPTIONS
  }
})

const canAddToCalculation = computed(() => {
  return (
    selectedEquipmentType.value &&
    selectedSubtype.value &&
    selectedQuality.value &&
    selectedQuantity.value > 0
  )
})

const equipmentOptions = computed(() => EQUIPMENT_OPTIONS)

// 函數包裝
const removeFromCart = (itemId: string) => {
  const index = cartItems.value.findIndex((item) => item.id === itemId)
  if (index !== -1) {
    removeFromCartService(index)
  }
}

const updateCartItemQuantity = (_itemId: string, _quantity: number) => {
  // 實現更新計算項目數量
  console.log('更新計算項目數量:', _itemId, _quantity)
}

const resetForm = () => {
  selectedEquipmentType.value = ''
  selectedSubtype.value = ''
  selectedQuality.value = ''
  selectedQuantity.value = 1
}

const formatCost = (amount: number, type?: 'coin' | 'diamond') => {
  return formatCurrency(amount, type)
}

const formatDate = (date: Date) => {
  return date
    .toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '/')
}

// === 事件處理 ===

/**
 * 處理裝備類型變更
 */
function onEquipmentTypeChange() {
  selectedSubtype.value = ''
  selectedQuality.value = ''
}

/**
 * 處理添加到購物車
 */
function handleAddToCalculation() {
  const item = {
    equipmentType: selectedEquipmentType.value as EquipmentCategory,
    subtype: selectedSubtype.value as EquipmentType | CashEquipmentType,
    quality: selectedQuality.value as QualityLevel | 'cash',
    quantity: selectedQuantity.value,
    name: `${selectedSubtype.value} (${selectedQuality.value})`,
    unitCost: 0,
  }
  const success = addToCart(item)
  if (success) {
    // 可以添加成功提示
    console.log('已添加到購物車')
    resetForm()
  }
}

/**
 * 處理顯示信息
 */
function handleShowInfo(content: InfoContent) {
  emit('show-info', content)
}

// === 監聽器 ===

// 監聽購物車變化，自動計算成本
watch(
  () => state.cartItems.length,
  (newLength) => {
    console.log(`購物車項目數量: ${newLength}`)
  },
)
</script>

<style scoped>
/* 基礎樣式 */
.job-change-calculator {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--text-color, #2c3e50);
  background: var(--bg-color, #f8f9fa);
  min-height: 100vh;
  transition: all 0.3s ease;
}

/* 暗黑模式支持 */
@media (prefers-color-scheme: dark) {
  .job-change-calculator {
    --text-color: #e9ecef;
    --bg-color: #1a1a1a;
    --card-bg: #2d2d2d;
    --border-color: #495057;
    --input-bg: #343a40;
    --package-bg-start: #332a1a;
    --package-bg-end: #4a3728;
    --package-border: #ff9800;
    --package-text: #ffb74d;
    --package-note: #ff8a65;
  }
}

[data-theme='dark'] .job-change-calculator {
  --text-color: #e9ecef;
  --bg-color: #1a1a1a;
  --card-bg: #2d2d2d;
  --border-color: #495057;
  --input-bg: #343a40;
  --package-bg-start: #332a1a;
  --package-bg-end: #4a3728;
  --package-border: #ff9800;
  --package-text: #ffb74d;
  --package-note: #ff8a65;
}

/* 選擇器區域 */
.selector-section {
  background: var(--card-bg, white);
  border: 1px solid var(--border-color, #e9ecef);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.help-section {
  text-align: right;
  margin-bottom: 1.5rem;
}

.help-btn {
  background: linear-gradient(135deg, #17a2b8, #138496);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(23, 162, 184, 0.3);
}

.help-btn:hover {
  background: linear-gradient(135deg, #138496, #117a8b);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(23, 162, 184, 0.4);
}

.selector-form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto auto;
  gap: 1.5rem;
  align-items: center;
}

@media (max-width: 768px) {
  .selector-form {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.equipment-type-select,
.equipment-subtype-select,
.quality-select {
  padding: 1rem;
  border: 2px solid var(--border-color, #ced4da);
  border-radius: 8px;
  background: var(--input-bg, white);
  color: var(--text-color, #495057);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.equipment-type-select:focus,
.equipment-subtype-select:focus,
.quality-select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.quantity-input {
  padding: 1rem;
  border: 2px solid var(--border-color, #ced4da);
  border-radius: 8px;
  width: 120px;
  text-align: center;
  background: var(--input-bg, white);
  color: var(--text-color, #495057);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.add-to-calculation-btn {
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.add-to-calculation-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #218838, #1e7e34);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
}

.add-to-calculation-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 計算項目容器 */
.calculation-container {
  background: var(--card-bg, white);
  border: 1px solid var(--border-color, #e9ecef);
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.calculation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, var(--card-bg, #f8f9fa), var(--border-color, #e9ecef));
  border-bottom: 1px solid var(--border-color, #e9ecef);
}

.calculation-header h3 {
  margin: 0;
  font-size: 1.3rem;
  color: var(--text-color, #2c3e50);
  font-weight: 600;
}

.clear-calculation-btn {
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
}

.clear-calculation-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #c82333, #bd2130);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
}

.calculation-content {
  padding: 2rem;
}

.empty-calculation {
  text-align: center;
  padding: 3rem 2rem;
  color: var(--text-color, #6c757d);
}

.empty-calculation i {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.calculation-items > * + * {
  margin-top: 1.5rem;
}

/* 套餐選項 */
.package-option {
  background: linear-gradient(
    135deg,
    var(--package-bg-start, #fff8e1),
    var(--package-bg-end, #ffe082)
  );
  border: 2px solid var(--package-border, #ff9800);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.package-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 193, 7, 0.1));
  pointer-events: none;
}

.package-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.3);
  border-color: #f57c00;
}

.package-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--package-text, #e65100);
  position: relative;
  z-index: 1;
}

.package-input {
  display: none;
}

.checkmark {
  width: 24px;
  height: 24px;
  border: 3px solid var(--package-border, #ff9800);
  border-radius: 6px;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: transparent;
  font-size: 0.9rem;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.8);
}

.package-input:checked + .checkmark {
  background: var(--package-border, #ff9800);
  color: white;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.4);
}

.package-note {
  color: var(--package-note, #bf360c);
  font-size: 0.9rem;
  margin-left: 3.5rem;
  position: relative;
  z-index: 1;
}

/* 費用總計 */
.cost-summary {
  background: var(--card-bg, white);
  border: 2px solid var(--border-color, #e9ecef);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.cost-breakdown {
  display: grid;
  gap: 1rem;
}

.cost-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--card-bg, #f8f9fa);
  border-radius: 8px;
  border-left: 4px solid #6c757d;
  transition: all 0.3s ease;
}

.cost-item:hover {
  transform: translateX(5px);
}

.cost-item.discount {
  border-left-color: #28a745;
  background: rgba(40, 167, 69, 0.1);
}

.cost-item.total-cost {
  border-left-color: #007bff;
  background: rgba(0, 123, 255, 0.1);
  font-weight: 600;
}

.cost-item.grand-total {
  border-left-color: #dc3545;
  background: rgba(220, 53, 69, 0.1);
  font-weight: 700;
  font-size: 1.1rem;
}

.cost-label {
  font-weight: 500;
  color: var(--text-color, #495057);
}

.cost-value {
  font-weight: 600;
  color: var(--text-color, #2c3e50);
}

/* 驗證消息 */
.validation-warnings,
.validation-errors {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
}

.validation-warnings {
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid #ffc107;
}

.validation-errors {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid #dc3545;
}

.warning-message,
.error-message {
  padding: 0.5rem;
  margin: 0.25rem 0;
  border-radius: 4px;
}

.warning-message {
  background: rgba(255, 193, 7, 0.2);
  color: #856404;
}

.error-message {
  background: rgba(220, 53, 69, 0.2);
  color: #721c24;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .job-change-calculator {
    padding: 1rem;
  }

  .selector-section,
  .calculation-container,
  .cost-summary {
    padding: 1.5rem;
  }

  .calculation-header {
    padding: 1rem 1.5rem;
  }

  .calculation-header h3 {
    font-size: 1.1rem;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .footer-info {
    text-align: center;
  }

  .contact-section h4 {
    font-size: 1.1rem;
  }
}

/* 動畫效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.calculation-container,
.cost-summary {
  animation: fadeInUp 0.5s ease-out;
}

/* 使用說明彈窗 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.help-modal {
  background: var(--card-bg, white);
  border-radius: 16px;
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideInUp 0.3s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.modal-content {
  padding: 2rem;
  max-height: calc(80vh - 80px);
  overflow-y: auto;
  color: var(--text-color, #2c3e50);
}

.help-section-content {
  margin-bottom: 2rem;
}

.help-section-content h4 {
  color: var(--text-color, #2c3e50);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.help-section-content ol,
.help-section-content ul {
  padding-left: 1.5rem;
  line-height: 1.6;
}

.help-section-content li {
  margin-bottom: 0.5rem;
}

.cost-table {
  background: var(--card-bg, #f8f9fa);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.cost-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.quality-label {
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;
}

.quality-label.rare {
  background: #0154a0;
}

.quality-label.hero {
  background: #e90003;
}

.quality-label.legend {
  background: #4e0180;
}

.quality-label.mythic {
  background: #ffc801;
  color: #2c3e50;
}

.quality-label.cash {
  background: #6c757d;
}

.cost-value {
  font-weight: 600;
  color: var(--text-color, #2c3e50);
}

/* 動畫效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Footer */
.calculator-footer {
  background: linear-gradient(135deg, var(--card-bg, #f8f9fa), var(--border-color, #e9ecef));
  padding: 2rem;
  border-top: 1px solid var(--border-color, #e9ecef);
  margin-top: auto;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-section {
  flex: 1;
}

.contact-section h4 {
  color: var(--text-color, #2c3e50);
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.contact-section p {
  color: var(--text-color, #6c757d);
  margin-bottom: 1rem;
}

.feedback-link {
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
}

.feedback-link:hover {
  background: linear-gradient(135deg, #218838, #1e7e34);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.4);
}

.footer-info {
  text-align: right;
}

.author-info {
  color: var(--text-color, #6c757d);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.version-info {
  color: var(--text-color, #6c757d);
  font-size: 0.9rem;
}
</style>

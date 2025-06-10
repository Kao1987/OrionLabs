// 寵物評價模組專用類型
export interface PetType {
  id: string
  name: string
  emoji: string
  image: string
  mainStat: StatType
  baseStats: PetStats
}

export interface PetStats {
  endurance: number    // 忍耐力
  loyalty: number      // 忠誠心
  speed: number        // 速度
  aggressiveness: number // 積極性
  hp: number          // 體力
}

export type StatType = 'endurance' | 'loyalty' | 'speed' | 'aggressiveness' | 'hp'

export interface PetCalculationResult {
  pet: PetType
  level: number
  currentStats: PetStats
  expectedStats: PetStats
  analysis: StatAnalysis[]
  overallScore: number
  rating: OverallRating
}

export interface StatAnalysis {
  stat: StatType
  statName: string
  currentValue: number
  expectedValue: number
  baseValue: number        // 新增：基礎值
  growthValue: number      // 新增：成長值
  growthRate: number
  score: number
  rating: RatingLevel
  isMainStat: boolean
  characterBonus: string
}

export type RatingLevel = 'excellent' | 'good' | 'average' | 'poor' | 'bad' | 'fixed'  // 新增 'fixed'

// 新增 OverallRating 類型定義
export type OverallRating = 'godTier' | 'highQuality' | 'normalPet' | 'needImprovement' | 'tragic'

// 新增：升級機率表類型定義
export interface UpgradeRate {
  level: number
  rate: number
}

export interface UpgradeRateTable {
  main: UpgradeRate[]  // 主屬性升級機率
  sub: UpgradeRate[]   // 副屬性升級機率
}

// 寵物評價模組的配置
export interface PetEvaluateConfig {
  maxLevel: number
  minLevel: number
  historyLimit: number
  autoSave: boolean        // 新增：自動保存功能開關
}

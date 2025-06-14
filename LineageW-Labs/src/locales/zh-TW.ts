/**
 * 繁體中文翻譯檔案
 * 移轉自 assets/js/modules/languages/zh-TW.js
 */
import type { TranslationSchema } from './types'

const zhTW: TranslationSchema = {
  common: {
    calculate: '🧮 計算屬性評價',
    help: '❓ 使用說明',
    close: '關閉',
    level: '寵物等級',
    currentValue: '當前值',
    baseValue: '基礎值',
    growthValue: '成長值',
    expectedValue: '期望值',
    characterBonus: '角色加成',
    rating: '評價',
    contact: '📝與我聯繫',
    language: '🌐 語言',
    quantity: '數量:',
    loading: '載入中...',
    reset: '重置',
    error: '發生錯誤',
    confirm: '確認',
    cancel: '取消',
    save: '保存',
    delete: '刪除',
    edit: '編輯',
    view: '查看',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    submit: '提交',
    new: '新',
    viewDetails: '查看詳細說明',
    history: '計算歷史',
    clearHistory: '清除歷史',
    score: '分',
    toggleTheme: '切換主題',
    startNow: '立即使用',
    comingSoon: '敬請期待',
  },

  currency: {
    diamond: '鑽',
    coin: '枚',
    diamondUnit: '鑽',
    coinUnit: '枚',
  },

  title: {
    main: '⚔️ 天堂W 綜合計算器',
    subtitle: '專業的遊戲輔助計算工具',
  },

  nav: {
    home: '🏠 首頁',
    petEvaluate: '🐾 寵物評價系統',
    jobChangeCalculator: '💎 轉職花費計算器',
    moreFeatures: '🚀 更多功能',
  },

  home: {
    welcome: {
      title: '歡迎使用專業遊戲工具',
      subtitle: '提供精確的寵物評估和轉職計算服務，助您在天堂W中做出最佳決策',
    },

    announcement: {
      title: '系統公告',
      content: '專業的遊戲輔助計算工具，持續更新中...',
    },

    features: {
      title: '功能列表',
      petEvaluate: {
        title: '寵物評價系統',
        desc: '精確評估您的寵物屬性，分析成長潛力與價值',
        btn: '開始評價 →',
      },
      jobChange: {
        title: '轉職花費計算器',
        desc: '計算轉職所需材料和費用，規劃最經濟的轉職路線',
        btn: '開始計算 →',
      },
      moreComing: {
        title: '更多功能',
        desc: '更多功能正在開發中...',
        btn: '敬請期待',
      },
    },

    howToUse: {
      title: '使用方法',
      step1: {
        title: '選擇功能',
        desc: '選擇您需要的計算功能',
      },
      step2: {
        title: '輸入數據',
        desc: '根據提示輸入相關數據',
      },
      step3: {
        title: '查看結果',
        desc: '獲得詳細的分析結果',
      },
    },

    news: {
      title: '📢 最新消息',
      item1: {
        title: '✨ V3.0 重大更新',
        content: '新版架構完全重構，使用 Vue 3 + TypeScript，提供更好的性能和用戶體驗',
      },
      item2: {
        title: '🔧 功能優化',
        content: '優化轉職計算器邏輯，新增購物車功能和詳細成本分析',
      },
      item3: {
        title: '🌍 多語言支援',
        content: '完善繁中、英文、韓文三語言系統，支援動態語言切換',
      },
    },

    stats: {
      title: '📊 使用統計',
      petEvaluations: '寵物評價次數',
      jobCalculations: '轉職計算次數',
      languages: '支援語言',
      version: '當前版本',
    },

    guide: {
      title: '🚀 快速入門',
      step1: {
        title: '選擇功能',
        desc: '從上方導航或功能卡片選擇您需要的計算器',
      },
      step2: {
        title: '輸入數據',
        desc: '按照介面提示輸入您的寵物屬性或轉職需求',
      },
      step3: {
        title: '獲得結果',
        desc: '查看詳細的計算結果和建議',
      },
    },
  },

  pets: {
    select: '選擇寵物',
    subtitle: '計算您的寵物成長潛力與評價',
    wolf: '狼',
    dog: '杜賓狗',
    shepherd: '牧羊犬',
    hound: '小獵犬',
    wolfDesc: '主屬：體力(HP)',
    dogDesc: '主屬：忠誠心(命中)',
    shepherdDesc: '主屬：忍耐力(物防)',
    houndDesc: '主屬：速度(迴避)',
    mainStat: '主屬',
  },

  stats: {
    title: '當前屬性值',
    warning: '⚠️ 請記得扣除技能加成的屬性點數',
    endurance: '忍耐力',
    loyalty: '忠誠心',
    speed: '速度',
    aggressiveness: '積極性',
    hp: '體力',
    enduranceDesc: '5點=1物防',
    loyaltyDesc: '5點=1近/遠/魔命中',
    speedDesc: '10點=1近/遠迴避',
    aggressivenessDesc: '3點=1攻擊力',
    hpDesc: '1點=30HP',
    aggressivenessNote: '※積極性固定為3，不會升級',
  },

  results: {
    title: '計算結果',
    waiting: '等待計算',
    waitingDesc: '完成上方的數值輸入後，這裡將會顯示您的寵物評價結果。',
    overallRating: '整體評價',
    attribute: '屬性',
  },

  ratings: {
    excellent: '頂級',
    good: '優秀',
    average: '良好',
    normal: '普通',
    poor: '待加強',
    bad: '不佳',
    fixed: '固定值',
    godTier: '神級寵物',
    highQuality: '優質寵物',
    normalPet: '普通寵物',
    needImprovement: '待加強',
    tragic: '悲劇',
    poorQuality: '品質不佳',
  },

  descriptions: {
    godTier: '🌟 神級寵物！屬性成長遠超預期，值得重點培養！這是極其稀有的極品寵物！',
    highQuality: '⭐ 優質寵物！屬性成長超出平均水準，推薦繼續培養。',
    normal: '✅ 普通寵物，屬性成長合乎預期，可正常使用。',
    needImprovement: '⚠️ 這隻寵物的成長低於平均，建議強化或尋找更好的替代。',
    tragic: '💔 悲劇寵物，屬性成長極差，強烈建議重新培養或更換寵物。',
    excellent: '🌟 頂級成長，遠超預期！',
    good: '⭐ 優秀成長，表現良好',
    average: '✅ 良好成長，合乎預期',
    normalGrowth: '➡️ 普通成長，接近平均',
    poor: '⚠️ 待加強，低於預期',
    fixed: '🔒 固定值，不參與評分',
  },

  help: {
    title: '🐾 使用說明',
    usage: '使用方法',
    calculation: '計算原理',
    ratingSystem: '評價等級',

    steps: {
      title: '🚀 使用步驟',
      step1: '選擇您的寵物類型',
      step2: '輸入寵物等級（1-15）',
      step3: '輸入各屬性數值（⚠️請扣除技能加成）',
      step4: '點擊計算按鈕查看評價',
    },

    baseData: {
      title: '🎯 寵物基礎數據',
    },

    calculationPrinciple: {
      title: '🧮 計算原理',
      upgradeRates: '升級機率',
      mainStat: '主屬性：+1(5%)，+2(15%)，+3(30%)，+4(20%)，+5(15%)，+6(10%)，+7(5%)',
      mainStatExpected: '期望值：每級+3.75點',
      subStat: '副屬性：+0(15%)，+1(50%)，+2(30%)，+3(5%)',
      subStatExpected: '期望值：每級+1.25點',
      formula: '評分公式',
      formula1: '1. 計算期望值',
      formula1Desc: '期望值 = 基礎值 + (等級-1) × 每級期望成長',
      formula2: '2. 計算成長率',
      formula2Desc: '成長率 = (當前值 - 基礎值) ÷ (期望值 - 基礎值)',
      formula3: '3. 主屬性加權',
      formula3Desc: '主屬性分數 × 1.5倍權重',
    },
  },

  jobChange: {
    title: '轉職花費計算器',
    subtitle: '精準計算轉職所需材料與費用',
    selectSubtype: '選擇具體類型',
    selectQuality: '選擇品質',
    emptyCart: '尚未選擇任何計算項目',
    emptyCartHint: '請使用上方選擇器添加轉職項目',
    packageDiscount: '轉職硬幣禮包',
    packageNote: '勾選後可節省300枚轉職硬幣',
    cashEquipmentCost: '商城裝備轉職硬幣',

    tabs: {
      simple: '簡易計算',
      detailed: '詳細計算',
      cart: '計算項目模式',
    },

    categories: {
      equipment: '裝備',
      weapon: '武器',
      armor: '防具',
      accessory: '飾品',
      skill: '技能',
      spell: '咒語卡',
      cash: '商城裝備',
    },

    quality: {
      rare: '稀有',
      hero: '英雄',
      legend: '傳說',
      mythic: '神話',
      cash: '商城',
    },

    cost: {
      baseCost: '基本轉職費用',
      coinCost: '轉職硬幣費用',
      packageDiscount: '禮包優惠',
      finalCost: '最終費用',
      totalCost: '總計費用',
    },

    cart: {
      addToCart: '加入計算',
      removeFromCart: '移除',
      clearCart: '清空計算項目',
      cartItems: '計算項目清單',
      totalItems: '總項目數',
      calculate: '計算總費用',
    },

    validation: {
      maxWeaponExceeded: '武器全品質總計不能超過3件',
      maxArmorExceeded: '防具全品質總計不能超過14件',
      maxAccessoryExceeded: '飾品全品質總計不能超過9件',
      invalidQuantity: '數量必須為正整數',
      exceedsLimit: '超過限制數量',
    },
  },

  modal: {
    info: {
      title: '信息',
      equipmentCost: '裝備轉職硬幣消耗',
      skillCost: '技能轉職硬幣消耗',
      spellCost: '咒語卡轉職硬幣消耗',
    },
  },

  notifications: {
    success: '操作成功',
    error: '操作失敗',
    warning: '警告',
    info: '提示',
    calculationComplete: '計算完成',
    dataLoaded: '數據載入完成',
    languageChanged: '語言已切換',
  },
}

export default zhTW

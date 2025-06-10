/**
 * 翻譯檔案型別定義
 * 確保所有語言檔案的結構一致性
 */

export interface CommonTranslations {
  calculate: string
  help: string
  close: string
  level: string
  currentValue: string
  baseValue: string
  growthValue: string
  expectedValue: string
  characterBonus: string
  rating: string
  contact: string
  language: string
  quantity: string
  loading: string
  reset: string
  error: string
  confirm: string
  cancel: string
  save: string
  delete: string
  edit: string
  view: string
  back: string
  next: string
  previous: string
  submit: string
  new: string
  viewDetails: string
  history: string
  clearHistory: string
  score: string
  toggleTheme: string
  startNow: string
  comingSoon: string
}

export interface CurrencyTranslations {
  diamond: string
  coin: string
  diamondUnit: string
  coinUnit: string
}

export interface TitleTranslations {
  main: string
  subtitle: string
}

export interface NavTranslations {
  home: string
  petEvaluate: string
  jobChangeCalculator: string
  moreFeatures: string
}

export interface HomeTranslations {
  welcome: {
    title: string
    subtitle: string
  }
  announcement: {
    title: string
    content: string
  }
  features: {
    title: string
    petEvaluate: {
      title: string
      desc: string
      btn: string
    }
    jobChange: {
      title: string
      desc: string
      btn: string
    }
    moreComing: {
      title: string
      desc: string
      btn: string
    }
  }
  howToUse: {
    title: string
    step1: {
      title: string
      desc: string
    }
    step2: {
      title: string
      desc: string
    }
    step3: {
      title: string
      desc: string
    }
  }
  news: {
    title: string
    item1: {
      title: string
      content: string
    }
    item2: {
      title: string
      content: string
    }
    item3: {
      title: string
      content: string
    }
  }
  stats: {
    title: string
    petEvaluations: string
    jobCalculations: string
    languages: string
    version: string
  }
  guide: {
    title: string
    step1: {
      title: string
      desc: string
    }
    step2: {
      title: string
      desc: string
    }
    step3: {
      title: string
      desc: string
    }
  }
}

export interface PetsTranslations {
  select: string
  subtitle: string
  wolf: string
  dog: string
  shepherd: string
  hound: string
  wolfDesc: string
  dogDesc: string
  shepherdDesc: string
  houndDesc: string
  mainStat: string
}

export interface StatsTranslations {
  title: string
  warning: string
  endurance: string
  loyalty: string
  speed: string
  aggressiveness: string
  hp: string
  enduranceDesc: string
  loyaltyDesc: string
  speedDesc: string
  aggressivenessDesc: string
  hpDesc: string
  aggressivenessNote: string
}

export interface ResultsTranslations {
  title: string
  waiting: string
  waitingDesc: string
  overallRating: string
  attribute: string
}

export interface RatingsTranslations {
  excellent: string
  good: string
  average: string
  normal: string
  poor: string
  bad: string
  fixed: string
  godTier: string
  highQuality: string
  normalPet: string
  needImprovement: string
  tragic: string
  poorQuality: string
}

export interface DescriptionsTranslations {
  godTier: string
  highQuality: string
  normal: string
  needImprovement: string
  tragic: string
  excellent: string
  good: string
  average: string
  normalGrowth: string
  poor: string
  fixed: string
}

export interface HelpTranslations {
  title: string
  usage: string
  calculation: string
  ratingSystem: string
  steps: {
    title: string
    step1: string
    step2: string
    step3: string
    step4: string
  }
  baseData: {
    title: string
  }
  calculationPrinciple: {
    title: string
    upgradeRates: string
    mainStat: string
    mainStatExpected: string
    subStat: string
    subStatExpected: string
    formula: string
    formula1: string
    formula1Desc: string
    formula2: string
    formula2Desc: string
    formula3: string
    formula3Desc: string
  }
}

export interface JobChangeTranslations {
  title: string
  subtitle: string
  selectSubtype: string
  selectQuality: string
  emptyCart: string
  emptyCartHint: string
  packageDiscount: string
  packageNote: string
  cashEquipmentCost: string
  tabs: {
    simple: string
    detailed: string
    cart: string
  }
  categories: {
    equipment: string
    weapon: string
    armor: string
    accessory: string
    skill: string
    spell: string
    cash: string
  }
  quality: {
    rare: string
    hero: string
    legend: string
    mythic: string
    cash: string
  }
  cost: {
    baseCost: string
    coinCost: string
    packageDiscount: string
    finalCost: string
    totalCost: string
  }
  cart: {
    addToCart: string
    removeFromCart: string
    clearCart: string
    cartItems: string
    totalItems: string
    calculate: string
  }
  validation: {
    maxWeaponExceeded: string
    maxArmorExceeded: string
    maxAccessoryExceeded: string
    invalidQuantity: string
    exceedsLimit: string
  }
}

export interface ModalTranslations {
  info: {
    title: string
    equipmentCost: string
    skillCost: string
    spellCost: string
  }
}

export interface NotificationsTranslations {
  success: string
  error: string
  warning: string
  info: string
  calculationComplete: string
  dataLoaded: string
  languageChanged: string
}

/**
 * 完整的翻譯檔案結構
 */
export interface TranslationSchema extends Record<string, unknown> {
  common: CommonTranslations
  currency: CurrencyTranslations
  title: TitleTranslations
  nav: NavTranslations
  home: HomeTranslations
  pets: PetsTranslations
  stats: StatsTranslations
  results: ResultsTranslations
  ratings: RatingsTranslations
  descriptions: DescriptionsTranslations
  help: HelpTranslations
  jobChange: JobChangeTranslations
  modal: ModalTranslations
  notifications: NotificationsTranslations
}

/**
 * 語言代碼型別
 */
export type LanguageCode = 'zh-TW' | 'en' | 'ko'

/**
 * 可用語言設定
 */
export interface LanguageOption {
  code: LanguageCode
  name: string
  nativeName: string
}

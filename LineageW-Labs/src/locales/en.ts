/**
 * English translation file
 * Migrated from assets/js/modules/languages/en.js
 */
import type { TranslationSchema } from './types'

const en: TranslationSchema = {
  common: {
    calculate: '🧮 Calculate Pet Stats',
    help: '❓ Help',
    close: 'Close',
    level: 'Pet Level',
    currentValue: 'Current',
    baseValue: 'Base',
    growthValue: 'Growth',
    expectedValue: 'Expected',
    characterBonus: 'Character Bonus',
    rating: 'Rating',
    contact: '📝Contact Me',
    language: '🌐 Language',
    quantity: 'Quantity:',
    loading: 'Loading...',
    reset: 'Reset',
    error: 'Error occurred',
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    new: 'New',
    viewDetails: 'View Details',
    history: 'History',
    clearHistory: 'Clear History',
    score: 'Score',
    toggleTheme: 'Toggle Theme',
    startNow: 'Start Now',
    comingSoon: 'Coming Soon',
  },

  currency: {
    diamond: 'Diamonds',
    coin: 'Coins',
    diamondUnit: 'D',
    coinUnit: 'C',
  },

  title: {
    main: '⚔️ Lineage W Comprehensive Calculator',
    subtitle: 'Professional game assistant tools',
  },

  nav: {
    home: '🏠 Home',
    petEvaluate: '🐾 Pet Evaluation System',
    jobChangeCalculator: '💎 Class Change Calculator',
    moreFeatures: '🚀 More Features',
  },

  home: {
    welcome: {
      title: 'Welcome to Professional Gaming Tools',
      subtitle:
        'Providing accurate pet evaluation and class change calculation services to help you make optimal decisions in Lineage W',
    },

    announcement: {
      title: 'System Announcement',
      content: 'Professional game assistant calculation tools, continuously updating...',
    },

    features: {
      title: 'Feature List',
      petEvaluate: {
        title: 'Pet Evaluation System',
        desc: 'Accurately assess your pet attributes, analyze growth potential and value',
        btn: 'Start Evaluation →',
      },
      jobChange: {
        title: 'Class Change Calculator',
        desc: 'Calculate materials and costs needed for class change, plan the most economical path',
        btn: 'Start Calculation →',
      },
      moreComing: {
        title: 'More Features',
        desc: 'More features are under development...',
        btn: 'Coming Soon',
      },
    },

    howToUse: {
      title: 'How to Use',
      step1: {
        title: 'Choose Feature',
        desc: 'Select the calculation feature you need',
      },
      step2: {
        title: 'Input Data',
        desc: 'Enter relevant data according to prompts',
      },
      step3: {
        title: 'View Results',
        desc: 'Get detailed analysis results',
      },
    },

    news: {
      title: '📢 Latest News',
      item1: {
        title: '✨ V3.0 Major Update',
        content:
          'Complete architecture rebuild using Vue 3 + TypeScript, providing better performance and user experience',
      },
      item2: {
        title: '🔧 Feature Optimization',
        content:
          'Optimized job change calculator logic, added shopping cart feature and detailed cost analysis',
      },
      item3: {
        title: '🌍 Multi-language Support',
        content:
          'Complete Traditional Chinese, English, and Korean trilingual system with dynamic language switching',
      },
    },

    stats: {
      title: '📊 Usage Statistics',
      petEvaluations: 'Pet Evaluations',
      jobCalculations: 'Job Calculations',
      languages: 'Supported Languages',
      version: 'Current Version',
    },

    guide: {
      title: '🚀 Quick Start',
      step1: {
        title: 'Choose Feature',
        desc: 'Select the calculator you need from the top navigation or feature cards',
      },
      step2: {
        title: 'Input Data',
        desc: 'Follow the interface prompts to enter your pet attributes or job change requirements',
      },
      step3: {
        title: 'Get Results',
        desc: 'View detailed calculation results and recommendations',
      },
    },
  },

  pets: {
    select: 'Select Pet',
    subtitle: 'Calculate your pet growth potential and evaluation',
    wolf: 'Wolf',
    dog: 'Doberman',
    shepherd: 'Sheepdog',
    hound: 'Beagle',
    wolfDesc: 'Main: HP',
    dogDesc: 'Main: Loyalty (Hit)',
    shepherdDesc: 'Main: Endurance (P.Def)',
    houndDesc: 'Main: Speed (Dodge)',
    mainStat: 'Main Stat',
  },

  stats: {
    title: 'Current Attributes',
    warning: '⚠️ Please deduct skill bonus from attribute values',
    endurance: 'Endurance',
    loyalty: 'Loyalty',
    speed: 'Speed',
    aggressiveness: 'Aggressiveness',
    hp: 'HP',
    enduranceDesc: '5pts=1 P.Def',
    loyaltyDesc: '5pts=1 Hit Rate',
    speedDesc: '10pts=1 Dodge',
    aggressivenessDesc: '3pts=1 Attack',
    hpDesc: '1pt=30 HP',
    aggressivenessNote: '※Aggressiveness is fixed at 3, no level up',
  },

  results: {
    title: 'Results',
    waiting: 'Waiting for Calculation',
    waitingDesc:
      'After completing the input above, your pet evaluation results will be displayed here.',
    overallRating: 'Overall Rating',
    attribute: 'Attribute',
  },

  ratings: {
    excellent: 'Excellent',
    good: 'Good',
    average: 'Average',
    normal: 'Normal',
    poor: 'Poor',
    bad: 'Bad',
    fixed: 'Fixed',
    godTier: 'God-tier Pet',
    highQuality: 'High Quality Pet',
    normalPet: 'Normal Pet',
    needImprovement: 'Needs Improvement',
    tragic: 'Tragic',
    poorQuality: 'Poor Quality',
  },

  descriptions: {
    godTier:
      '🌟 God-tier Pet! Growth far exceeds expectations, worthy of heavy investment! This is an extremely rare premium pet!',
    highQuality:
      '⭐ High Quality Pet! Growth exceeds average standards, recommended for continued development.',
    normal: '✅ Normal Pet, growth meets expectations and can be used normally.',
    needImprovement:
      "⚠️ This pet's growth is below average, consider enhancement or finding a better replacement.",
    tragic: '💔 Tragic Pet, extremely poor growth, strongly recommend retraining or replacing.',
    excellent: '🌟 Excellent growth, far exceeds expectations!',
    good: '⭐ Good growth, performing well',
    average: '✅ Average growth, meets expectations',
    normalGrowth: '➡️ Normal growth, close to average',
    poor: '⚠️ Needs improvement, below expectations',
    fixed: '🔒 Fixed value, not included in scoring',
  },

  help: {
    title: '🐾 Help Guide',
    usage: 'How to Use',
    calculation: 'Calculation Logic',
    ratingSystem: 'Rating System',

    steps: {
      title: '🚀 Usage Steps',
      step1: 'Select your pet type',
      step2: 'Enter pet level (1-15)',
      step3: 'Enter attribute values (⚠️Please deduct skill bonuses)',
      step4: 'Click calculate button to view rating',
    },

    baseData: {
      title: '🎯 Pet Base Data',
    },

    calculationPrinciple: {
      title: '🧮 Calculation Logic',
      upgradeRates: 'Upgrade Rates',
      mainStat: 'Main Stat: +1(5%), +2(15%), +3(30%), +4(20%), +5(15%), +6(10%), +7(5%)',
      mainStatExpected: 'Expected: +3.75 per level',
      subStat: 'Sub Stat: +0(15%), +1(50%), +2(30%), +3(5%)',
      subStatExpected: 'Expected: +1.25 per level',
      formula: 'Rating Formula',
      formula1: '1. Calculate Expected Value',
      formula1Desc: 'Expected = Base + (Level-1) × Expected Growth per Level',
      formula2: '2. Calculate Growth Rate',
      formula2Desc: 'Growth Rate = (Current - Base) ÷ (Expected - Base)',
      formula3: '3. Main Stat Weighting',
      formula3Desc: 'Main stat score × 1.5 multiplier',
    },
  },

  jobChange: {
    title: 'Class Change Calculator',
    subtitle: 'Accurate calculation of materials and costs for class change',
    selectSubtype: 'Select Specific Type',
    selectQuality: 'Select Quality',
    emptyCart: 'No calculation items selected',
    emptyCartHint: 'Use the selector above to add class change items',
    packageDiscount: 'Class Change Coin Package',
    packageNote: 'Check to save 300 class change coins',
    cashEquipmentCost: 'Cash Equipment Class Change Coins',

    tabs: {
      simple: 'Simple Calculator',
      detailed: 'Detailed Calculator',
      cart: 'Calculation Items Mode',
    },

    categories: {
      equipment: 'Equipment',
      weapon: 'Weapon',
      armor: 'Armor',
      accessory: 'Accessory',
      skill: 'Skill',
      spell: 'Spell Card',
      cash: 'Cash Equipment',
    },

    quality: {
      rare: 'Rare',
      hero: 'Hero',
      legend: 'Legend',
      mythic: 'Mythic',
      cash: 'Cash',
    },

    cost: {
      baseCost: 'Base Class Change Cost',
      coinCost: 'Class Change Coin Cost',
      packageDiscount: 'Package Discount',
      finalCost: 'Final Cost',
      totalCost: 'Total Cost',
    },

    cart: {
      addToCart: 'Add to Calculation',
      removeFromCart: 'Remove',
      clearCart: 'Clear Calculation Items',
      cartItems: 'Calculation Items List',
      totalItems: 'Total Items',
      calculate: 'Calculate Total Cost',
    },

    validation: {
      maxWeaponExceeded: 'Total weapons across all qualities cannot exceed 3',
      maxArmorExceeded: 'Total armor across all qualities cannot exceed 14',
      maxAccessoryExceeded: 'Total accessories across all qualities cannot exceed 9',
      invalidQuantity: 'Quantity must be a positive integer',
      exceedsLimit: 'Exceeds quantity limit',
    },
  },

  modal: {
    info: {
      title: 'Information',
      equipmentCost: 'Equipment Class Change Coin Cost',
      skillCost: 'Skill Class Change Coin Cost',
      spellCost: 'Spell Card Class Change Coin Cost',
    },
  },

  notifications: {
    success: 'Operation successful',
    error: 'Operation failed',
    warning: 'Warning',
    info: 'Information',
    calculationComplete: 'Calculation complete',
    dataLoaded: 'Data loaded successfully',
    languageChanged: 'Language switched',
  },
}

export default en

/**
 * Korean translation file
 * Migrated from assets/js/modules/languages/ko.js
 */
import type { TranslationSchema } from './types'

const ko: TranslationSchema = {
  common: {
    calculate: '🧮 펫 능력치 계산',
    help: '❓ 도움말',
    close: '닫기',
    level: '펫 레벨',
    currentValue: '현재값',
    baseValue: '기본값',
    growthValue: '성장값',
    expectedValue: '기댓값',
    characterBonus: '캐릭터 보너스',
    rating: '평가',
    contact: '📝문의하기',
    language: '🌐 언어',
    quantity: '수량:',
    loading: '로딩 중...',
    reset: '초기화',
    error: '오류 발생',
    confirm: '확인',
    cancel: '취소',
    save: '저장',
    delete: '삭제',
    edit: '편집',
    view: '보기',
    back: '뒤로',
    next: '다음',
    previous: '이전',
    submit: '제출',
    new: '새로운',
    viewDetails: '자세한 설명 보기',
    history: '계산 기록',
    clearHistory: '기록 삭제',
    score: '점',
    toggleTheme: '테마 전환',
    startNow: '지금 시작',
    comingSoon: '곧 출시 예정',
  },

  currency: {
    diamond: '다이아',
    coin: '개',
    diamondUnit: '다이아',
    coinUnit: '개',
  },

  title: {
    main: '⚔️ 리니지W 종합 계산기',
    subtitle: '전문 게임 보조 도구',
  },

  nav: {
    home: '🏠 홈',
    petEvaluate: '🐾 펫 평가 시스템',
    jobChangeCalculator: '💎 전직 비용 계산기',
    moreFeatures: '🚀 더 많은 기능',
  },

  home: {
    welcome: {
      title: '전문 게임 도구에 오신 것을 환영합니다',
      subtitle:
        '정확한 펫 평가 및 전직 계산 서비스를 제공하여 리니지W에서 최적의 결정을 내릴 수 있도록 도와드립니다',
    },

    announcement: {
      title: '시스템 공지',
      content: '전문 게임 보조 계산 도구, 지속적으로 업데이트 중...',
    },

    features: {
      title: '기능 목록',
      petEvaluate: {
        title: '펫 평가 시스템',
        desc: '펫의 능력치를 정확하게 평가하고 성장 잠재력과 가치를 분석합니다',
        btn: '평가 시작 →',
      },
      jobChange: {
        title: '전직 비용 계산기',
        desc: '전직에 필요한 재료와 비용을 계산하고 가장 경제적인 전직 경로를 계획합니다',
        btn: '계산 시작 →',
      },
      moreComing: {
        title: '더 많은 기능',
        desc: '더 많은 기능이 개발 중입니다...',
        btn: '곧 출시 예정',
      },
    },

    howToUse: {
      title: '사용 방법',
      step1: {
        title: '기능 선택',
        desc: '필요한 계산 기능을 선택하세요',
      },
      step2: {
        title: '데이터 입력',
        desc: '안내에 따라 관련 데이터를 입력하세요',
      },
      step3: {
        title: '결과 확인',
        desc: '상세한 분석 결과를 확인하세요',
      },
    },

    news: {
      title: '📢 최신 소식',
      item1: {
        title: '✨ V3.0 메이저 업데이트',
        content:
          'Vue 3 + TypeScript를 사용한 완전한 아키텍처 재구축으로 더 나은 성능과 사용자 경험 제공',
      },
      item2: {
        title: '🔧 기능 최적화',
        content: '전직 계산기 로직 최적화, 장바구니 기능 및 상세 비용 분석 추가',
      },
      item3: {
        title: '🌍 다국어 지원',
        content: '번체 중국어, 영어, 한국어 삼개국어 시스템 완성 및 동적 언어 전환 지원',
      },
    },

    stats: {
      title: '📊 사용 통계',
      petEvaluations: '펫 평가 횟수',
      jobCalculations: '전직 계산 횟수',
      languages: '지원 언어',
      version: '현재 버전',
    },

    guide: {
      title: '🚀 빠른 시작',
      step1: {
        title: '기능 선택',
        desc: '상단 네비게이션이나 기능 카드에서 필요한 계산기를 선택하세요',
      },
      step2: {
        title: '데이터 입력',
        desc: '인터페이스 안내에 따라 펫 능력치나 전직 요구사항을 입력하세요',
      },
      step3: {
        title: '결과 확인',
        desc: '상세한 계산 결과와 권장사항을 확인하세요',
      },
    },
  },

  pets: {
    select: '펫 선택',
    subtitle: '펫의 성장 잠재력과 평가 계산',
    wolf: '늑대',
    dog: '도베르만',
    shepherd: '셰퍼드',
    hound: '비글',
    wolfDesc: '주능력: 체력(HP)',
    dogDesc: '주능력: 충성심(명중)',
    shepherdDesc: '주능력: 인내력(물방)',
    houndDesc: '주능력: 속도(회피)',
    mainStat: '주능력',
  },

  stats: {
    title: '현재 능력치',
    warning: '⚠️ 스킬 보너스를 제외한 능력치를 입력해주세요',
    endurance: '인내력',
    loyalty: '충성심',
    speed: '속도',
    aggressiveness: '공격성',
    hp: '체력',
    enduranceDesc: '5포인트=물리방어력1',
    loyaltyDesc: '5포인트=명중률1',
    speedDesc: '10포인트=회피1',
    aggressivenessDesc: '3포인트=공격력1',
    hpDesc: '1포인트=HP30',
    aggressivenessNote: '※공격성은 3으로 고정되며 레벨업하지 않습니다',
  },

  results: {
    title: '계산 결과',
    waiting: '계산 대기',
    waitingDesc: '위의 수치 입력을 완료하면, 펫 평가 결과가 여기에 표시됩니다.',
    overallRating: '종합 평가',
    attribute: '능력치',
  },

  ratings: {
    excellent: '최고급',
    good: '우수',
    average: '양호',
    normal: '보통',
    poor: '개선 필요',
    bad: '나쁨',
    fixed: '고정값',
    godTier: '신급 펫',
    highQuality: '고품질 펫',
    normalPet: '일반 펫',
    needImprovement: '개선 필요',
    tragic: '비극',
    poorQuality: '품질 불량',
  },

  descriptions: {
    godTier:
      '🌟 신급 펫! 능력치 성장이 기댓값을 크게 초과하여 중점 육성할 가치가 있습니다! 극히 희귀한 최고급 펫입니다!',
    highQuality: '⭐ 고품질 펫! 능력치 성장이 평균 수준을 초과하여 지속적인 육성을 권장합니다.',
    normal: '✅ 일반 펫, 능력치 성장이 기댓값에 부합하여 정상적으로 사용 가능합니다.',
    needImprovement:
      '⚠️ 이 펫의 성장이 평균 이하입니다. 강화하거나 더 좋은 대체재를 찾는 것을 권장합니다.',
    tragic: '💔 비극적인 펫, 능력치 성장이 극도로 나빠서 재육성이나 교체를 강력히 권장합니다.',
    excellent: '🌟 최고급 성장, 기댓값을 크게 초과!',
    good: '⭐ 우수한 성장, 좋은 성과',
    average: '✅ 양호한 성장, 기댓값에 부합',
    normalGrowth: '➡️ 보통 성장, 평균에 근접',
    poor: '⚠️ 개선 필요, 기댓값 이하',
    fixed: '🔒 고정값, 점수에 포함되지 않음',
  },

  help: {
    title: '🐾 사용법 가이드',
    usage: '사용 방법',
    calculation: '계산 원리',
    ratingSystem: '평가 시스템',

    steps: {
      title: '🚀 사용 단계',
      step1: '펫 타입을 선택하세요',
      step2: '펫 레벨을 입력하세요 (1-15)',
      step3: '능력치 값을 입력하세요 (⚠️스킬 보너스 제외)',
      step4: '계산 버튼을 클릭하여 평가를 확인하세요',
    },

    baseData: {
      title: '🎯 펫 기본 데이터',
    },

    calculationPrinciple: {
      title: '🧮 계산 원리',
      upgradeRates: '업그레이드 확률',
      mainStat: '주능력: +1(5%), +2(15%), +3(30%), +4(20%), +5(15%), +6(10%), +7(5%)',
      mainStatExpected: '기댓값: 레벨당 +3.75포인트',
      subStat: '부능력: +0(15%), +1(50%), +2(30%), +3(5%)',
      subStatExpected: '기댓값: 레벨당 +1.25포인트',
      formula: '평가 공식',
      formula1: '1. 기댓값 계산',
      formula1Desc: '기댓값 = 기본값 + (레벨-1) × 레벨당 기대 성장',
      formula2: '2. 성장률 계산',
      formula2Desc: '성장률 = (현재값 - 기본값) ÷ (기댓값 - 기본값)',
      formula3: '3. 주능력 가중치',
      formula3Desc: '주능력 점수 × 1.5배 가중치',
    },
  },

  jobChange: {
    title: '전직 비용 계산기',
    subtitle: '전직에 필요한 재료와 비용의 정확한 계산',
    selectSubtype: '구체적 유형 선택',
    selectQuality: '품질 선택',
    emptyCart: '선택된 계산 항목이 없습니다',
    emptyCartHint: '위의 선택기를 사용하여 전직 아이템을 추가하세요',
    packageDiscount: '전직 코인 패키지',
    packageNote: '체크하면 전직 코인 300개를 절약할 수 있습니다',
    cashEquipmentCost: '캐시 장비 전직 코인',

    tabs: {
      simple: '간단 계산기',
      detailed: '상세 계산기',
      cart: '계산 항목 모드',
    },

    categories: {
      equipment: '장비',
      weapon: '무기',
      armor: '방어구',
      accessory: '액세서리',
      skill: '스킬',
      spell: '마법 카드',
      cash: '캐시 장비',
    },

    quality: {
      rare: '레어',
      hero: '영웅',
      legend: '전설',
      mythic: '신화',
      cash: '캐시',
    },

    cost: {
      baseCost: '기본 전직 비용',
      coinCost: '전직 코인 비용',
      packageDiscount: '패키지 할인',
      finalCost: '최종 비용',
      totalCost: '총 비용',
    },

    cart: {
      addToCart: '계산에 추가',
      removeFromCart: '제거',
      clearCart: '계산 항목 지우기',
      cartItems: '계산 항목 목록',
      totalItems: '총 항목 수',
      calculate: '총 비용 계산',
    },

    validation: {
      maxWeaponExceeded: '모든 등급 무기 총합은 3개를 초과할 수 없습니다',
      maxArmorExceeded: '모든 등급 방어구 총합은 14개를 초과할 수 없습니다',
      maxAccessoryExceeded: '모든 등급 액세서리 총합은 9개를 초과할 수 없습니다',
      invalidQuantity: '수량은 양의 정수여야 합니다',
      exceedsLimit: '수량 제한을 초과했습니다',
    },
  },

  modal: {
    info: {
      title: '정보',
      equipmentCost: '장비 전직 코인 소모량',
      skillCost: '스킬 전직 코인 소모량',
      spellCost: '마법 카드 전직 코인 소모량',
    },
  },

  notifications: {
    success: '작업 성공',
    error: '작업 실패',
    warning: '경고',
    info: '정보',
    calculationComplete: '계산 완료',
    dataLoaded: '데이터 로드 완료',
    languageChanged: '언어가 변경되었습니다',
  },
}

export default ko

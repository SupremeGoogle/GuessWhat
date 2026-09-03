import { LevelInfo } from '../types';

export const INITIAL_LEVELS: LevelInfo[] = [
  {
    id: 1,
    title: 'Кто тяжелее?',
    subtitle: 'Сравни массу',
    icon: '⚖️',
    isUnlocked: true,
    stars: 0,
    highScore: 0,
    category: 'Животные',
    property: 'Масса',
    unit: 'кг',
    comparisonType: 'max'
  },
  {
    id: 2,
    title: 'Кто быстрее?',
    subtitle: 'Скоростные чемпионы',
    icon: '⚡',
    isUnlocked: true,
    stars: 0,
    highScore: 0,
    category: 'Скорость',
    property: 'Макс. скорость',
    unit: 'км/ч',
    comparisonType: 'max'
  },
  {
    id: 3,
    title: 'Что древнее?',
    subtitle: 'Год создания',
    icon: '⏳',
    isUnlocked: true,
    stars: 0,
    highScore: 0,
    category: 'История',
    property: 'Год',
    unit: '',
    comparisonType: 'min'
  },
  {
    id: 4,
    title: 'Что больше?',
    subtitle: 'Высота или длина',
    icon: '📏',
    isUnlocked: true,
    stars: 0,
    highScore: 0,
    category: 'Размеры',
    property: 'Длина/Высота',
    unit: 'м',
    comparisonType: 'max'
  },
  {
    id: 5,
    title: 'Что горячее?',
    subtitle: 'Температура',
    icon: '🔥',
    isUnlocked: true,
    stars: 0,
    highScore: 0,
    category: 'Физика',
    property: 'Температура',
    unit: '°C',
    comparisonType: 'max'
  },
  {
    id: 6,
    title: 'Где глубже?',
    subtitle: 'Морские глубины',
    icon: '🌊',
    isUnlocked: true,
    stars: 0,
    highScore: 0,
    category: 'География',
    property: 'Глубина',
    unit: 'м',
    comparisonType: 'max'
  },
  {
    id: 7,
    title: 'Что дороже?',
    subtitle: 'Сравни цены',
    icon: '💰',
    isUnlocked: true,
    stars: 0,
    highScore: 0,
    category: 'Экономика',
    property: 'Цена',
    unit: '$',
    comparisonType: 'max'
  },
  {
    id: 8,
    title: 'Кто живет дольше?',
    subtitle: 'Продолжительность жизни',
    icon: '⏳',
    isUnlocked: true,
    stars: 0,
    highScore: 0,
    category: 'Природа',
    property: 'Срок жизни',
    unit: 'лет',
    comparisonType: 'max'
  },
  {
    id: 9,
    title: 'Что громче?',
    subtitle: 'Уровень шума',
    icon: '🔊',
    isUnlocked: true,
    stars: 0,
    highScore: 0,
    category: 'Физика',
    property: 'Громкость',
    unit: 'дБ',
    comparisonType: 'max'
  },
  {
    id: 10,
    title: 'Что калорийнее?',
    subtitle: 'Энергия еды',
    icon: '🍔',
    isUnlocked: true,
    stars: 0,
    highScore: 0,
    category: 'Еда',
    property: 'Калорийность',
    unit: 'ккал',
    comparisonType: 'max'
  },
  {
    id: 11,
    title: 'Что выше?',
    subtitle: 'Высота строений',
    icon: '🏙️',
    isUnlocked: true,
    stars: 0,
    highScore: 0,
    category: 'Архитектура',
    property: 'Высота',
    unit: 'м',
    comparisonType: 'max'
  }
];

INITIAL_LEVELS.push({
  id: 12,
  title: 'Кто ядовитее?',
  subtitle: 'Опасность ядов животных',
  icon: '☠️',
  // Не разблокирован по умолчанию — открывается игроком через
  // UNLOCK_NEXT_LEVEL_STARS при прохождении уровня 11 (см. App.tsx).
  isUnlocked: false,
  stars: 0,
  highScore: 0,
  category: 'Природа',
  property: 'Индекс токсичности',
  unit: 'баллы',
  comparisonType: 'max'
});

INITIAL_LEVELS.push({
  id: 13,
  title: 'Кто дольше вынашивает?',
  subtitle: 'Сроки беременности животных',
  icon: '🤰',
  // Не разблокирован по умолчанию — открывается игроком через
  // UNLOCK_NEXT_LEVEL_STARS при прохождении уровня 12 (см. App.tsx).
  isUnlocked: false,
  stars: 0,
  highScore: 0,
  category: 'Биология',
  property: 'Срок беременности',
  unit: 'дней',
  comparisonType: 'max'
});

INITIAL_LEVELS.push({
  id: 14,
  title: 'У кого крылья шире?',
  subtitle: 'Размах крыльев птиц',
  icon: '🦅',
  // Не разблокирован по умолчанию — открывается игроком через
  // UNLOCK_NEXT_LEVEL_STARS при прохождении уровня 13 (см. App.tsx).
  isUnlocked: false,
  stars: 0,
  highScore: 0,
  category: 'Природа',
  property: 'Размах крыльев',
  unit: 'см',
  comparisonType: 'max'
});

INITIAL_LEVELS.push({
  id: 15,
  title: 'Кто спит дольше?',
  subtitle: 'Продолжительность сна животных',
  icon: '😴',
  // Не разблокирован по умолчанию — открывается игроком через
  // UNLOCK_NEXT_LEVEL_STARS при прохождении уровня 14 (см. App.tsx).
  isUnlocked: false,
  stars: 0,
  highScore: 0,
  category: 'Природа',
  property: 'Сон',
  unit: 'ч',
  comparisonType: 'max'
});

// Add placeholder locked levels for the rest up to 30
for (let i = 16; i <= 30; i++) {
  INITIAL_LEVELS.push({
    id: i,
    title: 'Секретный уровень',
    subtitle: 'Скоро появится',
    icon: '🔒',
    isUnlocked: false,
    stars: 0,
    highScore: 0,
    category: 'Секрет',
    property: '???',
    unit: '',
    comparisonType: 'max'
  });
}

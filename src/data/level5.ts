import { GameItem } from '../types';

export const LEVEL5_DATA: GameItem[] = [
  {
    id: 'sun-surface',
    nameRu: 'Поверхность Солнца',
    nameEn: 'Sun Surface',
    value: 5500,
    displayValue: '5,500 °C',
    emoji: '☀️',
    imageUri: 'https://images.unsplash.com/photo-1532054921601-52e697d022b7?auto=format&fit=crop&w=800&q=80',
    category: 'Космос',
    funFact: 'Температура внутри ядра Солнца достигает 15 миллионов градусов!'
  },
  {
    id: 'lava',
    nameRu: 'Вулканическая лава',
    nameEn: 'Lava',
    value: 1200,
    displayValue: '1,200 °C',
    emoji: '🌋',
    imageUri: 'https://images.unsplash.com/photo-1549405021-3fc7d4949505?auto=format&fit=crop&w=800&q=80',
    category: 'Природа',
    funFact: 'Лава может течь со скоростью до 30 км/ч на крутых склонах.'
  },
  {
    id: 'boiling-water',
    nameRu: 'Кипящая вода',
    nameEn: 'Boiling Water',
    value: 100,
    displayValue: '100 °C',
    emoji: '🫖',
    imageUri: 'https://images.unsplash.com/photo-1579975096649-e773152b04df?auto=format&fit=crop&w=800&q=80',
    category: 'Физика',
    funFact: 'На вершине Эвереста вода закипает уже при 68 °C из-за низкого давления.'
  },
  {
    id: 'human-body',
    nameRu: 'Тело человека',
    nameEn: 'Human Body',
    value: 36.6,
    displayValue: '36.6 °C',
    emoji: '🧍',
    imageUri: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80',
    category: 'Биология',
    funFact: 'Нормальная температура тела может колебаться в течение дня.'
  },
  {
    id: 'liquid-nitrogen',
    nameRu: 'Жидкий азот',
    nameEn: 'Liquid Nitrogen',
    value: -196,
    displayValue: '-196 °C',
    emoji: '❄️',
    imageUri: 'https://images.unsplash.com/photo-1582299863412-1f4864a78a63?auto=format&fit=crop&w=800&q=80',
    category: 'Химия',
    funFact: 'При контакте с теплым воздухом моментально закипает, образуя густой туман.'
  },
  {
    id: 'lightning',
    nameRu: 'Молния',
    nameEn: 'Lightning',
    value: 30000,
    displayValue: '30,000 °C',
    emoji: '⚡',
    imageUri: 'https://images.unsplash.com/photo-1605722243979-fe0be8158232?auto=format&fit=crop&w=800&q=80',
    category: 'Погода',
    funFact: 'В 5 раз горячее поверхности Солнца!'
  },
  {
    id: 'dry-ice',
    nameRu: 'Сухой лед',
    nameEn: 'Dry Ice',
    value: -78.5,
    displayValue: '-78.5 °C',
    emoji: '🧊',
    imageUri: 'https://images.unsplash.com/photo-1596701192770-983050fbcecc?auto=format&fit=crop&w=800&q=80',
    category: 'Химия',
    funFact: 'Твердая форма углекислого газа (CO2), переходит в газ минуя жидкую фазу.'
  },
  {
    id: 'oven',
    nameRu: 'Духовка (макс)',
    nameEn: 'Oven',
    value: 250,
    displayValue: '250 °C',
    emoji: '🍳',
    imageUri: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80',
    category: 'Быт',
    funFact: 'Идеальная температура для выпекания пиццы в дровяной печи — более 400 °C, но в домашней духовке обычно 250 °C.'
  },
  {
    id: 'absolute-zero',
    nameRu: 'Абсолютный нуль',
    nameEn: 'Absolute Zero',
    value: -273.15,
    displayValue: '-273.15 °C',
    emoji: '🌌',
    imageUri: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
    category: 'Физика',
    funFact: 'Температура, при которой замирает движение атомов.'
  },
  {
    id: 'candle-flame',
    nameRu: 'Пламя свечи',
    nameEn: 'Candle Flame',
    value: 1400,
    displayValue: '1,400 °C',
    emoji: '🕯️',
    imageUri: 'https://images.unsplash.com/photo-1522067784013-4f2757262174?auto=format&fit=crop&w=800&q=80',
    category: 'Химия',
    funFact: 'Самая горячая часть пламени свечи находится в самом верху и светится голубым цветом.'
  },
  { id: 'water_boil', nameRu: 'Кипящая вода', nameEn: 'Boiling Water', value: 100, displayValue: '100 °C', emoji: '☕', imageUri: 'https://images.unsplash.com/photo-1579298547228-3e4b7858c2b7?w=800&q=80', category: 'Вещества', funFact: 'Закипает при 100°C на уровне моря.' },
  { id: 'human_body', nameRu: 'Тело человека', nameEn: 'Human Body', value: 36.6, displayValue: '36.6 °C', emoji: '🧑', imageUri: 'https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?w=800&q=80', category: 'Биология', funFact: 'Нормальная температура здорового человека.' },
  { id: 'ice', nameRu: 'Лед', nameEn: 'Ice', value: 0, displayValue: '0 °C', emoji: '🧊', imageUri: 'https://images.unsplash.com/photo-1550269098-b8ce1bf46091?w=800&q=80', category: 'Вещества', funFact: 'Точка замерзания пресной воды.' },
  { id: 'absolute_zero', nameRu: 'Абсолютный нуль', nameEn: 'Absolute Zero', value: -273.15, displayValue: '-273.15 °C', emoji: '❄️', imageUri: 'https://images.unsplash.com/photo-1520690214124-2405c52171fa?w=800&q=80', category: 'Физика', funFact: 'Минимально возможная температура.' },
  { id: 'dry_ice', nameRu: 'Сухой лед', nameEn: 'Dry Ice', value: -78.5, displayValue: '-78.5 °C', emoji: '💨', imageUri: 'https://images.unsplash.com/photo-1582215264377-506be4722511?w=800&q=80', category: 'Вещества', funFact: 'Твердый углекислый газ.' },
  { id: 'liquid_nitrogen', nameRu: 'Жидкий азот', nameEn: 'Liquid Nitrogen', value: -196, displayValue: '-196 °C', emoji: '🥶', imageUri: 'https://images.unsplash.com/photo-1610427847953-f4c022de6dc1?w=800&q=80', category: 'Вещества', funFact: 'Используется для быстрой заморозки.' },
  { id: 'paper_burn', nameRu: 'Горение бумаги', nameEn: 'Burning Paper', value: 232, displayValue: '232 °C', emoji: '📄', imageUri: 'https://images.unsplash.com/photo-1525081905268-fc0b46e9d786?w=800&q=80', category: 'Химия', funFact: 'Температура самовоспламенения бумаги по Редбери (451 по Фаренгейту).' },
  { id: 'magma', nameRu: 'Магма', nameEn: 'Magma', value: 1200, displayValue: '1200 °C', emoji: '🌋', imageUri: 'https://images.unsplash.com/photo-1587309995547-062e787d5598?w=800&q=80', category: 'Геология', funFact: 'Лава становится магмой под землей.' },
  { id: 'oven', nameRu: 'Духовка (макс)', nameEn: 'Oven', value: 250, displayValue: '250 °C', emoji: '🍳', imageUri: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&q=80', category: 'Быт', funFact: 'Стандартный максимум бытовой духовки.' },
  { id: 'pizza_oven', nameRu: 'Печь для пиццы', nameEn: 'Pizza Oven', value: 450, displayValue: '450 °C', emoji: '🍕', imageUri: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80', category: 'Кулинария', funFact: 'Настоящая неаполитанская пицца печется 90 секунд.' },
  { id: 'light_bulb_tungsten', nameRu: 'Нить накаливания', nameEn: 'Tungsten Bulb', value: 2500, displayValue: '2500 °C', emoji: '💡', imageUri: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&q=80', category: 'Технологии', funFact: 'Нить из вольфрама светится от нагрева.' },
  { id: 'candle_flame', nameRu: 'Пламя свечи', nameEn: 'Candle Flame', value: 1000, displayValue: '1000 °C', emoji: '🕯️', imageUri: 'https://images.unsplash.com/photo-1507316049065-031e505cc3e8?w=800&q=80', category: 'Химия', funFact: 'Самая горячая часть пламени невидима.' },
  { id: 'sun_core', nameRu: 'Ядро Солнца', nameEn: 'Sun Core', value: 15000000, displayValue: '15 млн °C', emoji: '☀️', imageUri: 'https://images.unsplash.com/photo-1532667449560-72a95c8d381b?w=800&q=80', category: 'Космос', funFact: 'Происходит термоядерный синтез.' },
  { id: 'lightning', nameRu: 'Молния', nameEn: 'Lightning', value: 30000, displayValue: '30 000 °C', emoji: '⚡', imageUri: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0ce49?w=800&q=80', category: 'Природа', funFact: 'В 5 раз горячее поверхности Солнца.' },
  { id: 'iron_melt', nameRu: 'Плавление железа', nameEn: 'Melting Iron', value: 1538, displayValue: '1538 °C', emoji: '⚙️', imageUri: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80', category: 'Химия', funFact: 'Требуются мощные доменные печи.' }
];

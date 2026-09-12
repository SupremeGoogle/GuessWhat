import { GameItem } from '../types';

export const LEVEL5_DATA: GameItem[] = [
  {
    id: 'sun-surface',
    nameRu: 'Поверхность Солнца',
    nameEn: 'Sun Surface',
    value: 5500,
    displayValue: '5,500 °C',
    emoji: '☀️',
    imageUri: '',
    category: 'Космос',
    funFact: 'Фотосфера — видимая поверхность Солнца, которую мы наблюдаем с Земли; это самый холодный слой звезды.'
  },
  {
    id: 'lava',
    nameRu: 'Вулканическая лава',
    nameEn: 'Lava',
    value: 1200,
    displayValue: '1,200 °C',
    emoji: '🌋',
    imageUri: '',
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
    imageUri: '',
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
    imageUri: '/images/human_body_1786533802069.jpg',
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
    imageUri: '',
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
    imageUri: '/images/lightning_1786533818965.jpg',
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
    imageUri: '/images/dry_ice_1786531936935.jpg',
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
    imageUri: '/images/oven_1786533822324.jpg',
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
    imageUri: '/images/absolute_zero_1786531985065.jpg',
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
    imageUri: '/images/candle_flame_1786533824833.jpg',
    category: 'Химия',
    funFact: 'Самая горячая часть пламени свечи находится в самом верху и светится голубым цветом.'
  },
  { id: 'ice', nameRu: 'Лед', nameEn: 'Ice', value: 0, displayValue: '0 °C', emoji: '🧊', imageUri: '/images/ice_1786533843706.jpg', category: 'Вещества', funFact: 'Точка замерзания пресной воды.' },
  { id: 'paper_burn', nameRu: 'Горение бумаги', nameEn: 'Burning Paper', value: 232, displayValue: '232 °C', emoji: '📄', imageUri: '/images/paper_1786533669760.jpg', category: 'Химия', funFact: 'Температура самовоспламенения бумаги по Брэдбери (451 по Фаренгейту).' },
  { id: 'magma', nameRu: 'Магма', nameEn: 'Magma', value: 1300, displayValue: '1300 °C', emoji: '🌋', imageUri: '/images/magma_1786532042428.jpg', category: 'Геология', funFact: 'Становится лавой, когда извергается на поверхность земли, и немного остывает по пути.' },
  { id: 'pizza_oven', nameRu: 'Печь для пиццы', nameEn: 'Pizza Oven', value: 450, displayValue: '450 °C', emoji: '🍕', imageUri: '', category: 'Кулинария', funFact: 'Настоящая неаполитанская пицца печется 90 секунд.' },
  { id: 'light_bulb_tungsten', nameRu: 'Нить накаливания', nameEn: 'Tungsten Bulb', value: 2500, displayValue: '2500 °C', emoji: '💡', imageUri: '', category: 'Технологии', funFact: 'Нить из вольфрама светится от нагрева.' },
  { id: 'sun_core', nameRu: 'Ядро Солнца', nameEn: 'Sun Core', value: 15000000, displayValue: '15 млн °C', emoji: '☀️', imageUri: '', category: 'Космос', funFact: 'Происходит термоядерный синтез.' },
  { id: 'iron_melt', nameRu: 'Плавление железа', nameEn: 'Melting Iron', value: 1538, displayValue: '1538 °C', emoji: '⚙️', imageUri: '', category: 'Химия', funFact: 'Требуются мощные доменные печи.' }
];

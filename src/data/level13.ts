import { GameItem } from '../types';

/**
 * Уровень 13 — «Кто дольше вынашивает потомство?».
 *
 * `value` / `displayValue` — средний срок беременности (гестации) вида в
 * днях. Для видов с задержанной имплантацией (бурый медведь, большая
 * панда) указан весь срок от спаривания до родов, а не только период
 * активного развития эмбриона — так его обычно и приводят в справочниках
 * по биологии.
 *
 * Точные цифры по конкретной особи всегда варьируются (порода, возраст,
 * количество детёнышей в помёте), поэтому здесь — общепринятые средние
 * значения из зоологических источников, а не лабораторные измерения.
 * Без доступа в интернет для сверки первоисточников выбраны только те
 * виды и цифры, что устойчиво повторяются в общеизвестных фактах о
 * продолжительности беременности животных (см. `funFact`).
 *
 * `imageUri` заполнен только там, где в `public/images/` уже есть
 * подходящее локальное фото (переиспользуются ассеты других уровней);
 * для остальных карточек — emoji-фолбэк, как и в `level8.ts`/`level12.ts`.
 */
export const LEVEL13_DATA: GameItem[] = [
  {
    id: 'african_elephant',
    nameRu: 'Африканский слон',
    nameEn: 'African Elephant',
    value: 660,
    displayValue: '660 дней',
    emoji: '🐘',
    imageUri: '/images/african_elephant_1786116449273.jpg',
    category: 'Млекопитающие',
    funFact: 'Самая долгая беременность среди всех наземных млекопитающих — почти 22 месяца.'
  },
  {
    id: 'white_rhino',
    nameRu: 'Белый носорог',
    nameEn: 'White Rhinoceros',
    value: 485,
    displayValue: '485 дней',
    emoji: '🦏',
    imageUri: '/images/white_rhino_1786116576993.jpg',
    category: 'Млекопитающие',
    funFact: 'Самка вынашивает детёныша около 16 месяцев и рожает обычно одного телёнка.'
  },
  {
    id: 'giraffe',
    nameRu: 'Жираф',
    nameEn: 'Giraffe',
    value: 457,
    displayValue: '457 дней',
    emoji: '🦒',
    imageUri: '/images/giraffe_1786116600275.jpg',
    category: 'Млекопитающие',
    funFact: 'Жирафята рождаются с высоты около двух метров — падение при родах их не травмирует.'
  },
  {
    id: 'dromedary_camel',
    nameRu: 'Одногорбый верблюд',
    nameEn: 'Dromedary Camel',
    value: 390,
    displayValue: '390 дней',
    emoji: '🐪',
    imageUri: '/images/camel_1786531352860.jpg',
    category: 'Млекопитающие',
    funFact: 'Вынашивание длится около 13 месяцев — дольше, чем почти у любого другого копытного.'
  },
  {
    id: 'donkey',
    nameRu: 'Домашний осёл',
    nameEn: 'Donkey',
    value: 365,
    displayValue: '365 дней',
    emoji: '🫏',
    imageUri: '',
    category: 'Млекопитающие',
    funFact: 'Беременность у ослицы длится около года — заметно дольше, чем у лошади.'
  },
  {
    id: 'horse',
    nameRu: 'Лошадь',
    nameEn: 'Horse',
    value: 340,
    displayValue: '340 дней',
    emoji: '🐎',
    imageUri: '/images/horse_1786531339365.jpg',
    category: 'Млекопитающие',
    funFact: 'Жеребёнок вынашивается около 11 месяцев и уже через час после рождения способен встать на ноги.'
  },
  {
    id: 'cow',
    nameRu: 'Корова',
    nameEn: 'Cattle',
    value: 283,
    displayValue: '283 дня',
    emoji: '🐄',
    imageUri: '/images/cow_1786531610675.jpg',
    category: 'Млекопитающие',
    funFact: 'Срок стельности у коровы очень близок к человеческому — около 9 месяцев.'
  },
  {
    id: 'human',
    nameRu: 'Человек',
    nameEn: 'Human',
    value: 280,
    displayValue: '280 дней',
    emoji: '🤰',
    imageUri: '/images/human_1786532482623.jpg',
    category: 'Приматы',
    funFact: 'Стандартный срок беременности принято считать 280 дней от первого дня последней менструации.'
  },
  {
    id: 'brown_bear',
    nameRu: 'Бурый медведь',
    nameEn: 'Brown Bear',
    value: 210,
    displayValue: '210 дней',
    emoji: '🐻',
    imageUri: '/images/grizzly_bear_1786531317351.jpg',
    category: 'Млекопитающие',
    funFact: 'Из-за задержанной имплантации эмбрион начинает активно развиваться только зимой, во время спячки самки.'
  },
  {
    id: 'goat',
    nameRu: 'Коза',
    nameEn: 'Goat',
    value: 150,
    displayValue: '150 дней',
    emoji: '🐐',
    imageUri: '',
    category: 'Млекопитающие',
    funFact: 'Козы часто приносят двойню или тройню за одну беременность длиной около 5 месяцев.'
  },
  {
    id: 'sheep',
    nameRu: 'Овца',
    nameEn: 'Sheep',
    value: 147,
    displayValue: '147 дней',
    emoji: '🐑',
    imageUri: '',
    category: 'Млекопитающие',
    funFact: 'Ягнята рождаются уже покрытые шерстью и способны следовать за отарой в первые же дни.'
  },
  {
    id: 'giant_panda',
    nameRu: 'Большая панда',
    nameEn: 'Giant Panda',
    value: 135,
    displayValue: '135 дней',
    emoji: '🐼',
    imageUri: '/images/panda_1786531626186.jpg',
    category: 'Млекопитающие',
    funFact: 'Из-за задержанной имплантации реальный срок беременности сильно колеблется у разных самок — от трёх до пяти месяцев.'
  },
  {
    id: 'pig',
    nameRu: 'Свинья',
    nameEn: 'Pig',
    value: 114,
    displayValue: '114 дней',
    emoji: '🐖',
    imageUri: '',
    category: 'Млекопитающие',
    funFact: 'Среди свиноводов срок беременности запоминают как «три месяца, три недели и три дня».'
  },
  {
    id: 'lion',
    nameRu: 'Лев',
    nameEn: 'Lion',
    value: 110,
    displayValue: '110 дней',
    emoji: '🦁',
    imageUri: '/images/lion_1786531607647.jpg',
    category: 'Дикие кошки',
    funFact: 'Львица вынашивает потомство около 3,5 месяцев и обычно приносит от двух до четырёх львят.'
  },
  {
    id: 'tiger',
    nameRu: 'Тигр',
    nameEn: 'Tiger',
    value: 103,
    displayValue: '103 дня',
    emoji: '🐯',
    imageUri: '/images/tiger_1786531609001.jpg',
    category: 'Дикие кошки',
    funFact: 'Тигрята рождаются слепыми и беспомощными и остаются с матерью до двух лет.'
  },
  {
    id: 'domestic_cat',
    nameRu: 'Домашняя кошка',
    nameEn: 'Domestic Cat',
    value: 64,
    displayValue: '64 дня',
    emoji: '🐈',
    imageUri: '/images/cat_1786533555179.jpg',
    category: 'Питомцы',
    funFact: 'Беременность длится около 9 недель — заметно короче, чем у большинства диких кошачьих.'
  },
  {
    id: 'red_kangaroo',
    nameRu: 'Рыжий кенгуру',
    nameEn: 'Red Kangaroo',
    value: 33,
    displayValue: '33 дня',
    emoji: '🦘',
    imageUri: '/images/kangaroo_1786531624079.jpg',
    category: 'Сумчатые',
    funFact: 'Крошечный детёныш рождается недоразвитым и почти год донашивается в сумке матери.'
  },
  {
    id: 'rabbit',
    nameRu: 'Кролик',
    nameEn: 'Rabbit',
    value: 31,
    displayValue: '31 день',
    emoji: '🐇',
    imageUri: '',
    category: 'Млекопитающие',
    funFact: 'Из-за короткого цикла размножения крольчиха способна забеременеть повторно уже через день после родов.'
  },
  {
    id: 'house_mouse',
    nameRu: 'Домовая мышь',
    nameEn: 'House Mouse',
    value: 20,
    displayValue: '20 дней',
    emoji: '🐭',
    imageUri: '/images/house_mouse_1786532472877.jpg',
    category: 'Млекопитающие',
    funFact: 'Один из самых коротких сроков беременности среди млекопитающих позволяет мышам размножаться очень быстро.'
  },
  {
    id: 'syrian_hamster',
    nameRu: 'Сирийский хомяк',
    nameEn: 'Syrian Hamster',
    value: 16,
    displayValue: '16 дней',
    emoji: '🐹',
    imageUri: '',
    category: 'Млекопитающие',
    funFact: 'Один из самых коротких сроков беременности среди всех млекопитающих на планете.'
  }
];

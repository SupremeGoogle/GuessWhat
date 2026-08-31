import { GameItem } from '../types';

/**
 * Уровень 14 — «У кого крылья шире?».
 *
 * `value` / `displayValue` — типичный размах крыльев вида в сантиметрах (у
 * самых крупных птиц берётся верхняя часть обычного диапазона, а не
 * единичный рекорд конкретной особи — как и у соседних уровней, где
 * измеряемый признак у вида варьируется).
 *
 * Как и в `level13.ts`, без доступа в интернет для сверки первоисточников
 * выбраны только те виды и цифры, что устойчиво повторяются в
 * общеизвестных фактах о размахе крыльев птиц (странствующий альбатрос —
 * крупнейший размах среди живых птиц, сапсан — самое быстрое живое
 * существо в пикировании и т.д., см. `funFact` каждой карточки).
 *
 * `imageUri` заполнен только там, где в `public/images/` уже есть
 * подходящее локальное фото (сапсан и африканский страус — переиспользуют
 * ассеты уровней 2 и 11); для остальных 18 карточек локальных фото птиц в
 * репозитории нет — используется emoji-фолбэк, как и в `level12.ts`.
 */
export const LEVEL14_DATA: GameItem[] = [
  {
    id: 'wandering_albatross',
    nameRu: 'Странствующий альбатрос',
    nameEn: 'Wandering Albatross',
    value: 340,
    displayValue: '340 см',
    emoji: '🐦',
    imageUri: '',
    category: 'Морские птицы',
    funFact: 'Обладает самым большим размахом крыльев среди всех живых птиц — способен часами парить над океаном, почти не взмахивая крыльями.'
  },
  {
    id: 'andean_condor',
    nameRu: 'Андский кондор',
    nameEn: 'Andean Condor',
    value: 310,
    displayValue: '310 см',
    emoji: '🦅',
    imageUri: '',
    category: 'Хищные птицы',
    funFact: 'Один из самых тяжёлых летающих хищников планеты — использует восходящие потоки воздуха, чтобы подолгу парить, почти не тратя сил на взмахи.'
  },
  {
    id: 'dalmatian_pelican',
    nameRu: 'Далматинский пеликан',
    nameEn: 'Dalmatian Pelican',
    value: 295,
    displayValue: '295 см',
    emoji: '🐦',
    imageUri: '',
    category: 'Водоплавающие птицы',
    funFact: 'Считается одной из самых тяжёлых летающих птиц мира — несмотря на массивное тело, легко парит на широких крыльях.'
  },
  {
    id: 'griffon_vulture',
    nameRu: 'Белоголовый сип',
    nameEn: 'Griffon Vulture',
    value: 275,
    displayValue: '275 см',
    emoji: '🦅',
    imageUri: '',
    category: 'Хищные птицы',
    funFact: 'Питается падалью и способен подниматься на высоту нескольких километров, высматривая добычу острым зрением.'
  },
  {
    id: 'marabou_stork',
    nameRu: 'Марабу',
    nameEn: 'Marabou Stork',
    value: 255,
    displayValue: '255 см',
    emoji: '🐦',
    imageUri: '',
    category: 'Птицы',
    funFact: 'Крупный африканский аист-падальщик с почти голой головой и шеей — это защищает перья от загрязнения при кормёжке падалью.'
  },
  {
    id: 'mute_swan',
    nameRu: 'Лебедь-шипун',
    nameEn: 'Mute Swan',
    value: 230,
    displayValue: '230 см',
    emoji: '🦢',
    imageUri: '',
    category: 'Водоплавающие птицы',
    funFact: 'Несмотря на грациозный вид на воде, в полёте издаёт характерный гудящий звук крыльями — его слышно за несколько сотен метров.'
  },
  {
    id: 'golden_eagle',
    nameRu: 'Беркут',
    nameEn: 'Golden Eagle',
    value: 210,
    displayValue: '210 см',
    emoji: '🦅',
    imageUri: '',
    category: 'Хищные птицы',
    funFact: 'Один из крупнейших орлов мира — в пикировании на добычу способен разгоняться до 240 км/ч.'
  },
  {
    id: 'common_crane',
    nameRu: 'Серый журавль',
    nameEn: 'Common Crane',
    value: 200,
    displayValue: '200 см',
    emoji: '🐦',
    imageUri: '',
    category: 'Птицы',
    funFact: 'Совершает одни из самых протяжённых перелётов среди европейских птиц, преодолевая тысячи километров между гнездованием и зимовкой.'
  },
  {
    id: 'ostrich',
    nameRu: 'Африканский страус',
    nameEn: 'Common Ostrich',
    value: 190,
    displayValue: '190 см',
    emoji: '🐦',
    imageUri: '/images/ostrich_1786533560273.jpg',
    category: 'Нелетающие птицы',
    funFact: 'Самая крупная живущая птица не умеет летать — крылья использует для баланса на бегу и в брачных танцах, а не для полёта.'
  },
  {
    id: 'grey_heron',
    nameRu: 'Серая цапля',
    nameEn: 'Grey Heron',
    value: 175,
    displayValue: '175 см',
    emoji: '🐦',
    imageUri: '',
    category: 'Птицы',
    funFact: 'В полёте складывает шею в характерную букву S — так цаплю узнают издалека, в отличие от журавлей, летящих с вытянутой шеей.'
  },
  {
    id: 'osprey',
    nameRu: 'Скопа',
    nameEn: 'Osprey',
    value: 160,
    displayValue: '160 см',
    emoji: '🦅',
    imageUri: '',
    category: 'Хищные птицы',
    funFact: 'Питается почти исключительно рыбой — ныряет в воду ногами вперёд и хватает добычу острыми когтями.'
  },
  {
    id: 'eagle_owl',
    nameRu: 'Филин',
    nameEn: 'Eurasian Eagle-Owl',
    value: 150,
    displayValue: '150 см',
    emoji: '🦉',
    imageUri: '',
    category: 'Совы',
    funFact: 'Один из крупнейших видов сов в мире — охотится преимущественно ночью благодаря почти бесшумному полёту и острому слуху.'
  },
  {
    id: 'common_raven',
    nameRu: 'Ворон',
    nameEn: 'Common Raven',
    value: 130,
    displayValue: '130 см',
    emoji: '🐦',
    imageUri: '',
    category: 'Врановые',
    funFact: 'Считается одной из самых умных птиц — способен решать задачи, использовать подручные предметы и запоминать лица людей.'
  },
  {
    id: 'peregrine_falcon',
    nameRu: 'Сапсан',
    nameEn: 'Peregrine Falcon',
    value: 100,
    displayValue: '100 см',
    emoji: '🦅',
    imageUri: '/images/falcon_1786531778213.jpg',
    category: 'Хищные птицы',
    funFact: 'Самое быстрое живое существо на Земле — в пикировании за добычей разгоняется свыше 300 км/ч.'
  },
  {
    id: 'rock_pigeon',
    nameRu: 'Сизый голубь',
    nameEn: 'Rock Pigeon',
    value: 68,
    displayValue: '68 см',
    emoji: '🕊️',
    imageUri: '',
    category: 'Городские птицы',
    funFact: 'Благодаря отличной ориентации по магнитному полю Земли исторически использовался для доставки сообщений на десятки и сотни километров.'
  },
  {
    id: 'golden_oriole',
    nameRu: 'Иволга',
    nameEn: 'Eurasian Golden Oriole',
    value: 45,
    displayValue: '45 см',
    emoji: '🐦',
    imageUri: '',
    category: 'Певчие птицы',
    funFact: 'Ярко-жёлтое оперение самца заметно издалека, но скрытный образ жизни в кронах деревьев — птицу чаще слышно, чем видно.'
  },
  {
    id: 'barn_swallow',
    nameRu: 'Деревенская ласточка',
    nameEn: 'Barn Swallow',
    value: 33,
    displayValue: '33 см',
    emoji: '🐦',
    imageUri: '',
    category: 'Певчие птицы',
    funFact: 'Проводит в полёте большую часть жизни — охотится на насекомых на лету и способна пить, не садясь на воду.'
  },
  {
    id: 'house_sparrow',
    nameRu: 'Домовый воробей',
    nameEn: 'House Sparrow',
    value: 22,
    displayValue: '22 см',
    emoji: '🐦',
    imageUri: '',
    category: 'Городские птицы',
    funFact: 'Одна из самых распространённых птиц мира — освоила почти все континенты, кроме Антарктиды, благодаря соседству с человеком.'
  },
  {
    id: 'goldcrest',
    nameRu: 'Королёк',
    nameEn: 'Goldcrest',
    value: 14,
    displayValue: '14 см',
    emoji: '🐦',
    imageUri: '',
    category: 'Певчие птицы',
    funFact: 'Один из самых маленьких видов птиц Европы — несмотря на размер, ежегодно перелетает через открытое море на зимовку.'
  },
  {
    id: 'ruby_throated_hummingbird',
    nameRu: 'Рубиновогорлый колибри',
    nameEn: 'Ruby-throated Hummingbird',
    value: 10,
    displayValue: '10 см',
    emoji: '🐦',
    imageUri: '',
    category: 'Колибри',
    funFact: 'Взмахивает крыльями до 50 раз в секунду и способен лететь не только вперёд, но и назад — редкое умение среди птиц.'
  }
];

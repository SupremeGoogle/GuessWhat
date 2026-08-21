import { GameItem } from '../types';

// Уровень 2 «Кто быстрее?» — максимальная зафиксированная скорость движения
// (км/ч) для 20 животных, отсортировано по убыванию для удобства чтения
// (тот же стиль, что и в src/data/level1.ts). Игровой экран переиспользует
// общий обобщённый компонент GameLevel (см. src/components/GameLevel.tsx),
// который уже используется всеми уровнями через App.tsx — под level 2
// отдельного компонента не требуется.
export const SPEEDS_DATA: GameItem[] = [
  {
    id: 'falcon',
    nameRu: 'Сапсан',
    nameEn: 'Peregrine Falcon',
    value: 390,
    displayValue: '390 км/ч',
    emoji: '🦅',
    imageUri: '/images/falcon_1786531778213.jpg',
    category: 'Птицы',
    funFact: 'В пикирующем полете сапсан — самое быстрое животное в мире!'
  },
  {
    id: 'cheetah',
    nameRu: 'Гепард',
    nameEn: 'Cheetah',
    value: 120,
    displayValue: '120 км/ч',
    emoji: '🐆',
    imageUri: '/images/cheetah_1786533592264.jpg',
    category: 'Наземные',
    funFact: 'Самое быстрое наземное животное на планете.'
  },
  {
    id: 'lion',
    nameRu: 'Лев',
    nameEn: 'Lion',
    value: 80,
    displayValue: '80 км/ч',
    emoji: '🦁',
    imageUri: '/images/lion_1786531818544.jpg',
    category: 'Наземные',
    funFact: 'Могут бежать быстро только на короткие дистанции.'
  },
  {
    id: 'greyhound',
    nameRu: 'Грейхаунд',
    nameEn: 'Greyhound',
    value: 72,
    displayValue: '72 км/ч',
    emoji: '🐕',
    imageUri: '/images/greyhound_1786531525915.jpg',
    category: 'Наземные',
    funFact: 'Самая быстрая порода собак.'
  },
  {
    id: 'moose',
    nameRu: 'Лось',
    nameEn: 'Moose',
    value: 72,
    displayValue: '72 км/ч',
    emoji: '🦌',
    imageUri: '/images/moose_1786533620365.jpg',
    category: 'Наземные',
    funFact: 'Бегают со скоростью автомобиля.'
  },
  {
    id: 'kangaroo',
    nameRu: 'Кенгуру',
    nameEn: 'Kangaroo',
    value: 71,
    displayValue: '71 км/ч',
    emoji: '🦘',
    imageUri: '/images/kangaroo_1786531816827.jpg',
    category: 'Наземные',
    funFact: 'Прыгают на 9 метров в длину.'
  },
  {
    id: 'horse',
    nameRu: 'Скаковая лошадь',
    nameEn: 'Racehorse',
    value: 70,
    displayValue: '70 км/ч',
    emoji: '🐎',
    imageUri: '/images/horse_1786533598872.jpg',
    category: 'Наземные',
    funFact: 'Способна скакать с огромной скоростью на коротких дистанциях.'
  },
  {
    id: 'coyote',
    nameRu: 'Койот',
    nameEn: 'Coyote',
    value: 65,
    displayValue: '65 км/ч',
    emoji: '🐺',
    imageUri: '/images/coyote_1786531533079.jpg',
    category: 'Наземные',
    funFact: 'Очень выносливые бегуны.'
  },
  {
    id: 'zebra',
    nameRu: 'Зебра',
    nameEn: 'Zebra',
    value: 65,
    displayValue: '65 км/ч',
    emoji: '🦓',
    imageUri: '/images/zebra_1786531536223.jpg',
    category: 'Наземные',
    funFact: 'Убегают от хищников зигзагами.'
  },
  {
    id: 'camel',
    nameRu: 'Верблюд',
    nameEn: 'Camel',
    value: 65,
    displayValue: '65 км/ч',
    emoji: '🐫',
    imageUri: '/images/camel_1786531569364.jpg',
    category: 'Наземные',
    funFact: 'Верблюжьи бега очень популярны.'
  },
  {
    id: 'giraffe',
    nameRu: 'Жираф',
    nameEn: 'Giraffe',
    value: 60,
    displayValue: '60 км/ч',
    emoji: '🦒',
    imageUri: '/images/giraffe_1786531833740.jpg',
    category: 'Наземные',
    funFact: 'Могут бежать галопом.'
  },
  {
    id: 'dolphin',
    nameRu: 'Дельфин',
    nameEn: 'Dolphin',
    value: 60,
    displayValue: '60 км/ч',
    emoji: '🐬',
    imageUri: '/images/dolphin_1786531835165.jpg',
    category: 'Водные',
    funFact: 'Очень быстро плавают и выпрыгивают из воды.'
  },
  {
    id: 'grizzly',
    nameRu: 'Медведь гризли',
    nameEn: 'Grizzly',
    value: 56,
    displayValue: '56 км/ч',
    emoji: '🐻',
    imageUri: '/images/grizzly_1786531563731.jpg',
    category: 'Наземные',
    funFact: 'Опасный и быстрый хищник.'
  },
  {
    id: 'rhino',
    nameRu: 'Носорог',
    nameEn: 'Rhino',
    value: 50,
    displayValue: '50 км/ч',
    emoji: '🦏',
    imageUri: '/images/rhino_1786531851932.jpg',
    category: 'Наземные',
    funFact: 'Несмотря на массу, разгоняются до 50 км/ч.'
  },
  {
    id: 'cat',
    nameRu: 'Домашняя кошка',
    nameEn: 'Cat',
    value: 48,
    displayValue: '48 км/ч',
    emoji: '🐈',
    imageUri: '/images/cat_1786533615911.jpg',
    category: 'Наземные',
    funFact: 'Бегают быстрее Усэйна Болта.'
  },
  {
    id: 'elephant',
    nameRu: 'Слон',
    nameEn: 'Elephant',
    value: 40,
    displayValue: '40 км/ч',
    emoji: '🐘',
    imageUri: '/images/elephant_1786531832101.jpg',
    category: 'Наземные',
    funFact: 'Несмотря на вес, бегают очень быстро.'
  },
  {
    id: 'crocodile',
    nameRu: 'Крокодил',
    nameEn: 'Crocodile',
    value: 32,
    displayValue: '32 км/ч',
    emoji: '🐊',
    imageUri: '/images/crocodile_1786531850139.jpg',
    category: 'Водные',
    funFact: 'Быстро бросаются на добычу.'
  },
  {
    id: 'hippo',
    nameRu: 'Бегемот',
    nameEn: 'Hippo',
    value: 30,
    displayValue: '30 км/ч',
    emoji: '🦛',
    imageUri: '/images/hippo_1786531848191.jpg',
    category: 'Наземные',
    funFact: 'Обгоняют человека на суше.'
  },
  {
    id: 'sloth',
    nameRu: 'Ленивец',
    nameEn: 'Sloth',
    value: 0.27,
    displayValue: '0.27 км/ч',
    emoji: '🦥',
    imageUri: '/images/sloth_1786533606388.jpg',
    category: 'Наземные',
    funFact: 'Передвигается настолько медленно, что в его шерсти могут расти водоросли.'
  },
  {
    id: 'snail',
    nameRu: 'Улитка',
    nameEn: 'Snail',
    value: 0.048,
    displayValue: '0.048 км/ч',
    emoji: '🐌',
    imageUri: '/images/snail_1786531505156.jpg',
    category: 'Наземные',
    funFact: 'Одни из самых медленных существ на Земле.'
  }
];

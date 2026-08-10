import { Animal } from '../types';

export const ANIMALS_DATA: Animal[] = [
  {
    id: 'blue-whale',
    nameRu: 'Синий кит',
    nameEn: 'Blue Whale',
    weightKg: 150000,
    weightDisplay: '150,000 кг',
    emoji: '🐋',
    imageUri: '/animals/blue-whale.jpg',
    category: 'Морские гиганты',
    funFact: 'Самое крупное животное, когда-либо существовавшее на Земле! Его сердце размером с автомобиль.'
  },
  {
    id: 'sperm-whale',
    nameRu: 'Кашалот',
    nameEn: 'Sperm Whale',
    weightKg: 45000,
    weightDisplay: '45,000 кг',
    emoji: '🐳',
    imageUri: '/animals/sperm-whale.jpg',
    category: 'Морские гиганты',
    funFact: 'Кашалот имеет самый большой мозг среди всех животных в истории планеты.'
  },
  {
    id: 'african-elephant',
    nameRu: 'Африканский слон',
    nameEn: 'African Elephant',
    weightKg: 6000,
    weightDisplay: '6,000 кг',
    emoji: '🐘',
    imageUri: '/animals/african-elephant.jpg',
    category: 'Наземные гиганты',
    funFact: 'Самое сухопутное тяжелое животное! Его хобот состоит из более чем 40 000 мышц.'
  },
  {
    id: 'orca',
    nameRu: 'Косатка',
    nameEn: 'Orca',
    weightKg: 5500,
    weightDisplay: '5,500 кг',
    emoji: '🐬',
    imageUri: '/animals/orca.jpg',
    category: 'Морские хищники',
    funFact: 'Косатки — крупнейшие представители семейства дельфиновых.'
  },
  {
    id: 'asian-elephant',
    nameRu: 'Азиатский слон',
    nameEn: 'Asian Elephant',
    weightKg: 4000,
    weightDisplay: '4,000 кг',
    emoji: '🐘',
    imageUri: '/animals/asian-elephant.jpg',
    category: 'Наземные гиганты',
    funFact: 'Немного меньше африканского сородича, у него уши меньшего размера.'
  },
  {
    id: 'white-rhino',
    nameRu: 'Белый носорог',
    nameEn: 'White Rhino',
    weightKg: 2300,
    weightDisplay: '2,300 кг',
    emoji: '🦏',
    imageUri: '/animals/white-rhino.jpg',
    category: 'Мегафауна',
    funFact: 'Второе по величине сухопутное животное после слона.'
  },
  {
    id: 'hippopotamus',
    nameRu: 'Бегемот',
    nameEn: 'Hippopotamus',
    weightKg: 1800,
    weightDisplay: '1,800 кг',
    emoji: '🦛',
    imageUri: '/animals/hippopotamus.jpg',
    category: 'Мегафауна',
    funFact: 'Несмотря на свой вес, бегемот может бегать со скоростью до 30 км/ч!'
  },
  {
    id: 'giraffe',
    nameRu: 'Жираф',
    nameEn: 'Giraffe',
    weightKg: 1200,
    weightDisplay: '1,200 кг',
    emoji: '🦒',
    imageUri: '/animals/giraffe.jpg',
    category: 'Высокие животные',
    funFact: 'Сердце жирафа весит около 11 кг и создает давление в 2 раза выше, чем у человека.'
  },
  {
    id: 'walrus',
    nameRu: 'Морж',
    nameEn: 'Walrus',
    weightKg: 1100,
    weightDisplay: '1,100 кг',
    emoji: '🦭',
    imageUri: '/animals/walrus.jpg',
    category: 'Ластоногие',
    funFact: 'Бивни моржа могут достигать 1 метра в длину и помогают ему выбираться из воды на лед.'
  },
  {
    id: 'saltwater-crocodile',
    nameRu: 'Гребнистый крокодил',
    nameEn: 'Saltwater Crocodile',
    weightKg: 1000,
    weightDisplay: '1,000 кг',
    emoji: '🐊',
    imageUri: '/animals/saltwater_crocodile.jpg',
    category: 'Рептилии',
    funFact: 'Самая крупная рептилия на нашей планете с невероятной силой укуса!'
  },
  {
    id: 'african-buffalo',
    nameRu: 'Африканский буйвол',
    nameEn: 'African Buffalo',
    weightKg: 700,
    weightDisplay: '700 кг',
    emoji: '🐃',
    imageUri: '/animals/african_buffalo.jpg',
    category: 'Копытные',
    funFact: 'Очень сильное и сплоченное животное, способное дать отпор прайду львов.'
  },
  {
    id: 'moose',
    nameRu: 'Лось',
    nameEn: 'Moose',
    weightKg: 500,
    weightDisplay: '500 кг',
    emoji: '🫎',
    imageUri: '/animals/moose.jpg',
    category: 'Лесные гиганты',
    funFact: 'Рога самца лося могут размахиваться до 1.8 метра и весить до 30 кг.'
  },
  {
    id: 'polar-bear',
    nameRu: 'Белый медведь',
    nameEn: 'Polar Bear',
    weightKg: 450,
    weightDisplay: '450 кг',
    emoji: '🐻‍❄️',
    imageUri: '/animals/polar-bear.jpg',
    category: 'Хищники',
    funFact: 'Крупнейший сухопутный хищник! Его кожа под белым мехом на самом деле черная.'
  },
  {
    id: 'grizzly-bear',
    nameRu: 'Медведь Гризли',
    nameEn: 'Grizzly Bear',
    weightKg: 350,
    weightDisplay: '350 кг',
    emoji: '🐻',
    imageUri: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    category: 'Хищники',
    funFact: 'Обладает мощнейшим горбом на плечах, состоящим полностью из мышц.'
  },
  {
    id: 'zebra',
    nameRu: 'Зебра',
    nameEn: 'Zebra',
    weightKg: 350,
    weightDisplay: '350 кг',
    emoji: '🦓',
    imageUri: 'https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&w=800&q=80',
    category: 'Копытные',
    funFact: 'Узор полос каждой зебры уникален, как отпечатки пальцев человека.'
  },
  {
    id: 'amur-tiger',
    nameRu: 'Амурский тигр',
    nameEn: 'Amur Tiger',
    weightKg: 250,
    weightDisplay: '250 кг',
    emoji: '🐅',
    imageUri: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
    category: 'Дикие кошки',
    funFact: 'Самая большая кошка в мире, приспособленная к глубоким снегам и сильным морозам.'
  },
  {
    id: 'african-lion',
    nameRu: 'Африканский лев',
    nameEn: 'African Lion',
    weightKg: 190,
    weightDisplay: '190 кг',
    emoji: '🦁',
    imageUri: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=800&q=80',
    category: 'Дикие кошки',
    funFact: 'Рык взрослого льва слышен на расстоянии до 8 километров!'
  },
  {
    id: 'gorilla',
    nameRu: 'Горилла',
    nameEn: 'Gorilla',
    weightKg: 180,
    weightDisplay: '180 кг',
    emoji: '🦍',
    imageUri: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=800&q=80',
    category: 'Приматы',
    funFact: 'Самый крупный примат на Земле. Руки гориллы сильнее человеческих примерно в 6 раз!'
  },
  {
    id: 'komodo-dragon',
    nameRu: 'Комодский варан',
    nameEn: 'Komodo Dragon',
    weightKg: 90,
    weightDisplay: '90 кг',
    emoji: '🦎',
    imageUri: 'https://images.unsplash.com/photo-1566838318721-39c43b918a38?auto=format&fit=crop&w=800&q=80',
    category: 'Рептилии',
    funFact: 'Самая тяжелая ящерица в мире, вынюхивает добычу своим раздвоенным языком.'
  },
  {
    id: 'emperor-penguin',
    nameRu: 'Императорский пингвин',
    nameEn: 'Emperor Penguin',
    weightKg: 40,
    weightDisplay: '40 кг',
    emoji: '🐧',
    imageUri: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=800&q=80',
    category: 'Птицы',
    funFact: 'Самый крупный из всех пингвинов, ныряет на глубину до 500 метров.'
  }
];

export type EquivalentCategory = 'physical' | 'military' | 'healthcare' | 'education' | 'housing';

export interface Equivalent {
  id: string;
  category: EquivalentCategory;
  name: string;
  unit: string;
  price: number;
  svgKey: string;
  source: string;
  desc: string;
}

export const EQUIVALENTS: Equivalent[] = [
  // Military
  { id: 'armor',     category: 'military',   name: 'Бронежилет 4 класу',           unit: 'шт',        price: 15000,      svgKey: 'armor',        source: 'Повернись живим',   desc: 'Захищає від осколків та куль малокаліберної зброї' },
  { id: 'helmet',    category: 'military',   name: 'Каска кевларова',               unit: 'шт',        price: 5000,       svgKey: 'helmet',       source: 'Фонд Притули',      desc: 'Балістична каска стандарту НАТО' },
  { id: 'fpv',       category: 'military',   name: 'FPV-дрон',                      unit: 'шт',        price: 25000,      svgKey: 'fpv',          source: 'Dignitas',          desc: 'Розвідувальний або ударний безпілотник' },
  { id: 'mavic',     category: 'military',   name: 'Mavic 3T (тепловізор)',         unit: 'шт',        price: 80000,      svgKey: 'mavic',        source: 'DJI / Dignitas',    desc: 'Дрон з тепловізійною камерою для нічних операцій' },
  { id: 'thermal',   category: 'military',   name: 'Тепловізор',                    unit: 'шт',        price: 60000,      svgKey: 'thermal',      source: 'Повернись живим',   desc: 'Прилад нічного та теплового бачення' },
  // Healthcare
  { id: 'surgery',   category: 'healthcare', name: 'Операція для пораненого',       unit: 'операцій',  price: 150000,     svgKey: 'surgery',      source: 'МОЗ України',       desc: 'Складна хірургічна операція з реабілітацією' },
  { id: 'ambulance', category: 'healthcare', name: 'Машина швидкої допомоги',       unit: 'машин',     price: 2500000,    svgKey: 'ambulance',    source: 'Тендерний портал',  desc: 'Повністю оснащена реанімобіль' },
  { id: 'cancer',    category: 'healthcare', name: 'Лікування онкохворого (рік)',   unit: 'пацієнтів', price: 500000,     svgKey: 'cancer',       source: 'МОЗ / НСЗУ',       desc: 'Повний річний курс хіміотерапії та супровід' },
  // Education
  { id: 'uni',       category: 'education',  name: 'Рік навчання в університеті',  unit: 'студентів', price: 40000,      svgKey: 'uni',          source: 'МОН України',       desc: 'Один рік вищої освіти на контракті' },
  { id: 'kinder',    category: 'education',  name: 'Дитячий садочок',              unit: 'садочків',  price: 25000000,   svgKey: 'kindergarten', source: 'Держбуд',           desc: 'Будівля на 120 місць — повністю "під ключ"' },
  { id: 'school',    category: 'education',  name: 'Школа (будівництво)',           unit: 'шкіл',      price: 80000000,   svgKey: 'school',       source: 'ДТЕК / Держбуд',    desc: 'Повна загальноосвітня школа на 500 учнів' },
  { id: 'teacher',   category: 'education',  name: 'Річна зарплата вчителя',       unit: 'вчителів',  price: 180000,     svgKey: 'teacher',      source: 'МОН / Мінфін',      desc: 'Середня зарплата педагога за рік' },
  // Housing
  { id: 'apt_kyiv',  category: 'housing',    name: 'Квартира у Києві (50 м²)',      unit: 'квартир',   price: 3500000,    svgKey: 'apt_kyiv',     source: 'ЛУН / OLX',         desc: 'Середня ціна 2-кімнатної у Києві' },
  { id: 'apt_reg',   category: 'housing',    name: 'Квартира в обласному центрі',  unit: 'квартир',   price: 1500000,    svgKey: 'apt_region',   source: 'OLX / ЛУН',         desc: 'Середня ціна 2-кімнатної в регіоні' },
  { id: 'house',     category: 'housing',    name: 'Будинок в селі',               unit: 'будинків',  price: 800000,     svgKey: 'house',        source: 'OLX нерухомість',   desc: 'Житловий будинок з ділянкою' },
  // Physical
  { id: 'briefcase', category: 'physical',   name: 'Дипломат, набитий сотками',    unit: 'валіз',     price: 5000000,    svgKey: 'briefcase',    source: 'Розрахунок',        desc: '100₴ важить 0.85 г; дипломат ~25 кг ≈ 5 млн ₴' },
  { id: 'wagon',     category: 'physical',   name: 'Вагон купюр (100₴)',           unit: 'вагонів',   price: 3000000000, svgKey: 'wagon',        source: 'Розрахунок',        desc: 'Вантажний вагон 90 т ≈ 3 млрд ₴ купюрами по 100' },
  { id: 'stack',     category: 'physical',   name: 'Стос купюр висотою 1 м',       unit: 'стосів',    price: 1000000,    svgKey: 'stack',        source: 'Розрахунок',        desc: '1 м стосу 100₴ ≈ 1 000 000 ₴' },
  { id: 'weight',    category: 'physical',   name: 'Вага у купюрах (100₴)',        unit: 'кг',        price: 1176,       svgKey: 'weight',       source: 'Розрахунок',        desc: '1 кг купюр по 100₴ ≈ 1 176 ₴' },
];

export const CAT_LABELS: Record<string, string> = {
  military:   'Армія',
  healthcare: 'Медицина',
  education:  'Освіта',
  housing:    'Житло',
  physical:   'Фізично',
};

export const CAT_COLORS: Record<string, string> = {
  military:   '#DC2626',
  healthcare: '#059669',
  education:  '#2563EB',
  housing:    '#F59E0B',
  physical:   '#6B7280',
};

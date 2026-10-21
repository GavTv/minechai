const FILES = {
  green: '/images/fallbacks/green.webp',
  black: '/images/fallbacks/black.webp',
  oolong: '/images/fallbacks/oolong.webp',
  white: '/images/fallbacks/white.webp',
  puer: '/images/fallbacks/puer.webp',
  red: '/images/fallbacks/red.webp',
  herb: '/images/fallbacks/herb.webp',
  fruit: '/images/fallbacks/fruit.webp',
  mate: '/images/fallbacks/mate.webp',
  bound: '/images/fallbacks/bound.webp',
  hibiscus: '/images/fallbacks/hibiscus.webp',
  rooibos: '/images/fallbacks/rooibos.webp',
  matcha: '/images/fallbacks/matcha.webp',
  ware: '/images/fallbacks/ware.webp',
  gift: '/images/fallbacks/gift.webp',
  coffee: '/images/fallbacks/coffee.jpg',
  sweet: '/images/fallbacks/sweet.jpg',
} as const;

const RULES: [RegExp, keyof typeof FILES][] = [
  [/кофе|эспрессо|какао|зерн|drip|stretto|robusta|арабик/i, 'coffee'],
  [/сироп|топпинг|barline|шоколад(?!н)/i, 'sweet'],
  [/сахар|леденец|сладост|sweet/i, 'sweet'],
  [/посуд|пиал|чайник|бомбил|клипс|крышк|пружин|вставк|конверт|аксессуар/i, 'ware'],
  [/открытк|подар|лента|упаков|рождеств|день.?рожд|феврал/i, 'gift'],
  [/матча|matcha/i, 'matcha'],
  [/улун|гуань|дун.?дин|габа/i, 'oolong'],
  [/пуэр|пуер|puer/i, 'puer'],
  [/бел(ый|ый|ого)|бай.?му|иньчжен|шou.?мей|шоу.?мей/i, 'white'],
  [/красн|кимун|дянь.?хун|дяньхун/i, 'red'],
  [/мате|лапачо|yerba|bombil/i, 'mate'],
  [/каркаде|гибискус|гибискус/i, 'hibiscus'],
  [/ройбуш|ханибуш|rooibos/i, 'rooibos'],
  [/связан/i, 'bound'],
  [/трав|мята|фенхел|шалфей|зверобой|чабрец|гречиш|ку.?цяо/i, 'herb'],
  [/фрукт|ягод|яблок|шип|лимон/i, 'fruit'],
  [/зелен|ганпаудер|сенча|чунь.?ми|жасмин/i, 'green'],
  [/черн/i, 'black'],
];

/** Simple stand-in photo when a product or category image was not saved. */
export function fallbackPhoto(hint = ''): string {
  for (const [pattern, key] of RULES) {
    if (pattern.test(hint)) return FILES[key];
  }
  return FILES.green;
}

import type { SupportedLanguage } from '../i18n/translations';

export type ArtifactFact = Partial<Record<SupportedLanguage, string>>;

export const artifactFacts: Record<string, ArtifactFact[]> = {
  'big-ben': [
    {
      zh: '大本钟其实是钟楼里大钟的名字，它的钟声是伦敦的著名声音。',
      en: 'Big Ben is the name of the great bell inside the clock tower, and its chime is a famous sound of London.',
      es: 'Big Ben es el nombre de la gran campana dentro de la torre del reloj, y su sonido es famoso en Londres.',
      pt: 'Big Ben é o nome do grande sino dentro da torre do relógio, e seu som é famoso em Londres.',
      ja: 'ビッグ・ベンは時計塔の中にある大きな鐘の名前で、その音はロンドンを代表する音です。',
    },
  ],
  book: [
    {
      zh: '书可以把故事、知识和想象力保存下来，让不同地方的人一起学习。',
      en: 'Books can keep stories, knowledge, and imagination so people in different places can learn together.',
      es: 'Los libros guardan historias, conocimiento e imaginación para que personas de distintos lugares aprendan juntas.',
      pt: 'Os livros guardam histórias, conhecimento e imaginação para que pessoas de lugares diferentes aprendam juntas.',
      ja: '本は物語や知識、想像力を残し、いろいろな場所の人が一緒に学べるようにします。',
    },
  ],
  camera: [
    {
      zh: '相机能把一瞬间变成照片，帮助我们记住旅行、家人和特别的发现。',
      en: 'A camera turns a moment into a photo, helping us remember trips, family, and special discoveries.',
      es: 'Una cámara convierte un momento en una foto y nos ayuda a recordar viajes, familia y descubrimientos.',
      pt: 'Uma câmera transforma um momento em foto e ajuda a lembrar viagens, família e descobertas.',
      ja: 'カメラは一瞬を写真に変え、旅や家族、特別な発見を思い出に残します。',
    },
  ],
  car: [
    {
      zh: '汽车让人们出行更方便，也改变了城市道路和旅行方式。',
      en: 'Cars make travel easier and have changed city roads and the way people move around.',
      es: 'Los autos hacen más fácil viajar y han cambiado las calles y la forma de moverse.',
      pt: 'Os carros facilitam as viagens e mudaram as ruas e a forma como as pessoas se deslocam.',
      ja: '自動車は移動を便利にし、街の道路や旅の形を変えました。',
    },
  ],
  cat: [
    {
      zh: '猫的胡须很敏感，可以帮助它判断自己能不能穿过狭窄的地方。',
      en: 'A cat’s whiskers are very sensitive and help it judge whether it can pass through narrow spaces.',
      es: 'Los bigotes del gato son muy sensibles y le ayudan a saber si puede pasar por lugares estrechos.',
      pt: 'Os bigodes do gato são muito sensíveis e ajudam a saber se ele consegue passar por espaços estreitos.',
      ja: '猫のひげはとても敏感で、狭い場所を通れるかを判断する助けになります。',
    },
  ],
  computer: [
    {
      zh: '电脑可以处理大量信息，帮助人们学习、画画、写作和创造新东西。',
      en: 'Computers can process lots of information and help people learn, draw, write, and create new things.',
      es: 'Las computadoras procesan mucha información y ayudan a aprender, dibujar, escribir y crear.',
      pt: 'Os computadores processam muitas informações e ajudam a aprender, desenhar, escrever e criar.',
      ja: 'コンピューターは多くの情報を処理し、学習や絵、文章、新しいものづくりを助けます。',
    },
  ],
  coral: [
    {
      zh: '珊瑚看起来像植物，其实许多珊瑚是小动物共同建成的海底家园。',
      en: 'Coral may look like a plant, but many corals are tiny animals building underwater homes together.',
      es: 'El coral puede parecer una planta, pero muchos corales son pequeños animales que construyen hogares submarinos.',
      pt: 'O coral pode parecer uma planta, mas muitos corais são pequenos animais construindo lares submarinos.',
      ja: 'サンゴは植物のように見えますが、多くは小さな動物が作る海のすみかです。',
    },
  ],
  cup: [
    {
      zh: '杯子帮助我们安全地喝水，也能用不同材料和图案表达生活的美感。',
      en: 'Cups help us drink safely and can show everyday beauty through different materials and patterns.',
      es: 'Las tazas nos ayudan a beber con seguridad y muestran belleza con materiales y dibujos distintos.',
      pt: 'Os copos ajudam a beber com segurança e mostram beleza com materiais e desenhos diferentes.',
      ja: 'コップは安全に飲み物を飲む道具で、素材や模様で暮らしの美しさも表します。',
    },
  ],
  dog: [
    {
      zh: '狗的嗅觉非常灵敏，能闻到很多人类闻不到的气味。',
      en: 'Dogs have a very strong sense of smell and can notice scents humans cannot detect.',
      es: 'Los perros tienen un olfato muy fuerte y pueden notar olores que los humanos no detectan.',
      pt: 'Os cães têm um olfato muito forte e percebem cheiros que os humanos não sentem.',
      ja: '犬はとても鋭い嗅覚を持ち、人間には分からないにおいも感じ取れます。',
    },
  ],
  'eiffel-tower': [
    {
      zh: '埃菲尔铁塔最初为世界博览会建造，现在是巴黎最有名的地标之一。',
      en: 'The Eiffel Tower was built for a world fair and is now one of Paris’s most famous landmarks.',
      es: 'La Torre Eiffel fue construida para una exposición mundial y ahora es un símbolo famoso de París.',
      pt: 'A Torre Eiffel foi construída para uma exposição mundial e hoje é um símbolo famoso de Paris.',
      ja: 'エッフェル塔は万国博覧会のために建てられ、今ではパリの有名な目印です。',
    },
  ],
  kangaroo: [
    {
      zh: '袋鼠用强壮的后腿跳跃，妈妈会用育儿袋保护小宝宝。',
      en: 'Kangaroos hop with powerful back legs, and mothers protect their babies in a pouch.',
      es: 'Los canguros saltan con fuertes patas traseras, y las madres protegen a sus crías en una bolsa.',
      pt: 'Os cangurus pulam com fortes patas traseiras, e as mães protegem os filhotes em uma bolsa.',
      ja: 'カンガルーは強い後ろ足で跳び、母親は袋の中で赤ちゃんを守ります。',
    },
  ],
  koala: [
    {
      zh: '考拉喜欢吃桉树叶，因为叶子能量不高，所以它们一天会休息很久。',
      en: 'Koalas eat eucalyptus leaves, which are low in energy, so they rest for many hours each day.',
      es: 'Los koalas comen hojas de eucalipto, que tienen poca energía, por eso descansan muchas horas.',
      pt: 'Os coalas comem folhas de eucalipto, que têm pouca energia, por isso descansam muitas horas.',
      ja: 'コアラはユーカリの葉を食べます。エネルギーが少ないので、長い時間休みます。',
    },
  ],
  'mona-lisa': [
    {
      zh: '蒙娜丽莎的微笑很有名，人们从不同角度看会有不一样的感觉。',
      en: 'The Mona Lisa is famous for her smile, which can feel different when viewed from different angles.',
      es: 'La Mona Lisa es famosa por su sonrisa, que puede sentirse distinta desde diferentes ángulos.',
      pt: 'A Mona Lisa é famosa por seu sorriso, que pode parecer diferente de vários ângulos.',
      ja: 'モナ・リザは微笑みで有名で、見る角度によって印象が変わります。',
    },
  ],
  panda: [
    {
      zh: '熊猫每天要吃大量竹子，是非常有代表性的中国动物。',
      en: "Pandas eat a lot of bamboo every day and are one of China's most famous animals.",
      es: 'Los pandas comen mucho bambú cada día y son uno de los animales más famosos de China.',
      pt: 'Os pandas comem muito bambu todos os dias e são um dos animais mais famosos da China.',
      ja: 'パンダは毎日たくさんの竹を食べる、中国を代表する動物です。',
    },
  ],
  phone: [
    {
      zh: '手机把电话、相机、地图和学习工具装进一个小小的设备里。',
      en: 'A phone puts calls, a camera, maps, and learning tools into one small device.',
      es: 'Un teléfono reúne llamadas, cámara, mapas y herramientas de aprendizaje en un dispositivo pequeño.',
      pt: 'Um celular reúne chamadas, câmera, mapas e ferramentas de estudo em um aparelho pequeno.',
      ja: '携帯電話は通話、カメラ、地図、学習道具を小さな機器にまとめています。',
    },
  ],
  rocket: [
    {
      zh: '火箭利用强大的推力飞向天空，可以把卫星和宇航员送入太空。',
      en: 'Rockets use powerful thrust to fly upward and can carry satellites and astronauts into space.',
      es: 'Los cohetes usan gran empuje para subir y pueden llevar satélites y astronautas al espacio.',
      pt: 'Os foguetes usam grande impulso para subir e podem levar satélites e astronautas ao espaço.',
      ja: 'ロケットは強い推進力で空へ飛び、人工衛星や宇宙飛行士を宇宙へ運びます。',
    },
  ],
  'rosetta-stone': [
    {
      zh: '罗塞塔石碑上有不同文字，帮助学者读懂古埃及象形文字。',
      en: 'The Rosetta Stone has several scripts and helped scholars understand ancient Egyptian hieroglyphs.',
      es: 'La Piedra de Rosetta tiene varias escrituras y ayudó a entender los jeroglíficos egipcios.',
      pt: 'A Pedra de Roseta tem várias escritas e ajudou estudiosos a entender hieróglifos egípcios.',
      ja: 'ロゼッタ・ストーンには複数の文字が刻まれ、古代エジプト文字を読む手がかりになりました。',
    },
  ],
  'sea-turtle': [
    {
      zh: '海龟能在海洋中长距离旅行，有些还会回到出生的海滩产卵。',
      en: 'Sea turtles can travel far across the ocean, and some return to the beach where they hatched.',
      es: 'Las tortugas marinas viajan lejos por el océano y algunas vuelven a la playa donde nacieron.',
      pt: 'As tartarugas marinhas viajam longe pelo oceano e algumas voltam à praia onde nasceram.',
      ja: 'ウミガメは海を長く旅し、生まれた砂浜に戻って卵を産むことがあります。',
    },
  ],
  'taj-mahal': [
    {
      zh: '泰姬陵用白色大理石建成，阳光变化时会呈现不同的美丽颜色。',
      en: 'The Taj Mahal is made of white marble and can look different as the sunlight changes.',
      es: 'El Taj Mahal está hecho de mármol blanco y cambia de apariencia con la luz del sol.',
      pt: 'O Taj Mahal é feito de mármore branco e pode parecer diferente com a luz do sol.',
      ja: 'タージ・マハルは白い大理石でできており、日差しによって違った美しさを見せます。',
    },
  ],
  'tutankhamun-mask': [
    {
      zh: '图坦卡蒙面具由黄金和宝石装饰，是古埃及法老文化的重要象征。',
      en: 'Tutankhamun’s mask is decorated with gold and gems and is an important symbol of ancient Egypt.',
      es: 'La máscara de Tutankamón tiene oro y gemas, y es un símbolo importante del antiguo Egipto.',
      pt: 'A máscara de Tutancâmon tem ouro e pedras preciosas, sendo um símbolo do Egito antigo.',
      ja: 'ツタンカーメンのマスクは金や宝石で飾られ、古代エジプトを象徴する宝です。',
    },
  ],
};

import type { SupportedLanguage } from '../i18n/translations';

export type KnowledgeQuizQuestion = {
  artifactKey: string;
  correctAnswer: Record<SupportedLanguage, string>;
  options: Record<SupportedLanguage, string[]>;
  question: Record<SupportedLanguage, string>;
};

function makeQuestion({
  artifactKey,
  correct,
  en,
  es,
  ja,
  pt,
  zh,
}: {
  artifactKey: string;
  correct: Record<SupportedLanguage, string>;
  en: string;
  es: string;
  ja: string;
  pt: string;
  zh: string;
}): KnowledgeQuizQuestion {
  return {
    artifactKey,
    correctAnswer: correct,
    options: {
      zh: [correct.zh, '会发光的石头', '一种交通工具'],
      en: [correct.en, 'A glowing stone', 'A vehicle'],
      es: [correct.es, 'Una piedra brillante', 'Un vehículo'],
      pt: [correct.pt, 'Uma pedra brilhante', 'Um veículo'],
      ja: [correct.ja, '光る石', '乗り物'],
    },
    question: { zh, en, es, pt, ja },
  };
}

export const knowledgeQuizData: KnowledgeQuizQuestion[] = [
  makeQuestion({
    artifactKey: 'panda',
    correct: { zh: '吃大量竹子', en: 'Eat lots of bamboo', es: 'Comen mucho bambú', pt: 'Comem muito bambu', ja: 'たくさん竹を食べる' },
    zh: '熊猫最喜欢、也最常吃的食物是什么？',
    en: 'What food do pandas most often eat?',
    es: '¿Qué alimento comen más los pandas?',
    pt: 'Que alimento os pandas comem mais?',
    ja: 'パンダがよく食べるものは何ですか？',
  }),
  makeQuestion({
    artifactKey: 'cat',
    correct: { zh: '胡须很敏感', en: 'Sensitive whiskers', es: 'Bigotes sensibles', pt: 'Bigodes sensíveis', ja: '敏感なひげ' },
    zh: '猫用什么帮助判断狭窄空间？',
    en: 'What helps cats judge narrow spaces?',
    es: '¿Qué ayuda a los gatos a pasar por lugares estrechos?',
    pt: 'O que ajuda os gatos a passar por espaços estreitos?',
    ja: '猫が狭い場所を判断する助けになるものは？',
  }),
  makeQuestion({
    artifactKey: 'dog',
    correct: { zh: '嗅觉灵敏', en: 'Strong sense of smell', es: 'Olfato fuerte', pt: 'Olfato forte', ja: '鋭い嗅覚' },
    zh: '狗最厉害的感官之一是什么？',
    en: 'What is one of a dog’s strongest senses?',
    es: '¿Cuál es uno de los sentidos más fuertes del perro?',
    pt: 'Qual é um dos sentidos mais fortes do cão?',
    ja: '犬の得意な感覚の一つは？',
  }),
  makeQuestion({
    artifactKey: 'car',
    correct: { zh: '让出行更方便', en: 'Make travel easier', es: 'Facilitan viajar', pt: 'Facilitam viagens', ja: '移動を便利にする' },
    zh: '汽车给城市生活带来的重要变化是什么？',
    en: 'What important change do cars bring to city life?',
    es: '¿Qué cambio importante traen los autos a la ciudad?',
    pt: 'Que mudança importante os carros trazem para a cidade?',
    ja: '車は街の生活をどう変えますか？',
  }),
  makeQuestion({
    artifactKey: 'cup',
    correct: { zh: '帮助安全喝水', en: 'Help us drink safely', es: 'Ayudan a beber con seguridad', pt: 'Ajudam a beber com segurança', ja: '安全に飲む助けになる' },
    zh: '杯子的基本用途是什么？',
    en: 'What is a cup mainly used for?',
    es: '¿Para qué sirve principalmente una taza?',
    pt: 'Para que serve principalmente um copo?',
    ja: 'コップの主な使い道は？',
  }),
  makeQuestion({
    artifactKey: 'book',
    correct: { zh: '保存故事和知识', en: 'Keep stories and knowledge', es: 'Guardar historias y conocimiento', pt: 'Guardar histórias e conhecimento', ja: '物語と知識を残す' },
    zh: '书能帮助人们保存什么？',
    en: 'What can books help people keep?',
    es: '¿Qué ayudan a guardar los libros?',
    pt: 'O que os livros ajudam a guardar?',
    ja: '本は何を残す助けになりますか？',
  }),
  makeQuestion({
    artifactKey: 'phone',
    correct: { zh: '连接和学习工具', en: 'Connection and learning tools', es: 'Conexión y aprendizaje', pt: 'Conexão e estudo', ja: 'つながりと学習の道具' },
    zh: '手机把哪些能力装进小设备里？',
    en: 'What does a phone put into a small device?',
    es: '¿Qué reúne un teléfono en un dispositivo pequeño?',
    pt: 'O que o celular reúne em um aparelho pequeno?',
    ja: '携帯電話は小さな機器に何をまとめていますか？',
  }),
  makeQuestion({
    artifactKey: 'computer',
    correct: { zh: '处理大量信息', en: 'Process lots of information', es: 'Procesar mucha información', pt: 'Processar muitas informações', ja: '多くの情報を処理する' },
    zh: '电脑擅长处理什么？',
    en: 'What are computers good at processing?',
    es: '¿Qué procesan bien las computadoras?',
    pt: 'O que os computadores processam bem?',
    ja: 'コンピューターが得意なことは？',
  }),
  makeQuestion({
    artifactKey: 'rocket',
    correct: { zh: '飞向太空', en: 'Fly into space', es: 'Volar al espacio', pt: 'Voar ao espaço', ja: '宇宙へ飛ぶ' },
    zh: '火箭最特别的本领是什么？',
    en: 'What is a rocket especially good at?',
    es: '¿Qué sabe hacer especialmente un cohete?',
    pt: 'O que um foguete faz de especial?',
    ja: 'ロケットの特別な力は何ですか？',
  }),
  makeQuestion({
    artifactKey: 'camera',
    correct: { zh: '保存瞬间', en: 'Save moments', es: 'Guardar momentos', pt: 'Guardar momentos', ja: '瞬間を残す' },
    zh: '相机最适合帮助我们做什么？',
    en: 'What does a camera help us do best?',
    es: '¿Qué nos ayuda a hacer mejor una cámara?',
    pt: 'O que uma câmera nos ajuda a fazer melhor?',
    ja: 'カメラは何を助けてくれますか？',
  }),
  makeQuestion({
    artifactKey: 'mona-lisa',
    correct: { zh: '神秘微笑', en: 'Mysterious smile', es: 'Sonrisa misteriosa', pt: 'Sorriso misterioso', ja: '神秘的な微笑み' },
    zh: '蒙娜丽莎最吸引大家注意的特点是什么？',
    en: 'What detail makes the Mona Lisa so famous?',
    es: '¿Qué detalle hace tan famosa a la Mona Lisa?',
    pt: 'Que detalhe torna a Mona Lisa tão famosa?',
    ja: 'モナ・リザを有名にしているものは何ですか？',
  }),
  makeQuestion({
    artifactKey: 'eiffel-tower',
    correct: { zh: '巴黎地标', en: 'A Paris landmark', es: 'Un símbolo de París', pt: 'Um símbolo de Paris', ja: 'パリの目印' },
    zh: '埃菲尔铁塔现在是哪里的著名地标？',
    en: 'Where is the Eiffel Tower a famous landmark?',
    es: '¿De qué ciudad es símbolo la Torre Eiffel?',
    pt: 'De qual cidade a Torre Eiffel é símbolo?',
    ja: 'エッフェル塔はどこの有名な目印ですか？',
  }),
  makeQuestion({
    artifactKey: 'big-ben',
    correct: { zh: '钟楼里的大钟', en: 'The great bell in the clock tower', es: 'La gran campana de la torre', pt: 'O grande sino da torre', ja: '時計塔の大きな鐘' },
    zh: '大本钟其实指的是什么？',
    en: 'What does Big Ben actually refer to?',
    es: '¿A qué se refiere Big Ben?',
    pt: 'A que Big Ben se refere?',
    ja: 'ビッグ・ベンは何の名前ですか？',
  }),
  makeQuestion({
    artifactKey: 'kangaroo',
    correct: { zh: '用后腿跳跃', en: 'Hop with back legs', es: 'Saltar con patas traseras', pt: 'Pular com patas traseiras', ja: '後ろ足で跳ぶ' },
    zh: '袋鼠怎样移动最有特点？',
    en: 'How do kangaroos famously move?',
    es: '¿Cómo se mueven los canguros?',
    pt: 'Como os cangurus se movem?',
    ja: 'カンガルーの特徴的な動きは？',
  }),
  makeQuestion({
    artifactKey: 'koala',
    correct: { zh: '吃桉树叶', en: 'Eat eucalyptus leaves', es: 'Comer hojas de eucalipto', pt: 'Comer folhas de eucalipto', ja: 'ユーカリの葉を食べる' },
    zh: '考拉喜欢吃什么？',
    en: 'What do koalas like to eat?',
    es: '¿Qué les gusta comer a los koalas?',
    pt: 'O que os coalas gostam de comer?',
    ja: 'コアラは何を食べるのが好きですか？',
  }),
  makeQuestion({
    artifactKey: 'sea-turtle',
    correct: { zh: '长距离海洋旅行', en: 'Long ocean travel', es: 'Viajes largos por el océano', pt: 'Viagens longas pelo oceano', ja: '海を長く旅する' },
    zh: '海龟擅长在海洋中做什么？',
    en: 'What are sea turtles good at doing in the ocean?',
    es: '¿Qué hacen bien las tortugas marinas en el océano?',
    pt: 'O que tartarugas marinhas fazem bem no oceano?',
    ja: 'ウミガメが海で得意なことは？',
  }),
  makeQuestion({
    artifactKey: 'coral',
    correct: { zh: '小动物建成的海底家园', en: 'Underwater homes built by tiny animals', es: 'Hogares submarinos hechos por animales pequeños', pt: 'Lares submarinos feitos por pequenos animais', ja: '小さな動物が作る海のすみか' },
    zh: '珊瑚其实常常是什么建成的？',
    en: 'What are many corals actually built by?',
    es: '¿Quién construye muchos corales?',
    pt: 'Quem constrói muitos corais?',
    ja: 'サンゴは何が作ることが多いですか？',
  }),
  makeQuestion({
    artifactKey: 'taj-mahal',
    correct: { zh: '白色大理石', en: 'White marble', es: 'Mármol blanco', pt: 'Mármore branco', ja: '白い大理石' },
    zh: '泰姬陵以什么材料之美闻名？',
    en: 'What material is the Taj Mahal famous for?',
    es: '¿Por qué material es famoso el Taj Mahal?',
    pt: 'Por qual material o Taj Mahal é famoso?',
    ja: 'タージ・マハルはどんな素材で有名ですか？',
  }),
  makeQuestion({
    artifactKey: 'tutankhamun-mask',
    correct: { zh: '黄金和宝石', en: 'Gold and gems', es: 'Oro y gemas', pt: 'Ouro e pedras preciosas', ja: '金と宝石' },
    zh: '图坦卡蒙面具用什么装饰？',
    en: 'What decorates Tutankhamun’s mask?',
    es: '¿Qué decora la máscara de Tutankamón?',
    pt: 'O que decora a máscara de Tutancâmon?',
    ja: 'ツタンカーメンのマスクは何で飾られていますか？',
  }),
  makeQuestion({
    artifactKey: 'rosetta-stone',
    correct: { zh: '帮助读懂古埃及文字', en: 'Helped read ancient Egyptian writing', es: 'Ayudó a leer escritura egipcia antigua', pt: 'Ajudou a ler a escrita egípcia antiga', ja: '古代エジプト文字を読む助け' },
    zh: '罗塞塔石碑帮助学者做了什么？',
    en: 'What did the Rosetta Stone help scholars do?',
    es: '¿Qué ayudó a hacer la Piedra de Rosetta?',
    pt: 'O que a Pedra de Roseta ajudou estudiosos a fazer?',
    ja: 'ロゼッタ・ストーンは学者をどう助けましたか？',
  }),
];

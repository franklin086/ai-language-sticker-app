export type MuseumArtifact = {
  objectZh: string;
  objectEn: string;
  emoji: string;
  museum: string;
  rarity: string;
  story: string;
  aliases?: string[];
};

export type MuseumBadgeData = {
  emoji: string;
  id: string;
  museumId: string | null;
  title: string;
};

export const museumArtifacts: MuseumArtifact[] = [
  { objectZh: '汽车', objectEn: 'Car', emoji: '🚗', museum: '交通博物馆', rarity: '稀有', story: '世界第一辆汽车诞生于1886年。' },
  { objectZh: '公交车', objectEn: 'Bus', emoji: '🚌', museum: '交通博物馆', rarity: '普通', story: '公交车可以一次载很多人去城市里的不同地方。' },
  { objectZh: '出租车', objectEn: 'Taxi', emoji: '🚕', museum: '交通博物馆', rarity: '普通', story: '出租车会把乘客送到他们想去的地方。' },
  { objectZh: '警车', objectEn: 'Police Car', emoji: '🚓', museum: '交通博物馆', rarity: '稀有', story: '警车的警灯和警笛能提醒大家让出道路。' },
  { objectZh: '消防车', objectEn: 'Fire Truck', emoji: '🚒', museum: '交通博物馆', rarity: '稀有', story: '消防车会带着水管和云梯赶去灭火救人。' },
  { objectZh: '救护车', objectEn: 'Ambulance', emoji: '🚑', museum: '交通博物馆', rarity: '稀有', story: '救护车能把需要帮助的人快速送到医院。' },
  { objectZh: '自行车', objectEn: 'Bicycle', emoji: '🚲', museum: '交通博物馆', rarity: '普通', story: '自行车不用汽油，骑起来还能锻炼身体。' },
  { objectZh: '摩托车', objectEn: 'Motorcycle', emoji: '🏍️', museum: '交通博物馆', rarity: '稀有', story: '摩托车有两个轮子，转弯时会轻轻倾斜身体。' },
  { objectZh: '火车', objectEn: 'Train', emoji: '🚂', museum: '交通博物馆', rarity: '史诗', story: '火车可以一次带很多人去很远的地方。' },
  { objectZh: '高铁', objectEn: 'High-speed Train', emoji: '🚄', museum: '交通博物馆', rarity: '史诗', story: '高铁速度很快，让城市之间的旅行更轻松。' },
  { objectZh: '地铁', objectEn: 'Subway', emoji: '🚇', museum: '交通博物馆', rarity: '稀有', story: '地铁通常在地下行驶，可以避开路面拥堵。' },
  { objectZh: '飞机', objectEn: 'Airplane', emoji: '✈️', museum: '交通博物馆', rarity: '史诗', story: '第一架飞机在1903年成功飞行。' },
  { objectZh: '直升机', objectEn: 'Helicopter', emoji: '🚁', museum: '交通博物馆', rarity: '史诗', story: '直升机可以垂直起飞和降落。' },
  { objectZh: '轮船', objectEn: 'Ship', emoji: '🚢', museum: '交通博物馆', rarity: '史诗', story: '轮船能在海上运输巨大的货物。' },
  { objectZh: '帆船', objectEn: 'Sailboat', emoji: '⛵', museum: '交通博物馆', rarity: '稀有', story: '帆船会借助风的力量在水面前进。' },
  { objectZh: '潜水艇', objectEn: 'Submarine', emoji: '🚤', museum: '交通博物馆', rarity: '史诗', story: '潜水艇可以潜到海面下面探索神秘海洋。' },
  { objectZh: '火箭', objectEn: 'Rocket', emoji: '🚀', museum: '交通博物馆', rarity: '传奇', story: '火箭能把宇航员送入太空。' },
  { objectZh: '熊猫', objectEn: 'Panda', emoji: '🐼', museum: '动物博物馆', rarity: '传奇', story: '大熊猫主要生活在中国四川山区。' },
  { objectZh: '狮子', objectEn: 'Lion', emoji: '🦁', museum: '动物博物馆', rarity: '史诗', story: '狮子的吼声最远可传8公里。' },
  { objectZh: '老虎', objectEn: 'Tiger', emoji: '🐯', museum: '动物博物馆', rarity: '史诗', story: '老虎身上的条纹像每只老虎自己的身份证。' },
  { objectZh: '大象', objectEn: 'Elephant', emoji: '🐘', museum: '动物博物馆', rarity: '史诗', story: '大象会用长鼻子喝水、搬东西和打招呼。' },
  { objectZh: '长颈鹿', objectEn: 'Giraffe', emoji: '🦒', museum: '动物博物馆', rarity: '史诗', story: '长颈鹿是世界上最高的陆地动物。' },
  { objectZh: '猴子', objectEn: 'Monkey', emoji: '🐒', museum: '动物博物馆', rarity: '稀有', story: '猴子很灵活，常常用尾巴保持平衡。' },
  { objectZh: '企鹅', objectEn: 'Penguin', emoji: '🐧', museum: '动物博物馆', rarity: '稀有', story: '企鹅不会飞，但它们是很棒的游泳高手。' },
  { objectZh: '海豚', objectEn: 'Dolphin', emoji: '🐬', museum: '动物博物馆', rarity: '稀有', story: '海豚会用声音互相交流和寻找食物。' },
  { objectZh: '鲸鱼', objectEn: 'Whale', emoji: '🐋', museum: '动物博物馆', rarity: '史诗', story: '鲸鱼是海洋里体型巨大的哺乳动物。' },
  { objectZh: '乌龟', objectEn: 'Turtle', emoji: '🐢', museum: '动物博物馆', rarity: '普通', story: '乌龟背上的壳像随身携带的小房子。' },
  { objectZh: '猫', objectEn: 'Cat', emoji: '🐱', museum: '动物博物馆', rarity: '普通', story: '猫的胡须可以帮助它感知周围空间。' },
  { objectZh: '狗', objectEn: 'Dog', emoji: '🐶', museum: '动物博物馆', rarity: '普通', story: '狗的嗅觉非常灵敏，能闻到人类闻不到的气味。' },
  { objectZh: '兔子', objectEn: 'Rabbit', emoji: '🐰', museum: '动物博物馆', rarity: '普通', story: '兔子的长耳朵可以听到很细小的声音。' },
  { objectZh: '松鼠', objectEn: 'Squirrel', emoji: '🐿️', museum: '动物博物馆', rarity: '稀有', story: '松鼠会把坚果藏起来，为冬天做准备。' },
  { objectZh: '猫头鹰', objectEn: 'Owl', emoji: '🦉', museum: '动物博物馆', rarity: '稀有', story: '猫头鹰在夜晚也能看得很清楚。' },
  { objectZh: '霸王龙', objectEn: 'Tyrannosaurus Rex', emoji: '🦖', museum: '恐龙博物馆', rarity: '传奇', story: '霸王龙曾经是地球上的顶级掠食者。' },
  { objectZh: '三角龙', objectEn: 'Triceratops', emoji: '🦕', museum: '恐龙博物馆', rarity: '传奇', story: '三角龙头上有三只角，像戴着天然头盔。' },
  { objectZh: '剑龙', objectEn: 'Stegosaurus', emoji: '🦕', museum: '恐龙博物馆', rarity: '史诗', story: '剑龙背上的骨板可能帮助它展示自己或调节体温。' },
  { objectZh: '迅猛龙', objectEn: 'Velociraptor', emoji: '🦖', museum: '恐龙博物馆', rarity: '传奇', story: '迅猛龙行动敏捷，名字的意思是快速的掠夺者。' },
  { objectZh: '腕龙', objectEn: 'Brachiosaurus', emoji: '🦕', museum: '恐龙博物馆', rarity: '史诗', story: '腕龙脖子很长，可以吃到高处的树叶。' },
  { objectZh: '翼龙', objectEn: 'Pterosaur', emoji: '🦅', museum: '恐龙博物馆', rarity: '史诗', story: '翼龙会在古代天空中展开翅膀滑翔。' },
  { objectZh: '太阳', objectEn: 'Sun', emoji: '☀️', museum: '自然博物馆', rarity: '传奇', story: '太阳给地球带来光和热。' },
  { objectZh: '月亮', objectEn: 'Moon', emoji: '🌙', museum: '自然博物馆', rarity: '稀有', story: '月亮会反射太阳光，所以夜晚看起来会发亮。' },
  { objectZh: '星星', objectEn: 'Star', emoji: '⭐', museum: '自然博物馆', rarity: '稀有', story: '星星其实是非常遥远的发光天体。' },
  { objectZh: '彩虹', objectEn: 'Rainbow', emoji: '🌈', museum: '自然博物馆', rarity: '传奇', story: '彩虹常在阳光穿过雨滴后出现。' },
  { objectZh: '云', objectEn: 'Cloud', emoji: '☁️', museum: '自然博物馆', rarity: '普通', story: '云是由许多小水滴或小冰晶组成的。' },
  { objectZh: '雪花', objectEn: 'Snowflake', emoji: '❄️', museum: '自然博物馆', rarity: '稀有', story: '雪花通常有六个角，每一片都很特别。' },
  { objectZh: '火山', objectEn: 'Volcano', emoji: '🌋', museum: '自然博物馆', rarity: '史诗', story: '火山喷发时会把地下的岩浆带到地表。' },
  { objectZh: '瀑布', objectEn: 'Waterfall', emoji: '💦', museum: '自然博物馆', rarity: '史诗', story: '瀑布是河水从高处落下形成的壮观景象。' },
  { objectZh: '河流', objectEn: 'River', emoji: '🌊', museum: '自然博物馆', rarity: '普通', story: '河流会把水从高处带向湖泊或大海。' },
  { objectZh: '大海', objectEn: 'Ocean', emoji: '🌊', museum: '自然博物馆', rarity: '史诗', story: '大海覆盖了地球表面的大部分区域。' },
  { objectZh: '森林', objectEn: 'Forest', emoji: '🌲', museum: '自然博物馆', rarity: '稀有', story: '森林是许多动物和植物共同生活的家园。' },
  { objectZh: '树', objectEn: 'Tree', emoji: '🌳', museum: '自然博物馆', rarity: '普通', story: '树会吸收二氧化碳，并释放出氧气。' },
  { objectZh: '花', objectEn: 'Flower', emoji: '🌸', museum: '自然博物馆', rarity: '普通', story: '花会用颜色和香味吸引小昆虫来帮忙传粉。' },
  { objectZh: '电脑', objectEn: 'Computer', emoji: '💻', museum: '科技博物馆', rarity: '稀有', story: '电脑可以帮助人们计算、画画、学习和创造。' },
  { objectZh: '手机', objectEn: 'Mobile Phone', emoji: '📱', museum: '科技博物馆', rarity: '稀有', story: '手机让人们可以随时通话、拍照和查资料。' },
  { objectZh: '相机', objectEn: 'Camera', emoji: '📷', museum: '科技博物馆', rarity: '稀有', story: '相机可以把一瞬间的画面保存下来。' },
  { objectZh: '电视', objectEn: 'Television', emoji: '📺', museum: '科技博物馆', rarity: '普通', story: '电视能把远处的影像和声音带到家里。' },
  { objectZh: '机器人', objectEn: 'Robot', emoji: '🤖', museum: '科技博物馆', rarity: '史诗', story: '机器人可以帮助人类完成危险或重复的工作。' },
  { objectZh: '卫星', objectEn: 'Satellite', emoji: '🛰️', museum: '科技博物馆', rarity: '史诗', story: '卫星在太空中帮助我们导航、通信和观察地球。' },
  { objectZh: '望远镜', objectEn: 'Telescope', emoji: '🔭', museum: '科技博物馆', rarity: '稀有', story: '望远镜能帮助我们看见遥远的星星和星球。' },
  { objectZh: '演员', objectEn: 'Actor', emoji: '🎭', museum: '人物职业馆', rarity: '稀有', story: '演员会用表情、动作和语言把故事中的角色生动地演出来。' },
  { objectZh: '男人', objectEn: 'Man', emoji: '👨', museum: '人物职业馆', rarity: '普通', story: '男人是人物世界中的一种常见形象，可以有许多不同的职业和故事。', aliases: ['male', '男性'] },
  { objectZh: '女人', objectEn: 'Woman', emoji: '👩', museum: '人物职业馆', rarity: '普通', story: '女人可以在生活、工作和故事中扮演许多重要角色。', aliases: ['female', '女性'] },
  { objectZh: '人物', objectEn: 'Person', emoji: '🧑', museum: '人物职业馆', rarity: '普通', story: '人物代表真实生活中的人，也可以是故事里正在发生冒险的角色。', aliases: ['human', 'people', '人'] },
  { objectZh: '孩子', objectEn: 'Child', emoji: '🧒', museum: '人物职业馆', rarity: '普通', story: '孩子正在学习、成长和探索世界，每天都可能有新的发现。', aliases: ['kid', 'boy', 'girl', '儿童'] },
  { objectZh: '歌手', objectEn: 'Singer', emoji: '🎤', museum: '人物职业馆', rarity: '稀有', story: '歌手用歌声表达情感，也能把快乐传递给听众。' },
  { objectZh: '医生', objectEn: 'Doctor', emoji: '🩺', museum: '人物职业馆', rarity: '稀有', story: '医生学习很多身体和健康知识，帮助人们恢复健康。' },
  { objectZh: '老师', objectEn: 'Teacher', emoji: '👩‍🏫', museum: '人物职业馆', rarity: '普通', story: '老师会把知识一步一步讲清楚，陪伴孩子学习和成长。' },
  { objectZh: '警察', objectEn: 'Police Officer', emoji: '👮', museum: '人物职业馆', rarity: '稀有', story: '警察守护城市安全，也会在大家需要帮助时出现。' },
  { objectZh: '消防员', objectEn: 'Firefighter', emoji: '👨‍🚒', museum: '人物职业馆', rarity: '史诗', story: '消防员会勇敢地灭火救援，保护人们的生命和家园。' },
  { objectZh: '厨师', objectEn: 'Chef', emoji: '👨‍🍳', museum: '人物职业馆', rarity: '普通', story: '厨师能把食材变成美味的饭菜，让餐桌充满香气。' },
  { objectZh: '司机', objectEn: 'Driver', emoji: '🚗', museum: '人物职业馆', rarity: '普通', story: '司机熟悉道路和交通规则，帮助人们安全到达目的地。' },
  { objectZh: '画家', objectEn: 'Painter', emoji: '🎨', museum: '人物职业馆', rarity: '稀有', story: '画家用颜色和线条记录想象，也能画出心里的世界。' },
  { objectZh: '运动员', objectEn: 'Athlete', emoji: '🏃', museum: '人物职业馆', rarity: '稀有', story: '运动员通过长期训练挑战自己，在比赛中展现速度和力量。' },
  { objectZh: '科学家', objectEn: 'Scientist', emoji: '🔬', museum: '人物职业馆', rarity: '史诗', story: '科学家会提出问题、做实验，探索世界运行的秘密。' },
  { objectZh: '宇航员', objectEn: 'Astronaut', emoji: '👨‍🚀', museum: '人物职业馆', rarity: '传奇', story: '宇航员经过严格训练，可以乘坐飞船去太空探索。' },
];

export const MUSEUM_ARTIFACT_MUSEUMS = [
  { emoji: '🚗', id: 'traffic', title: '交通博物馆' },
  { emoji: '🐼', id: 'animal', title: '动物博物馆' },
  { emoji: '🦖', id: 'dinosaur', title: '恐龙博物馆' },
  { emoji: '🌳', id: 'nature', title: '自然博物馆' },
  { emoji: '💻', id: 'technology', title: '科技博物馆' },
  { emoji: '🎭', id: 'profession', title: '人物职业馆' },
];

export const MUSEUM_ARTIFACT_BADGES: MuseumBadgeData[] = [
  { emoji: '🦖', id: 'badge-dinosaur', museumId: 'dinosaur', title: '恐龙探索家' },
];

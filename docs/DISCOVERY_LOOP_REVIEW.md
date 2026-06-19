# MILESTONE-032 Discovery Loop Review

## Purpose

审查当前 `Discovery -> Learning` 完整用户闭环，判断用户从拍照识别到学习驾驶舱之间是否形成清晰、持续、有动力的探索循环。

本文件只做产品审查，不修改代码，不新增功能。

## Constraints

- 禁止修改代码
- 禁止新增功能
- 禁止修改 Gemini
- 禁止修改 backend
- 禁止修改 XP
- 禁止修改 Achievement
- 禁止修改 Daily Quest
- 禁止修改 Treasure Chest
- 禁止修改 Audio

## 1. Current Discovery Flow

当前完整闭环可以描述为：

```text
拍照 / 选择图片
↓
Gemini 识别
↓
结果卡显示
↓
发现藏品
↓
加入收藏
↓
藏品故事
↓
知识卡 / 百科
↓
知识分类
↓
主题知识册
↓
知识挑战
↓
探索学院
↓
学习驾驶舱 Learning Dashboard
```

换成用户视角：

```text
我看见一个真实物体
↓
我拍下来
↓
APP 告诉我这是什么
↓
它变成我的魔法藏品
↓
我知道它的故事和知识
↓
我可以参加挑战
↓
我看到自己在学院和学习驾驶舱里成长
↓
我想继续找下一个东西
```

## 2. 流失点分析

### Drop-off 1: 拍照前

用户可能离开的原因：

- 不知道应该拍什么
- 当前首页如果缺少明确探索目标，用户可能停在入口
- 如果识别失败体验过多，用户会降低信任

影响：

High

原因：

这是整个闭环的第一步，一旦用户不拍照，后面的收藏、知识、挑战都不会发生。

### Drop-off 2: 识别后

用户可能离开的原因：

- 结果卡只告诉“这是什么”，但没有强烈提示“这次发现解锁了什么”
- 用户看到结果后不知道下一步应该点故事、百科、知识挑战还是继续拍

影响：

High

原因：

识别成功是最强的兴奋点，如果没有立刻承接到故事、知识或收藏成长，会浪费关键瞬间。

### Drop-off 3: 收藏后

用户可能离开的原因：

- 收藏成功反馈如果不突出，用户不知道这次发现进入了哪个长期系统
- 图鉴、博物馆、知识册、学院之间的关系较多，可能让用户迷路

影响：

Medium

原因：

用户已经完成一次核心行为，但还没有被明确引导到下一次探索。

### Drop-off 4: 故事 / 知识入口

用户可能离开的原因：

- 故事和知识如果只是“附加文本”，吸引力可能不如发现瞬间
- 如果入口不够明显，孩子可能只看图，不继续阅读

影响：

Medium

原因：

这是从“收集”转向“学习”的关键桥梁。

### Drop-off 5: 挑战入口

用户可能离开的原因：

- 挑战需要明确目标和反馈，否则用户不知道为什么要挑战
- 如果挑战只显示题目数量，不说明和刚发现的藏品有关，连接感会变弱

影响：

Medium

原因：

挑战是复习和巩固的入口，但当前仍属于轻量第一版。

### Drop-off 6: 学习驾驶舱

用户可能离开的原因：

- Dashboard 信息量大，用户可能看不出“我下一步该做什么”
- Profile、Statistics、Mastery、Timeline、Motivation、Journey、Coach 同时存在时，容易形成信息堆叠

影响：

High

原因：

Dashboard 是闭环终点，也是下一轮发现的起点。如果这里没有形成明确反馈，闭环会断。

## 3. 激励点分析

### Motivation 1: 新发现反馈

用户为什么继续：

- 每次拍照都有机会获得新藏品
- 稀有度、故事、收藏进度能放大发现感

强度：

High

### Motivation 2: 收藏成长

用户为什么继续：

- 图鉴、收藏册、博物馆让发现有归属
- 未发现内容形成探索空位

强度：

High

### Motivation 3: 知识解锁

用户为什么继续：

- 发现后才能看到知识，符合 Discovery Rule
- 学习内容不是提前灌输，而是被发现触发

强度：

Medium

### Motivation 4: 挑战解锁

用户为什么继续：

- 只有发现过的藏品才能出题
- 形成“先发现，再学习，再挑战”的顺序

强度：

Medium

### Motivation 5: 学院成长

用户为什么继续：

- 探索学院把知识分类变成成长身份
- 用户能看到不同知识领域的进度

强度：

Medium

### Motivation 6: Learning Dashboard 总反馈

用户为什么继续：

- Dashboard 汇总当前等级、掌握度、学院等级、下一目标和最近活动
- 能把一次次发现转成长期成长感

强度：

High

## 4. Story Layer Review

### 当前状态

Story Layer 包括：

- 藏品故事
- Discovery Facts
- Encyclopedia 中的 story / fact
- Museum NPC 问候和馆长语境
- Magic Storyline 世界记忆之书

### 优点

- 故事只在发现后展示，符合 Discovery Rule。
- 每个藏品不只是“名字”，还有背景知识和儿童科普。
- 世界记忆之书为“为什么要发现藏品”提供了大世界观。

### 问题

High:

- 故事入口还没有成为识别成功后的第一行动。用户可能看到结果卡后直接离开，而不是进入故事。

Medium:

- 藏品故事、百科故事、Discovery Facts、世界记忆故事存在多个层级，但用户不一定理解它们之间的关系。

Low:

- NPC 话术增强了陪伴感，但目前对单个藏品故事的承接还可以更强。

### Review Result

Story Layer 方向正确，但需要更靠近“发现瞬间”。

## 5. Knowledge Layer Review

### 当前状态

Knowledge Layer 包括：

- Discovery Facts
- Knowledge Categories
- Knowledge Collections
- Discovery Encyclopedia
- Museum Collections Book

### 优点

- 知识内容和已发现藏品绑定。
- 未发现藏品不泄露完整知识，符合 Discovery Rule。
- 知识分类和主题知识册让学习不只是散点。

### 问题

High:

- 知识入口较分散：百科、知识册、收藏册、故事卡都可能展示知识，用户可能不知道哪个是主学习入口。

Medium:

- 知识卡和百科之间的关系需要更明确：知识卡是“快速知识”，百科是“完整档案”。

Low:

- 多语言内容和知识内容仍需要长期覆盖率提升。

### Review Result

Knowledge Layer 已经和 Discovery 有强连接，但信息入口需要收敛。

## 6. Challenge Layer Review

### 当前状态

Challenge Layer 包括：

- Knowledge Quiz
- 已解锁题目统计
- Dashboard / Coach 中的挑战推荐

### 优点

- Quiz 只从已发现藏品生成，符合 Learn By Discovery。
- 挑战不会提前泄露未发现知识。
- 能把“看过”变成“试着记住”。

### 问题

High:

- 挑战目标还不够具体。用户知道可以挑战，但不一定知道挑战能完成什么短期目标。

Medium:

- 当前挑战更多是“解锁题目”，而不是真实答题历史。文案如果写成完成率，容易误导。

Low:

- 挑战和刚刚识别的藏品之间还可以有更即时的连接，例如“刚发现的这个，可以马上挑战一题”。

### Review Result

Challenge Layer 架构正确，但目标感和即时性需要加强。

## 7. Academy Layer Review

### 当前状态

Academy Layer 包括：

- Explorer Academy
- Knowledge Categories
- Knowledge Collections
- Academy progress
- Academy level in Dashboard

### 优点

- 学院把知识分类人格化、游戏化。
- 用户能看到自己在动物、科技、文明、艺术等领域的成长。
- 很适合儿童长期学习感。

### 问题

High:

- 学院升级意义还不够明确。用户看到学院等级，但不一定知道升级后代表什么能力或身份。

Medium:

- Explorer Academy 与 Knowledge Collections 有内容重叠，需要明确一个是“学习路径”，一个是“知识册内容”。

Low:

- 学院可以未来接入更清晰的称号、徽章或阶段说明，但当前不建议新增奖励系统。

### Review Result

Academy Layer 有潜力成为长期成长主线，但需要更清楚地解释“为什么升级有意义”。

## 8. Dashboard Review

### 当前状态

Learning Dashboard 已包含：

- Dashboard Snapshot
- Recommended Next Action
- Recent Activity
- Summary Cards
- Learning Coach
- Learning Journey
- Learning Motivation
- Knowledge Mastery
- Learning Statistics
- Learning Timeline

### 优点

- Dashboard 已经能承接 Discovery 后的长期反馈。
- Snapshot 让用户快速看到当前状态。
- Recommended Next Action 让用户知道下一步。
- Recent Activity 让用户看到最近发现、知识册和挑战。

### 问题

High:

- Dashboard 仍然承载过多模块，如果不做信息层级收敛，可能变成长页面堆叠。

Medium:

- Recommended Next Action 是正确方向，但需要未来和具体入口联动，否则只是提示文字。

Low:

- Recent Activity 当前复用推导 Timeline，不是真实历史。文案要避免暗示真实时间线。

### Review Result

Dashboard 已经能形成闭环终点，但下一步需要让它成为“下一轮探索的启动器”。

## High / Medium / Low 问题列表

## High

1. 发现成功后缺少足够强的故事承接，可能浪费最强兴奋点。
2. Learning Dashboard 信息层级仍偏重，可能让用户看不出核心行动。
3. 知识入口分散，百科、知识册、收藏册、故事卡之间主次不够明确。
4. 挑战目标不够具体，用户不一定知道为什么现在要挑战。
5. 学院升级意义不够明确，成长身份还需要更强解释。

## Medium

1. 收藏成功后没有足够清晰地说明进入了哪个长期系统。
2. Story / Fact / Encyclopedia / Storyline 多层故事关系需要更清楚。
3. Knowledge Card 和 Encyclopedia 的层级需要明确。
4. Challenge Completion 文案容易暗示真实答题完成率。
5. Explorer Academy 与 Knowledge Collections 有部分语义重叠。
6. Recommended Next Action 需要未来和具体入口联动。
7. Timeline / Recent Activity 仍是当前状态推导，不是真实历史。

## Low

1. NPC 可以进一步承接单个藏品故事。
2. 多语言知识覆盖率需要长期提升。
3. 挑战可以未来增加“刚发现藏品的一题挑战”。
4. 学院未来可以增加阶段说明或身份解释。
5. Dashboard 后续可以做折叠/展开优化。

## Top 10 Product Improvements

1. 识别成功后，在结果卡增加更明确的“解锁故事 / 学习一下 / 去挑战”下一步引导。
2. 将 Story Layer 放得更靠近发现瞬间，让“我发现了什么故事”成为第一反馈之一。
3. 明确知识入口层级：知识卡是快速知识，百科是完整档案，知识册是主题学习路径。
4. Dashboard 顶部只保留一个最强下一步行动，避免多个 competing CTA。
5. 把挑战文案从“完成率”改成“挑战解锁率”，直到有真实答题历史。
6. 为 Knowledge Quiz 增加更具体的短期目标文案，例如“挑战 1 道你刚解锁的题”。
7. 为 Explorer Academy 增加“学院等级代表什么”的解释，让升级更有意义。
8. 收藏成功后明确显示它点亮了哪个博物馆、知识册、学院或世界记忆。
9. 将 Recent Activity 文案定位为“最近学习线索”或“当前学习轨迹”，避免误认为真实历史。
10. 后续将 Dashboard 作为 Discovery Loop 的最终反馈和下一轮入口，而不是单纯统计页。

## Recommended Next Milestone

建议进入 MILESTONE-033。

推荐主题：

```text
MILESTONE-033 Discovery Loop Action Design
```

建议目标：

- 不新增系统
- 不改后端
- 不改奖励
- 只设计从结果卡到故事、知识、挑战、Dashboard 的行动路径

推荐优先处理：

1. 识别结果卡的下一步引导
2. Story / Knowledge / Challenge 三个入口的主次关系
3. Dashboard 推荐行动到具体入口的产品路径

## Final Review Result

当前 Discovery -> Learning 闭环已经成立：

```text
发现
↓
收藏
↓
故事
↓
知识
↓
挑战
↓
学院
↓
学习驾驶舱
↓
下一次发现
```

但闭环还可以更紧：

- 发现瞬间需要更强故事承接
- 学习入口需要更清晰主次
- 挑战需要更明确目标
- 学院升级需要更强意义
- Dashboard 需要成为下一轮探索启动器

Status: REVIEW_COMPLETED

## MILESTONE-033 Planned Fixes

Status: IMPLEMENTED_IN_PRODUCT_POLISH

Purpose:

Strengthen the Discovery -> Learning action path without adding new systems, storage, rewards, tasks, achievements, backend APIs, or Gemini changes.

Planned fixes applied:

1. Result Card Action Path

- Added a clearer next-step area on the successful recognition result card.
- Recommended order is now visible:
  - 📖 读故事
  - 🧠 学知识
  - 🎯 去挑战

2. Artifact Detail Action Path

- Added guidance after the story area:
  - 读完故事后，可以继续查看知识点。
- Added guidance after the knowledge path:
  - 学完知识后，可以去完成知识挑战。

3. Discovery Celebration Action Path

- Discovery celebration now checks whether the discovered artifact has an unlocked quiz source.
- If quiz content exists, it shows:
  - 🎯 去挑战
- If quiz content does not exist, it shows:
  - 🔎 继续发现

4. Knowledge Quiz Goal Clarity

- Added a goal statement:
  - 完成挑战，让世界记忆恢复更多。

5. Learning Dashboard Recommended Next Action

Recommended Next Action is now biased toward the next discovery loop:

- 继续发现新藏品
- 完成未完成知识册
- 参与已解锁挑战
- 查看学院进度

Discovery Rule compatibility:

- 未发现内容仍不展示故事、知识点、百科正文或 Quiz 答案。
- 本次只增加行动提示，不提前泄露未发现内容。

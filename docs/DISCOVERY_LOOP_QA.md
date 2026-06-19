# MILESTONE-034 Discovery Loop QA

## Purpose

审查 MILESTONE-033 后的 Discovery -> Learning 行动路径是否顺畅。

本文件只做 QA 审查记录，不修改业务代码，不新增功能，不重构，不修改 Gemini、backend、XP、Achievement、Daily Quest、Treasure Chest、Audio。

## Scope

检查路径：

1. 首页点击开始发现
2. 拍照识别
3. 识别成功弹窗
4. 点击阅读故事
5. 从故事进入知识
6. 从知识进入挑战
7. 从挑战返回学习驾驶舱
8. 学习驾驶舱推荐下一步
9. 继续发现新藏品

重点检查：

- 是否有断链
- 是否有重复入口
- 是否有按钮文案不清楚
- 是否有未发现内容提前泄露
- 是否符合 Discovery Rule
- 是否符合 Learn By Discovery
- 是否符合儿童用户理解习惯

## QA Findings

### QA-001

页面：
识别成功结果卡 MagicWordCard

问题：
“📖 读故事 / 🧠 学知识 / 🎯 去挑战”目前是可见的下一步提示，但不是明确可点击按钮。用户会看到下一步方向，却不一定知道应该点哪里进入故事、知识或挑战。

严重度：
High

建议：
在 MILESTONE-035 中把三项改成明确 CTA。推荐保留一个主行动“📖 读故事”，另外两个作为次级入口或后续提示，避免一次出现三个同等主按钮。

状态：
OPEN

### QA-002

页面：
识别成功弹窗 DiscoveryCelebrationModal

问题：
“📖 阅读故事”“🧠 查看知识”“🎯 去挑战 / 🔎 继续发现”都会调用关闭弹窗逻辑，视觉上像按钮，但实际没有直接进入对应页面。这里存在行动断链。

严重度：
High

建议：
为弹窗增加明确的 action callback：阅读故事进入藏品详情，查看知识进入百科或知识卡，去挑战进入 KnowledgeQuizPanel。若暂时无法跳转，应把按钮文案改成“关闭后可在详情中查看”，避免误导。

状态：
OPEN

### QA-003

页面：
藏品详情 ArtifactDetailModal

问题：
故事后已经出现“读完故事后，可以继续查看知识点”“学完知识后，可以去完成知识挑战”的提示，但详情页没有对应的“查看知识点”或“去挑战”按钮。用户读完提示后仍需要自己寻找入口。

严重度：
High

建议：
在故事区域下方增加一个主按钮“🧠 查看知识点”，在知识区域下方增加一个次按钮“🎯 去挑战”。按钮必须遵守 Discovery Rule，只对已发现藏品展示完整内容。

状态：
OPEN

### QA-004

页面：
知识入口 / 百科 / 知识册

问题：
当前知识相关入口较多：Discovery Fact、Discovery Encyclopedia、Knowledge Collections、Museum Collections Book、Artifact Detail。MILESTONE-033 增加了“学知识”的方向，但没有定义“学知识”优先进入哪个页面。

严重度：
Medium

建议：
建立一个默认知识路径：单个藏品优先进入 Artifact Detail 内的知识卡；主题学习进入 Knowledge Collections；完整档案进入 Encyclopedia。按钮文案要区分“看这个藏品的知识”和“打开主题知识册”。

状态：
OPEN

### QA-005

页面：
KnowledgeQuizPanel

问题：
Quiz 页面新增了“完成挑战，让世界记忆恢复更多。”，目标更清楚了。但从刚发现的单个藏品到对应题目的直接路径仍不明确，用户可能进入 Quiz 后看到的是题库轮播，而不是刚刚发现的藏品题目。

严重度：
Medium

建议：
后续支持从藏品上下文进入 Quiz，并优先显示该藏品对应题目。如果该藏品没有题目，则显示“这个藏品暂时没有挑战，继续发现更多内容”。

状态：
OPEN

### QA-006

页面：
KnowledgeQuizPanel -> Learning Dashboard

问题：
检查路径要求“从挑战返回学习驾驶舱”。当前 Quiz 通常嵌套在 KnowledgeCollectionsPanel 内，返回路径更像回到知识册，而不是直接回到 Learning Dashboard。闭环终点不够直接。

严重度：
Medium

建议：
在 Quiz 完成或答题后增加一个清晰入口：“返回学习驾驶舱”或“查看学习总览”。不需要新增系统，只需补导航入口。

状态：
OPEN

### QA-007

页面：
Learning Dashboard

问题：
Recommended Next Action 已经偏向“继续发现新藏品 / 完成未完成知识册 / 参与已解锁挑战 / 查看学院进度”，方向正确。但它仍是展示卡片，不是可点击行动入口。

严重度：
Medium

建议：
在 MILESTONE-035 中把 Recommended Next Action 做成可执行 CTA。不同推荐类型跳转到不同现有页面：发现新藏品回首页识别区，知识册进入 KnowledgeCollectionsPanel，挑战进入 KnowledgeQuizPanel，学院进入 ExplorerAcademyPanel。

状态：
OPEN

### QA-008

页面：
首页 / 发现入口

问题：
首页的发现入口仍以拍照或选择图片为主，适合 MVP，但对儿童用户来说“今天可以找什么”不够明确。用户可能不知道下一张照片应该拍动物、交通工具还是生活物体。

严重度：
Medium

建议：
复用已有 Daily Quest / Recommended Next Action 的文本，在首页发现入口附近提供一个轻量提示，例如“今天试试找一个动物朋友”。不新增任务系统，只复用已有推荐信息。

状态：
OPEN

### QA-009

页面：
识别成功弹窗

问题：
弹窗中的按钮数量已经达到三个，加上底部“继续探索”，对儿童用户可能形成选择压力。阅读故事、查看知识、去挑战、继续探索之间主次不够清楚。

严重度：
Medium

建议：
保留一个主按钮：“📖 阅读故事”。次级入口可放成小链接：“查看知识”“去挑战”。底部“继续探索”作为关闭/返回发现的辅助按钮。

状态：
OPEN

### QA-010

页面：
结果卡 / 藏品详情 / 百科

问题：
“故事”“知识”“百科”的边界仍容易混淆。孩子可能理解为都是文字内容，但不知道哪个是第一步、哪个是深入学习。

严重度：
Medium

建议：
统一文案层级：故事 = 先了解这个藏品；知识 = 记住一个小知识；百科 = 查看完整档案。所有入口使用这个命名体系。

状态：
OPEN

### QA-011

页面：
未发现藏品 / 知识系统

问题：
本次检查未发现明显的未发现内容提前泄露。当前 Quiz 仍基于已发现内容，百科和知识系统也有 Discovery Rule 约束。

严重度：
Low

建议：
继续保持当前规则。后续新增任何“去挑战”或“查看知识”快捷入口时，都必须先经过已发现状态判断。

状态：
MONITOR

### QA-012

页面：
Discovery Rule / Learn By Discovery

问题：
整体顺序仍符合“先发现 -> 再学习 -> 再挑战”。但部分 CTA 只是提示，不是实际跳转，导致 Learn By Discovery 的路径在体验上还没有完全闭合。

严重度：
Medium

建议：
MILESTONE-035 优先把提示型 CTA 变成真实导航型 CTA，而不是继续增加新模块。

状态：
OPEN

### QA-013

页面：
按钮文案一致性

问题：
同类入口存在“读故事”“阅读故事”等不同表达。含义相近，但儿童产品里建议统一，以降低理解成本。

严重度：
Low

建议：
统一使用“📖 阅读故事”“🧠 学知识”“🎯 去挑战”“🔎 继续发现”。

状态：
OPEN

### QA-014

页面：
学习驾驶舱

问题：
Dashboard 顶部仍有英文标签，例如 Recommended Next Action、Recent Activity、Dashboard Snapshot。对中文儿童用户来说，这些英文标签可能降低理解速度。

严重度：
Low

建议：
中文语言下统一显示中文标签：“推荐下一步”“最近学习线索”“学习快照”。保留多语言层，但确保中文默认体验自然。

状态：
OPEN

### QA-015

页面：
继续发现新藏品

问题：
“继续发现新藏品”作为 Dashboard 推荐是正确的，但没有明确说明下一步是拍照、选择相册，还是返回首页。行动终点不够具体。

严重度：
Medium

建议：
把推荐详情改为更行动化的文案，例如“回到首页，再拍一张新照片”。如果实现 CTA，则直接回到首页发现区。

状态：
OPEN

## Path-by-Path QA Summary

| Step | QA Result | Notes |
| --- | --- | --- |
| 1. 首页点击开始发现 | Acceptable | 识别入口清楚，但下一张该发现什么还可以更明确。 |
| 2. 拍照识别 | Passed | 本次不审查 Gemini/backend。 |
| 3. 识别成功弹窗 | Needs Fix | 有行动按钮，但多数只是关闭弹窗。 |
| 4. 点击阅读故事 | Needs Fix | 按钮文案存在，但未直接进入故事页/详情。 |
| 5. 从故事进入知识 | Needs Fix | 有提示，没有明确跳转按钮。 |
| 6. 从知识进入挑战 | Needs Fix | 有提示，没有单藏品挑战入口。 |
| 7. 从挑战返回学习驾驶舱 | Needs Fix | 当前返回更偏向知识册层级。 |
| 8. 学习驾驶舱推荐下一步 | Improved | 推荐方向正确，但仍不是可点击 CTA。 |
| 9. 继续发现新藏品 | Needs Fix | 推荐存在，但回到发现入口的动作不够直接。 |

## Discovery Rule Check

Status: PASSED_WITH_MONITORING

结论：
当前 MILESTONE-033 改动没有发现未发现内容提前泄露。新增内容主要是行动提示，不展示未发现藏品的故事、知识点、百科正文或 Quiz 答案。

后续风险：
如果 MILESTONE-035 把“去挑战”“查看知识”做成真实按钮，必须继续使用已发现状态和 Quiz 解锁状态进行过滤。

## Learn By Discovery Check

Status: PASSED_WITH_NAVIGATION_GAPS

结论：
产品顺序仍然是：

```text
发现
-> 阅读故事
-> 学知识
-> 去挑战
-> 查看学习驾驶舱
-> 继续发现
```

但当前多个节点还是“提示路径”，不是“可执行路径”。因此原则成立，但体验闭环还需要修复断链。

## Child Comprehension Check

Status: NEEDS_POLISH

适合儿童理解的部分：

- 图标化路径清楚：📖 / 🧠 / 🎯 / 🔎
- “继续发现”比抽象学习词更容易理解
- Quiz 目标文案比之前更有意义

仍需优化：

- 同屏按钮不宜太多
- 主按钮和次按钮需要更明显
- 英文标签在中文模式下需要替换
- “学习驾驶舱”适合成人理解，但儿童可能更容易理解“学习小屋”或“成长档案”

## Severity Summary

High 数量：3

Medium 数量：9

Low 数量：3

## Recommendation

是否建议进入 MILESTONE-035 Fixes：

YES

建议 MILESTONE-035 聚焦修复：

1. 把识别成功弹窗和结果卡的提示型入口变成真实可点击路径。
2. 建立单个藏品的默认学习路径：阅读故事 -> 查看知识 -> 去挑战。
3. 让 Quiz 可以从当前藏品上下文进入，并优先显示对应题目。
4. 让 Learning Dashboard 的 Recommended Next Action 成为可执行 CTA。
5. 统一儿童友好的按钮文案和中英文标签。

## Final QA Result

MILESTONE-033 已明显改善 Discovery -> Learning 的行动提示，但当前仍存在关键断链：

```text
看得到下一步
-> 但不一定点得到下一步
```

因此 MILESTONE-034 的结论是：

- Discovery Rule：通过
- Learn By Discovery：原则通过
- 儿童理解习惯：方向正确，但按钮主次和真实跳转需要优化
- 是否进入 MILESTONE-035 Fixes：建议进入

Status: QA_COMPLETED_WITH_OPEN_FIXES
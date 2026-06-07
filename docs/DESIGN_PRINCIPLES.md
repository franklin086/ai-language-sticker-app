# AI魔法识字相机 Design Principles

本文件用于记录项目长期产品原则。后续新增功能应优先遵守这些原则，避免短期功能破坏长期体验。

---

# DESIGN PRINCIPLE-001

## World First

### Status

Active

### Priority

High

### Description

先探索世界，再获得奖励。

系统应优先让用户感受到真实世界、藏品、博物馆、城市、国家和文明之间的探索关系。奖励系统应服务于探索，而不是替代探索本身。

---

# DESIGN PRINCIPLE-002

## Content Before Gamification

### Status

Active

### Priority

High

### Description

内容价值优先于数值成长。

XP、宝箱、徽章、任务和成就都应该围绕知识、语言、观察和发现展开。游戏化是学习体验的放大器，不应成为空转的数值系统。

---

# DESIGN PRINCIPLE-003

## Architecture Before Features

### Status

Active

### Priority

High

### Description

先搭基础设施，再接具体能力。

当某个能力会长期扩展时，应优先建立稳定的数据结构、helper、hook、组件边界和 fallback 逻辑，再接入具体服务或内容。避免为单个功能重复建设临时架构。

---

# DESIGN PRINCIPLE-004

## Discovery Rule

### Status

Active

### Priority

High

### Description

任何会提前泄露藏品价值、知识内容、探索成果或奖励信息的数据，都必须在用户完成对应发现行为后才允许展示。

系统应优先保护探索过程本身，而不是提前展示结果。

探索的乐趣来源于发现，而不是剧透。

---

## Core Principle

已发现

↓

允许展示完整内容

未发现

↓

禁止展示核心内容

---

## Applies To

### Discovery Facts

知识卡

允许：

已发现藏品显示知识点

禁止：

未发现藏品提前显示知识内容

---

### Encyclopedia

发现百科

允许：

已发现藏品显示完整百科内容

禁止：

未发现藏品显示完整正文

---

### Artifact Story

藏品故事

允许：

已发现后阅读完整故事

禁止：

未发现提前阅读故事

---

### Collection Sets

收藏套装

允许：

显示套装存在

允许：

显示完成进度

禁止：

未发现藏品显示完整内容

---

### Future Knowledge System

未来知识系统

包括：

- 知识图谱
- 知识问答
- 学习路线
- 文明档案
- 世界记忆系统

均遵循本规则。

---

## Not Allowed

以下内容禁止提前泄露：

- 完整知识点
- 完整百科正文
- 完整故事内容
- 隐藏奖励内容
- 隐藏成就内容
- 未发现藏品详细信息
- 未解锁国家核心内容
- 未解锁博物馆核心内容

---

## Allowed

允许展示：

- ？？？
- 神秘藏品
- 未发现
- 继续探索解锁
- 当前进度
- 已完成数量
- 解锁条件

---

## Product Goal

保持用户探索欲。

保护发现瞬间的惊喜感。

让学习过程具有持续驱动力。

---

## Example

正确：

🐼 熊猫（已发现）

💡 你知道吗？

熊猫每天会吃大量竹子。

---

正确：

❓ 神秘藏品

继续探索后解锁知识

---

错误：

❓ 神秘藏品

💡 你知道吗？

熊猫每天会吃大量竹子。

（违反 Discovery Rule）

---

## First Introduced

v0.65A Discovery Facts Engine

## Milestone

MILESTONE-021

---

# DESIGN PRINCIPLE-005

## Learn By Discovery

### Status

Active

### Priority

High

### Description

学习顺序必须遵循：

发现

↓

学习

↓

挑战

用户必须先完成发现行为，再阅读知识内容，最后才能进入对应知识挑战。

禁止对未发现内容进行测验。

---

## Core Principle

先发现

↓

再学习

↓

再挑战

---

## Applies To

- Knowledge Quiz
- Discovery Facts
- Encyclopedia
- Future Knowledge Challenges
- Future Learning Routes

---

## Not Allowed

- 未发现藏品直接进入测验
- 未发现藏品显示正确答案
- 未发现藏品参与挑战统计
- 未发现知识点进入学习路线

---

## Allowed

- 已发现藏品进入测验
- 已发现知识点进入挑战
- 显示已解锁题目数量
- 显示继续探索后解锁挑战

---

## First Introduced

v0.65D Knowledge Quiz Engine

## Milestone

MILESTONE-024

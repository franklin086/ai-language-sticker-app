# AI魔法识字相机 Development Manual

本开发手册用于记录项目长期开发约定、产品原则和架构边界。后续新增功能、重构和内容扩展都应优先遵守本手册。

---

## 核心设计原则（Core Design Principles）

核心设计原则采用编号管理。详细规则可同步参考：

- `docs/DESIGN_PRINCIPLES.md`

---

### DESIGN PRINCIPLE-001

## World First

### Status

Active

### Priority

High

### Principle

先探索世界，再获得奖励。

### Development Rule

新增功能应优先强化：

- 真实世界探索
- 藏品发现
- 博物馆完成
- 城市、国家、世界进度
- 文明、自然、科技、艺术等内容联系

奖励系统应服务于探索，而不是替代探索本身。

---

### DESIGN PRINCIPLE-002

## Content Before Gamification

### Status

Active

### Priority

High

### Principle

内容价值优先于数值成长。

### Development Rule

XP、宝箱、徽章、任务、成就、等级和活动都必须围绕以下价值展开：

- 语言学习
- 观察能力
- 知识理解
- 世界探索
- 文化认知

禁止为了数值增长而制造空转玩法。

---

### DESIGN PRINCIPLE-003

## Architecture Before Features

### Status

Active

### Priority

High

### Principle

先搭基础设施，再接具体能力。

### Development Rule

当某项能力具有长期扩展价值时，应先建立：

- 数据结构
- helper
- hook
- UI 组件边界
- fallback 逻辑
- 覆盖率或健康度统计

再接入真实服务、真实资源或大型内容。

### Current Example

Audio Foundation 已按此原则完成：

- v0.64A Audio Architecture
- v0.64B Local Audio Assets
- v0.64C Smart Audio Strategy
- v0.64D First Audio Pack
- v0.64E Audio Coverage Analysis

后续音频能力应优先复用现有架构，原则上不再重复建设 Audio Foundation。

---

### DESIGN PRINCIPLE-004

## Discovery Rule

### Status

Active

### Priority

High

### Principle

任何核心内容必须发现后才能展示。

### Description

任何会提前泄露藏品价值、知识内容、探索成果或奖励信息的数据，都必须在用户完成对应发现行为后才允许展示。

系统应优先保护探索过程本身，而不是提前展示结果。

探索的乐趣来源于发现，而不是剧透。

---

## Discovery Rule Core Logic

已发现

↓

允许展示完整内容

未发现

↓

禁止展示核心内容

---

## Discovery Rule Applies To

### Discovery Facts

允许：

- 已发现藏品显示知识点

禁止：

- 未发现藏品提前显示知识内容

### Encyclopedia

允许：

- 已发现藏品显示完整百科内容

禁止：

- 未发现藏品显示完整正文

### Artifact Story

允许：

- 已发现后阅读完整故事

禁止：

- 未发现提前阅读故事

### Collection Sets

允许：

- 显示套装存在
- 显示完成进度

禁止：

- 未发现藏品显示完整内容

### Future Knowledge System

以下未来系统均必须遵守 Discovery Rule：

- 知识图谱
- 知识问答
- 学习路线
- 文明档案
- 世界记忆系统

---

## Discovery Rule Not Allowed

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

## Discovery Rule Allowed

允许展示：

- ？？？
- 神秘藏品
- 未发现
- 继续探索解锁
- 当前进度
- 已完成数量
- 解锁条件

---

## Discovery Rule Example

正确：

```text
🐼 熊猫（已发现）

💡 你知道吗？

熊猫每天会吃大量竹子。
```

正确：

```text
❓ 神秘藏品

继续探索后解锁知识
```

错误：

```text
❓ 神秘藏品

💡 你知道吗？

熊猫每天会吃大量竹子。
```

原因：违反 Discovery Rule。

---

## First Introduced

v0.65A Discovery Facts Engine

## Related Milestone

MILESTONE-021

---

## MILESTONE-022

## Knowledge Categories

### Category Count

7

### Coverage

143 / 143

### Languages

- zh
- en
- es
- pt
- ja

### Discovery Rule Compatible

Yes

### Fallback Category

WORLD_CULTURE

### Status

Completed

---

## MILESTONE-040

## Learning Analytics Foundation

### Status

COMPLETED

### Version Range

v0.67A - v0.67E

### Scope

Learning Analytics first-stage foundation is complete.

### Completed Systems

- Learning Profile
- Learning Statistics
- Knowledge Mastery
- Learning Timeline
- Learning Dashboard

### Entry Points

- Magic Guild: Learning Profile
- Magic Guild: Learning Dashboard

### Analytics Sources

- museumCollectedIds
- Knowledge Collections
- Knowledge Quiz
- Explorer Academy
- Audio Coverage
- Current Learning State

### Architecture Decisions

- Analytics are derived from current learning state.
- Learning Timeline is generated from current learning state.
- No timeline localStorage was introduced.
- No analytics database was introduced.
- No backend analytics service was introduced.
- No historical event storage was introduced.

### Product Meaning

The app now has a first complete learning analytics layer:

```text
Discover

↓

Learn

↓

Measure

↓

Reflect

↓

Continue Exploring
```

### Compatible Principles

- Discovery Rule
- Learn By Discovery
- Current-state-derived analytics

### Release Impact

This milestone completes the first learning analytics foundation without adding storage complexity or backend dependency.

---

## MILESTONE-032

## Learning Timeline Architecture Decision

### Version

v0.67D Learning Timeline

### Decision

The first version of Learning Timeline uses derived learning state instead of persisted event history.

### Current Approach

```text
Current Learning State

↓

Derived Learning Timeline
```

### Data Sources

- museumCollectedIds
- Knowledge Collections
- Knowledge Quiz
- Explorer Academy

### Explicitly Not Added

- localStorage timeline events
- database timeline events
- historical event records
- event migration logic
- historical compatibility layer
- versioned timeline sync

### Reason

This matches the current project stage. The product needs a visible learning growth path, but it does not yet need a full event-sourcing or history-storage system.

Adding persistent events now would introduce early technical debt:

- event storage design
- event migration
- historical compatibility
- version upgrades
- data synchronization

### Development Rule

Until a real history requirement appears, Learning Timeline should continue to be generated from current learning state.

Do not add timeline persistence, timeline database tables, or timeline synchronization unless explicitly requested.

### Release Impact

Supports Learning Analytics without blocking release or increasing architecture risk.

### Status

Completed

---

## MILESTONE-031

## RC1 Review Completed

### Version

v0.66F RC Fixes

### Review Result

RC1 review completed.

### Closed Issues

- RC-001
- RC-002
- RC-003
- RC-004
- RC-005
- RC-006
- RC-008
- RC-010

### Remaining

- RC-009

### Remaining Status

Deferred

### Reason

Architecture Optimization

### Release Impact

Does not block release.

### Development Rule

Do not continue RC Fix work in the next phase unless explicitly requested.

### Status

Completed

---

### DESIGN PRINCIPLE-005

## Learn By Discovery

### Status

Active

### Priority

High

### Principle

先发现

↓

再学习

↓

再挑战

### Development Rule

禁止对未发现内容进行测验。

知识问答、学习路线、知识挑战和未来任何学习系统，都必须先检查对应藏品或知识点是否已经被用户发现。

### Applies To

- Knowledge Quiz
- Discovery Facts
- Encyclopedia
- Future Knowledge Challenges
- Future Learning Routes

### First Introduced

v0.65D Knowledge Quiz Engine

### Related Milestone

MILESTONE-024

---

## MILESTONE-023

## Knowledge Collections

### Books

7

### Book Categories

- Animals
- Technology
- Civilization
- Art
- Architecture
- Ocean
- World Culture

### Languages

- zh
- en
- es
- pt
- ja

### Discovery Rule Compatible

Yes

### Status

Completed

---

## MILESTONE-024

## Knowledge Quiz Engine

### Question Count

20

### Languages

- zh
- en
- es
- pt
- ja

### Discovery Rule Compatible

Yes

### Quiz Source

Discovered Artifacts Only

### Status

Completed

---

## MILESTONE-025

## Explorer Academy

### Academies

7

### Academy Categories

- Animals
- Technology
- Civilization
- Art
- Architecture
- Ocean
- World Culture

### Languages

- zh
- en
- es
- pt
- ja

### Discovery Rule Compatible

Yes

### Learn By Discovery Compatible

Yes

### Status

Completed

# v0.72 Learning Refactor Planning

## Purpose

根据 `docs/LEARNING_SYSTEM_REVIEW.md` 制定 Learning System 收敛方案。

本文件只做规划，不修改业务代码，不新增功能，不重构实现。

## Constraints

- 不修改 Gemini
- 不修改 backend
- 不修改 XP
- 不修改 Achievement
- 不修改 Daily Quest
- 不修改 Treasure Chest
- 不修改 Audio
- 不新增功能
- 不新增 localStorage
- 不重构代码
- 仅新增规划文档

## Source Review

主要依据：

- `docs/LEARNING_SYSTEM_REVIEW.md`
- 当前 Learning 相关组件和 helper 命名结构

Review 结论：

```text
Review Result: NEEDS_REFACTOR
High: 2
Medium: 9
Low: 3
Open: 14
Resolved: 0
```

核心问题不是功能错误，而是 Learning 信息架构开始膨胀：

- Dashboard 和 Profile 边界不清
- 多个模块重复展示相似统计
- 多个模块同时表达下一步行动
- Timeline / Weekly / Streak 等命名容易暗示真实历史能力
- 多个 helper 重复计算基础指标

## 1. 当前 Learning 模块结构

### 当前入口

当前 Magic Guild 中存在以下 Learning 相关入口：

```text
Magic Guild
├── Learning Dashboard
├── Learning Profile
├── Knowledge Collections
├── Knowledge Quiz
└── Explorer Academy
```

### 当前 Dashboard 结构

`LearningDashboardPanel` 当前汇总：

```text
Learning Dashboard
├── Summary Cards
│   ├── Artifacts Found
│   ├── Knowledge Points
│   ├── Knowledge Mastery
│   ├── Completed Books
│   ├── Challenge Completion
│   ├── Academy Level
│   ├── Audio Coverage
│   └── Timeline Events
├── Learning Coach
├── Learning Journey
├── Learning Motivation
├── Knowledge Mastery
├── Learning Statistics
└── Learning Timeline
```

### 当前 Profile 结构

`LearningProfilePanel` 当前展示：

```text
Learning Profile
├── Profile Summary Cards
│   ├── Total Discovered Artifacts
│   ├── Knowledge Points
│   ├── Completed Knowledge Books
│   ├── Unlocked Challenges
│   ├── Academy Level
│   └── Audio Coverage
├── Learning Statistics
├── Knowledge Mastery
└── Learning Timeline
```

### 当前数据计算层

当前 Learning helper 分散在多个文件：

```text
learningProfileHelpers.ts
learningStatisticsHelpers.ts
knowledgeMasteryHelpers.ts
learningTimelineHelpers.ts
learningMotivationHelpers.ts
journeyHelpers.ts
learningCoachHelpers.ts
learningDashboardHelpers.ts
knowledgeCollectionHelpers.ts
knowledgeQuizHelpers.ts
explorerAcademyHelpers.ts
```

## 2. 重复统计分析

### 重复指标

以下指标在多个模块中重复出现：

| Metric | Appears In | Issue |
| --- | --- | --- |
| 总发现藏品 | Profile, Dashboard, Statistics, Journey | 多处展示同一基础计数 |
| 知识点 / 已解锁知识 | Profile, Dashboard, Statistics, Mastery, Coach | 语义容易漂移 |
| 知识册完成度 | Profile, Dashboard, Statistics, Mastery, Academy | 计算来源重复 |
| 挑战解锁 / 挑战完成 | Profile, Dashboard, Statistics, Mastery, Coach | 当前没有真实答题历史，容易误称完成率 |
| 学院等级 | Profile, Dashboard, Academy, Journey | 多处表达成长身份 |
| 音频覆盖率 | Profile, Dashboard, Statistics, Coach | 音频更像基础设施状态，不一定属于 Learning 主指标 |
| Timeline events | Dashboard, Timeline | 当前是推导状态，不是真实历史 |

### 重复计算风险

当前多个 helper 会分别读取：

- `collection`
- `museumCollectedIds`
- `audioStats`
- `knowledgeCollections`
- `knowledgeQuizData`
- `museumArtifacts`

风险：

1. 同一指标在不同 helper 中计算方式逐渐不一致。
2. 后续修改一个统计口径时容易漏改其他模块。
3. Dashboard / Coach 为了整合视角重复调用多个 helper，维护成本上升。

### 推荐收敛

后续应建立统一的 Learning Analytics Snapshot：

```text
LearningAnalyticsSnapshot
├── profileSummary
├── coreStatistics
├── mastery
├── challenge
├── journey
├── motivation
└── audioReadiness
```

各 UI 模块只读取 snapshot，不重复计算核心指标。

## 3. 重复入口分析

### 当前重复入口

| Entry | Current Role | Issue |
| --- | --- | --- |
| Learning Dashboard | 总入口 | 已经包含 Profile / Statistics / Mastery / Journey / Coach 的能力 |
| Learning Profile | 档案入口 | 内部又嵌入 Statistics / Mastery / Timeline，接近小 Dashboard |
| Knowledge Collections | 学习内容入口 | 和 Explorer Academy 在分类维度上有重叠 |
| Explorer Academy | 学院入口 | 展示分类进度和挑战进度，和 Knowledge Collections / Quiz 有重叠 |
| Knowledge Quiz | 挑战入口 | 正确，但需要从 Learning Coach / Dashboard 统一引导 |

### 入口冲突

最大冲突：

```text
Learning Dashboard
vs
Learning Profile
```

原因：

Dashboard 已经承担总览职责，而 Profile 又嵌套多个完整分析模块。用户会不知道应该先看 Dashboard 还是 Profile。

### 推荐入口结构

建议收敛为：

```text
Magic Guild
└── Learning Dashboard
    ├── Learning Summary
    ├── Learning Journey
    └── Learning Coach
```

其它模块不消失，而是降级为 Dashboard 内部区块或详情入口。

## 4. 可合并模块

### 合并 1: Learning Profile -> Learning Summary / Profile

当前 `LearningProfilePanel` 不建议继续作为独立主入口。

建议：

```text
Learning Profile
↓
Learning Dashboard / Learning Summary / Profile
```

保留内容：

- 用户学习档案摘要
- 总发现
- 知识点
- 学院等级
- 代表性身份

移出内容：

- Learning Statistics
- Knowledge Mastery
- Learning Timeline

### 合并 2: Learning Statistics -> Learning Summary / Statistics

Statistics 应成为 Dashboard 的详细统计子区块，而不是多处嵌入。

建议保留：

- 发现率
- 知识解锁率
- 知识册完成率
- 挑战解锁率
- 音频覆盖率

文案调整：

```text
Challenge Completion
↓
Challenge Unlock Rate
```

直到真实答题历史出现前，不建议继续使用“完成率”。

### 合并 3: Knowledge Mastery -> Learning Summary / Mastery

Knowledge Mastery 应作为 Summary 的解释层，而不是独立重复区块。

建议：

- 保留掌握度概念
- 降低挑战指标权重
- 文案避免承诺“真实掌握”

推荐文案：

```text
当前学习掌握感
```

而不是：

```text
真实知识掌握度
```

### 合并 4: Learning Motivation -> Learning Journey / Motivation

Motivation 和 Journey 都表达下一目标。

建议：

- Journey 负责长期成长路线
- Motivation 负责短期行动建议
- Dashboard 上只出现一个主 CTA

### 合并 5: Learning Timeline -> Learning Journey / Timeline

Timeline 当前是由现有状态推导，不是真实历史。

建议改名：

```text
Learning Timeline
↓
Learning Trail
或
Current Learning Path
或
学习轨迹
```

如果未来引入真实事件存储，再恢复 Timeline / History 命名。

## 5. 建议保留模块

### Learning Dashboard

保留为唯一 Learning 总入口。

理由：

- 已经整合 Profile、Coach、Journey、Motivation、Mastery、Statistics、Timeline
- 适合作为 Magic Guild 里的学习中心
- 和 v0.72 收敛目标一致

### Learning Coach

保留，但定位为推荐行动层。

职责：

- 给出下一步建议
- 显示强项和弱项
- 引导去知识册 / Quiz / 继续发现

不做：

- 不接 AI
- 不接 backend
- 不做复杂个性化

### Knowledge Collections

保留为内容组织层。

职责：

- 按知识分类展示学习册
- 承接 Discovery Rule
- 作为 Quiz 的上游内容来源

### Knowledge Quiz

保留为挑战层。

职责：

- 只对已发现内容出题
- 继续遵守 Learn By Discovery

### Explorer Academy

保留，但建议降级为 Dashboard 内部或二级入口。

职责：

- 分类学习体系
- 学院化展示
- 连接知识册和挑战进度

## 6. 建议暂缓模块

### 独立 Learning Profile 主入口

建议暂缓继续强化。

原因：

- 和 Dashboard 重复
- 内部嵌套过重
- 容易形成两个学习总入口

建议：

v0.72A 中先从 Magic Guild 主按钮中降级，作为 Dashboard 内的 Profile 区块。

### 真实 Learning Timeline

建议暂缓。

原因：

- 当前没有真实历史事件存储
- 引入真实 Timeline 需要新增数据结构和迁移策略

当前可保留“学习轨迹”。

### 真实 Weekly Progress

建议暂缓。

原因：

- 当前没有按周记录
- Weekly 文案会暗示真实日历周行为

当前可改为：

```text
Growth Progress
本阶段进度
```

### 真实 Learning Streak

建议暂缓进入 Learning System。

原因：

- 项目已有 Daily Discovery Streak
- Learning Motivation 中的 Streak 如果没有真实学习行为存储，容易重复和误解

当前可改为：

```text
Learning Momentum
学习连续感
```

## 7. Refactor Priority

### High

#### High-001 建立 Learning Dashboard 单一主入口

目标：

Magic Guild 中 Learning 主入口只保留 Dashboard。

处理：

- Learning Profile 从主入口降级
- Profile 成为 Dashboard 的 Summary 子区块
- 避免用户看到两个学习总入口

对应 review：

- LS-002
- LS-013

#### High-002 建立 Learning Analytics Snapshot

目标：

统一计算 Learning 基础指标。

处理：

- 新建或规划 `learningAnalyticsSnapshotHelpers.ts`
- 由 Dashboard / Coach / Journey / Motivation / Mastery / Statistics 读取同一份 snapshot
- 避免重复计算和语义漂移

对应 review：

- LS-011
- LS-012

### Medium

#### Medium-001 重命名时间语义模块

目标：

避免用户误以为系统已有真实历史数据。

处理：

- Timeline -> Learning Trail / 学习轨迹
- Weekly Progress -> Growth Progress / 本阶段进度
- Learning Streak -> Learning Momentum / 学习连续感

对应 review：

- LS-006
- LS-007
- LS-008
- LS-014

#### Medium-002 区分 Knowledge 与 Challenge 指标

目标：

避免知识解锁率和挑战完成率重复。

处理：

- Challenge Completion -> Challenge Unlock Rate
- 真实答题记录出现前，不使用“完成率”暗示

对应 review：

- LS-004
- LS-005

#### Medium-003 收敛下一步行动

目标：

Dashboard 只突出一个下一步行动。

处理：

- Journey 保留长期目标
- Motivation 保留短期行动
- Coach 输出最终推荐 CTA

对应 review：

- LS-003
- LS-009

### Low

#### Low-001 Learning Coach 推荐深度

目标：

后续增加更细的推荐权重。

暂缓原因：

- 当前不接 AI
- 当前不接 backend
- 当前没有真实历史行为

对应 review：

- LS-010

#### Low-002 UI 展开/折叠体验

目标：

Dashboard 信息密度降低后，再考虑折叠详细分析模块。

暂缓原因：

- 先完成信息架构收敛，再优化交互细节

## 8. Refactor Roadmap

## Phase 1: 信息架构收敛

目标：

先解决入口和层级问题，不动底层业务数据。

建议任务：

1. Magic Guild 中 Learning 主入口只保留 Learning Dashboard。
2. Learning Profile 降级为 Dashboard 内部 Summary / Profile 区块。
3. Dashboard 结构调整为三大区：

```text
Learning Dashboard
├── Learning Summary
│   ├── Profile
│   ├── Statistics
│   └── Mastery
├── Learning Journey
│   ├── Timeline / Trail
│   ├── Motivation
│   └── Journey
└── Learning Coach
```

4. Dashboard 顶部只显示一个推荐行动。
5. 不删除现有 helper，只调整 UI 层组合关系。

验收标准：

- Magic Guild 中不会同时出现 Learning Dashboard 和 Learning Profile 两个主入口。
- Dashboard 信息结构更清楚。
- 功能表现不变。
- 不新增 storage。

## Phase 2: 数据计算收敛

目标：

降低重复统计和重复计算。

建议任务：

1. 新建 `learningAnalyticsSnapshotHelpers.ts`。
2. 统一输出基础指标：

```text
discovery
knowledge
collections
challenge
academy
mastery
audio
journey
```

3. Dashboard / Profile / Statistics / Mastery / Coach / Journey / Motivation 读取同一份 snapshot。
4. 重命名 Challenge Completion 为 Challenge Unlock Rate。
5. 降低或标注 Mastery 中挑战指标权重。

验收标准：

- 同一指标只有一个基础计算来源。
- Coach 不再为了整合而调用未使用的 helper 返回值。
- Dashboard 和 Profile 数字口径一致。

## Phase 3: 命名和未来扩展保护

目标：

避免当前状态推导模块被误认为真实历史系统。

建议任务：

1. Timeline 文案改为 Learning Trail / 学习轨迹。
2. Weekly Progress 文案改为 Growth Progress / 本阶段进度。
3. Learning Streak 文案改为 Learning Momentum / 学习连续感。
4. 文档中明确：

```text
当前 Learning System 基于当前状态推导。
真实历史能力需要未来单独设计 storage 和 migration。
```

5. 为未来真实历史系统预留：

```text
Learning History
Weekly Report
Real Learning Streak
Review Records
```

验收标准：

- UI 文案不暗示不存在的真实历史能力。
- 后续是否引入真实学习历史成为独立产品决策。
- 不影响当前学习展示。

## Proposed Target Information Architecture

建议目标结构：

```text
Learning Dashboard
├── Learning Summary
│   ├── Profile
│   ├── Statistics
│   └── Mastery
├── Learning Journey
│   ├── Timeline
│   ├── Motivation
│   └── Journey
└── Learning Coach
```

解释：

- Learning Summary 回答：“我现在学到哪里了？”
- Learning Journey 回答：“我一路走到了哪里？”
- Learning Coach 回答：“我下一步应该做什么？”

## Recommended v0.72A Scope

建议进入 v0.72A Refactor。

推荐只做 Phase 1：

- 收敛入口
- 调整 Dashboard 信息结构
- 降级 Profile
- 不改数据计算
- 不改 storage
- 不改奖励系统
- 不改识别流程

原因：

Phase 1 风险最低，能立刻解决最明显的信息架构问题。Phase 2 再处理 analytics snapshot，避免一次重构过大。

## Non-Goals

v0.72 不建议做：

- 新增真实学习历史
- 新增后端学习记录
- 新增 localStorage
- 新增 AI Coach
- 新增奖励
- 新增 Quiz 持久化
- 重写 XP / Achievement / Daily Quest
- 重写 Audio

## Final Recommendation

Learning System 应从“多个并列模块”收敛为“一个 Dashboard，三个清晰区块”。

推荐顺序：

```text
先收入口
↓
再收统计
↓
最后改命名和未来扩展边界
```

v0.72A 建议进入 Refactor，但只做 Phase 1，不做大规模底层重构。

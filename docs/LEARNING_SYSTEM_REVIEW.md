# v0.71 Learning System Review

Review Date:
2026-06-09

Scope:

- Learning Profile
- Learning Statistics
- Knowledge Mastery
- Learning Timeline
- Learning Motivation
- Learning Journey
- Learning Coach

Constraints:

- Review only
- No business code changes
- No backend changes
- No new storage
- No feature implementation

---

## LS-001

模块：
Learning Profile

问题：
与 Learning Statistics 数据重复。Learning Profile 展示总发现、知识点、完成知识册、挑战、学院等级、音频覆盖率；Learning Statistics 又以百分比和进度条方式展示发现率、知识完成率、知识册完成率、挑战完成率、音频覆盖率。

严重度：
Medium

建议：
后续将 Learning Profile 定位为“用户档案摘要”，将详细百分比和进度条收敛到 Learning Statistics，避免同一指标在两个模块重复解释。

状态：
OPEN

---

## LS-002

模块：
Learning Profile

问题：
Learning Profile 内部继续嵌入 Learning Statistics、Knowledge Mastery、Learning Timeline，导致它本身已经接近一个小 Dashboard；同时 Learning Dashboard 又再次展示这些模块。

严重度：
High

建议：
后续明确层级：Learning Dashboard 作为总入口；Learning Profile 只保留个人档案摘要，不再嵌套完整分析模块。

状态：
OPEN

---

## LS-003

模块：
Learning Dashboard

问题：
Dashboard 当前顺序为 Summary、Learning Coach、Learning Journey、Learning Motivation、Knowledge Mastery、Learning Statistics、Learning Timeline。信息量较大，容易形成长页面堆叠，新用户可能难以判断核心行动。

严重度：
Medium

建议：
后续将 Dashboard 分成三个区块：核心摘要、推荐行动、详细分析。默认只展开最重要的推荐行动，其余模块作为次级区域。

状态：
OPEN

---

## LS-004

模块：
Learning Statistics

问题：
知识完成率与挑战完成率当前都基于 unlocked quiz questions / total quiz questions，两个指标在第一版中高度相似，容易让用户觉得重复。

严重度：
Medium

建议：
后续区分两者语义：知识完成率用于已解锁知识点，挑战完成率用于真实挑战答题或完成状态。若暂时没有答题历史，应将挑战完成率文案改为“挑战解锁率”。

状态：
OPEN

---

## LS-005

模块：
Knowledge Mastery

问题：
掌握度计算同时使用知识点解锁率、知识册完成率、挑战完成率、学院进度。但其中挑战完成率和知识点解锁率在当前版本接近同源，可能放大同一类数据的权重。

严重度：
Medium

建议：
后续引入权重系统，或等真实挑战完成数据出现后再将挑战权重提高。当前阶段可以保留，但需要在产品文案中避免承诺“真实掌握”。

状态：
OPEN

---

## LS-006

模块：
Learning Timeline

问题：
Timeline 使用当前状态推导最近事件，这是正确架构选择，但它并不是真实历史时间轴。若用户看到“最近”二字，可能误以为系统记录了真实学习历史。

严重度：
Low

建议：
后续文案可改为“当前学习轨迹”或“学习轨迹”，除非引入真实历史事件存储，否则避免强调真实时间顺序。

状态：
OPEN

---

## LS-007

模块：
Learning Motivation

问题：
Learning Streak 第一版仅根据当前数据推导，不使用 localStorage。这个实现符合当前阶段，但“Streak”通常暗示真实连续天数，可能和用户预期不一致。

严重度：
Medium

建议：
后续将文案从“Learning Streak”调整为“Learning Momentum”或“学习连续感”。等明确需要真实连续天数时，再单独设计存储和迁移方案。

状态：
OPEN

---

## LS-008

模块：
Learning Motivation

问题：
Weekly Progress 基于当前统计平均值推导，并非真实本周行为数据。它能提供动机反馈，但不应被理解为日历周进度。

严重度：
Medium

建议：
后续将“Weekly Progress”改为“Growth Progress”或“本阶段进度”。如果未来需要真实周进度，再引入独立历史数据设计。

状态：
OPEN

---

## LS-009

模块：
Learning Journey

问题：
Learning Journey 与 Learning Motivation 都在表达下一目标和成长阶段，存在动机表达重复：Journey 有 Next Milestone Preview，Motivation 有 Learning Goals 和 Next Recommended Action。

严重度：
Medium

建议：
后续保留 Journey 作为长期成长地图，保留 Motivation 作为短期行动建议。Dashboard 上只突出一个“下一步行动”，避免同时出现多个 competing CTA。

状态：
OPEN

---

## LS-010

模块：
Learning Coach

问题：
推荐逻辑较简单，主要基于百分比高低和已解锁挑战数量。当前足够支持第一版，但个性化深度有限。

严重度：
Low

建议：
后续引入权重系统，例如最近行为、薄弱类别、家长偏好、孩子年龄、知识册优先级。当前阶段不建议接入 AI 或后端推荐。

状态：
OPEN

---

## LS-011

模块：
Learning Coach

问题：
Learning Coach helper 调用了 Learning Profile、Statistics、Mastery、Timeline、Motivation、Journey，其中部分调用只为满足来源整合，并未直接使用返回值。这会增加维护成本和重复计算。

严重度：
Medium

建议：
后续建立统一的 Learning Analytics Snapshot，一次性计算所有基础指标，再由 Dashboard、Coach、Journey、Motivation 读取同一份 snapshot。

状态：
OPEN

---

## LS-012

模块：
全局 Learning System

问题：
多个模块都重复计算相似指标，例如发现率、知识点、知识册进度、挑战解锁、学院等级、掌握度。随着模块增加，重复计算和语义漂移风险上升。

严重度：
High

建议：
后续建立 `learningAnalyticsSnapshotHelpers.ts` 或同等聚合层，将基础统计集中计算。各模块只负责展示和轻量派生，不各自重新计算核心数据。

状态：
OPEN

---

## LS-013

模块：
全局 Learning System

问题：
入口数量开始增加：Learning Profile 与 Learning Dashboard 同时存在于 Magic Guild。由于 Dashboard 已经整合 Profile、Statistics、Mastery、Timeline、Motivation、Journey、Coach，Profile 入口价值下降。

严重度：
Medium

建议：
后续考虑将 Magic Guild 主入口保留为 Learning Dashboard；Learning Profile 作为 Dashboard 内部一个区块或二级详情页。

状态：
OPEN

---

## LS-014

模块：
全局 Learning System

问题：
当前系统全部基于当前状态推导，这是正确阶段选择。但部分命名使用 Timeline、Weekly、Streak 等真实历史语义词，可能让未来产品决策误以为已有历史能力。

严重度：
Medium

建议：
后续统一命名原则：当前状态推导模块使用 Journey、Momentum、Current Progress；真实历史模块才使用 Timeline、Weekly、Streak、History。

状态：
OPEN

---

## Summary

High:
2

Medium:
9

Low:
3

Open:
14

Resolved:
0

## Review Result

NEEDS_REFACTOR

## Review Notes

Learning System 当前方向正确，尤其是坚持不引入 backend、database、localStorage 和奖励系统，避免了过早架构复杂化。

主要问题不是功能错误，而是信息架构开始膨胀：多个模块展示相似指标，Dashboard 和 Profile 入口边界不够清晰，部分“时间/连续/周进度”命名容易暗示真实历史数据。

建议下一阶段优先做信息收敛，而不是继续新增 Learning 模块。

# v0.66B Learning Flow Review

AI魔法识字相机学习链路审查。

## Review Purpose

本文件用于审查当前学习系统是否符合项目核心原则：

- Discovery Rule
- Learn By Discovery
- Content Before Gamification

本次只做审查记录，不修改代码。

## Core Learning Flow

```text
识别
↓
发现藏品
↓
收藏 / 图鉴
↓
藏品故事 / 发现知识卡 / 百科
↓
知识分类
↓
主题知识册
↓
知识挑战
↓
探索学院
```

## Design Principles Checked

### DESIGN PRINCIPLE-004 Discovery Rule

核心规则：

```text
已发现
↓
允许展示完整内容

未发现
↓
禁止展示核心内容
```

### DESIGN PRINCIPLE-005 Learn By Discovery

核心学习顺序：

```text
先发现
↓
再学习
↓
再挑战
```

## Module Review

### Discovery Facts

Status: Compatible

发现知识卡基于已发现藏品展示简短知识点。未发现藏品不应展示完整知识内容。

审查结论：

- 符合 Discovery Rule
- 符合 Learn By Discovery
- 不调用 AI
- 不新增奖励

### Discovery Encyclopedia

Status: Compatible

百科系统允许浏览条目状态，但未发现内容必须保持锁定。

允许展示：

- 神秘藏品
- 未发现
- 继续探索解锁
- 完成度

禁止展示：

- 完整百科正文
- 完整故事
- 完整知识点

审查结论：

- 当前设计方向正确
- 后续新增百科模块时必须继续走发现状态过滤

### Knowledge Categories

Status: Compatible

知识分类允许对未发现藏品显示分类，因为分类属于导航和统计信息，不属于核心知识内容。

允许展示：

- 动物学
- 科技
- 文明
- 艺术
- 建筑
- 海洋
- 世界文化

审查结论：

- 分类展示不构成剧透
- 可作为学习导航基础设施

### Knowledge Collections

Status: Compatible

主题知识册用于显示分类学习进度。

允许展示：

- 知识册名称
- 已发现数量
- 总数量
- 完成百分比

禁止展示：

- 未发现藏品完整知识点
- 未发现藏品故事
- 未发现百科正文

审查结论：

- 符合 Discovery Rule
- 适合作为学习系统中层入口

### Knowledge Quiz

Status: Compatible

知识问答系统必须只从已发现藏品生成题目。

审查结论：

- 未发现藏品不能出题
- 未发现藏品不能显示答案
- 未发现藏品不能参与挑战
- 当前方向符合 Learn By Discovery

### Explorer Academy

Status: Compatible

探索学院是知识系统的统一入口，展示统计和进度，不提前泄露未发现知识。

允许展示：

- 学院名称
- 分类进度
- 已发现藏品数量
- 已解锁题目数量
- 完成百分比

禁止展示：

- 未发现知识内容
- 未发现故事
- 未发现百科正文

审查结论：

- 适合作为知识系统总部
- 与 MagicGuildPanel 的长期成长定位一致

## Learning Flow Risks

### LFR-001 Quiz Preview 泄露风险

如果后续知识挑战增加题目列表、题目预览或答案复盘，必须确保只展示已发现藏品相关题目。

Recommendation:

所有 quiz 数据入口都应经过 `getDiscoveredQuizQuestions()` 或同等级别过滤。

### LFR-002 Collection Sets 缺失藏品泄露风险

收藏套装可以展示套装存在和完成进度，但缺失藏品不应显示完整内容。

Recommendation:

缺失藏品继续显示为：

- 神秘藏品
- 继续探索解锁
- 缺失数量

### LFR-003 Encyclopedia 深层详情泄露风险

百科详情页未来如果加入相关知识、关联套装、关联国家，仍要区分“统计可见”和“内容可见”。

Recommendation:

新增百科内容模块时先检查 Discovery Rule。

### LFR-004 多语言内容泄露风险

多语言内容层不能绕过发现规则。即使某语言内容存在，未发现状态也不能展示完整知识。

Recommendation:

所有本地化内容展示都应以 discovered 状态为前置条件。

## Recommended Guardrails

1. 所有知识内容入口使用 `discovered` 或 `museumCollectedIds` 判断。
2. 所有问答入口只使用已发现藏品。
3. 未发现藏品只显示统计和解锁提示。
4. 新增学习功能前先确认是否会提前泄露知识。
5. 后续补充 Discovery Rule 自动化测试。

## Review Result

当前学习链路符合：

- Discovery Rule
- Learn By Discovery
- Content Before Gamification

学习体系已经从“识别工具”升级为：

```text
发现
↓
理解
↓
分类
↓
复习
↓
挑战
```

Status: Passed.

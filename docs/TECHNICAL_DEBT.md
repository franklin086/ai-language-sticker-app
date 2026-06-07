# AI魔法识字相机 技术债务与 BUG 清单

当前版本：`v0.63-product-polish`

## 技术债务

### TD-001 远征关联逻辑优化

世界远征目前以动态进度展示为主，后续需要增强与主线剧情、世界记忆、收藏套装之间的联动。

### TD-002 传奇发现视觉升级

传奇发现已有基础视觉反馈，但分享卡、结果卡、庆典弹窗之间的传奇视觉还需要统一。

### TD-003 世界博物馆内容继续扩展

世界文明、艺术、自然、科技内容仍需继续补充，尤其是新增国家下的博物馆藏品。

### TD-004 国家地图可视化

国家地图目前是卡片式地图，后续可升级为更直观的国家探索视觉。

### TD-005 公会导航联动

公会总部已经聚合多个系统，但不同系统之间的返回路径和快捷入口仍需进一步统一。

### TD-006 识别结果与知识库映射

Gemini 返回结果和 museumArtifacts 的匹配仍依赖 aliases，需要持续补充同义词和通用映射。

### TD-007 全局计数审计

收藏总数、百科总数、博物馆总数、世界地图总数需要保持动态计算，并定期校验一致性。

### TD-008 真实国家地图系统

当前不使用地图 SDK。未来如需要真实地图，需要重新设计数据结构、性能和隐私边界。

### TD-009 Follow-up Recognition闭环

追问识别已有第一版，但二次识别后的展示、收藏与说明仍可进一步打磨。

### TD-010 NPC动态对话

NPC 目前主要按进度展示固定话术，未来可根据识别结果、任务状态和连续探索动态变化。

### TD-011 公会总部强化

公会总部需要继续优化信息层级，使馆长等级、远征、护照、地图、收藏册之间更容易理解。

### TD-012 第二代分享卡

分享卡已支持 PNG 导出，v0.63 开始升级视觉，但后续仍需进一步统一品牌感和截图效果。

### TD-013 世界内容深度扩展

世界文明内容需要从“条目”扩展为“主题知识网络”，避免只是简单清单。

### TD-014 世界记忆碎片与主线剧情联动

世界记忆碎片和主线剧情当前是并行展示，后续应形成更清晰的章节推进关系。

### TD-015 联盟自动归类机制

魔法博物馆联盟目前依赖配置，未来可基于 museum、category、aliases 自动归类。

### TD-016 收藏册性能优化

当前收藏册直接渲染藏品列表。超过 500 藏品后，应引入 `FlatList` / `VirtualizedList`。

### TD-017 套装自动生成器

收藏套装目前手工配置。未来可根据主题、博物馆、稀有度自动生成推荐套装。

### TD-018 百科性能优化

当前百科直接渲染藏品列表。超过 500 藏品后，应引入 `FlatList` / `VirtualizedList`。

### TD-019 多语言内容覆盖率提升至100%

当前多语言内容层只覆盖第一批高频藏品，后续需要覆盖全部 museumArtifacts。

## BUG 清单

### BUG-012 百科条目数与 museumArtifacts 数量一致性校验

百科条目数必须来自 `museumArtifacts.length`。如果生成条目数与内容库数量不一致，开发环境应输出警告。

### BUG-013 国家地图返回入口统一

国家地图、博物馆探索页、世界地图之间需要保持顶部和底部返回入口一致。

### BUG-014 收藏册500+藏品性能优化

当藏品数量超过 500 时，收藏册直接渲染全部藏品可能影响性能，应改为虚拟列表。

### BUG-015 联盟扩展同步机制优化

新增博物馆或国家后，联盟配置可能未同步，需要自动忽略不存在博物馆并提示后续补全。

## v0.63 性能检查结论

- 收藏册当前仍直接渲染当前筛选后的藏品列表。
- 百科当前仍直接渲染当前筛选后的藏品列表。
- 当前藏品数量尚可接受。
- 超过 500 藏品后，引入 `FlatList` / `VirtualizedList`，避免一次性渲染过多卡片。

---

## Audio Foundation Phase

以下基础设施阶段已经完成，后续新增功能应优先复用现有架构，避免重复建设。

### Version Range

v0.64A ~ v0.64E

### Status

Completed ✅

### Included Milestones

#### v0.64A Audio Architecture

- 语音架构层
- AudioButton
- playArtifactAudio()

#### v0.64B Local Audio Assets

- audioManifest
- 本地音频资源目录
- Local Audio 管理体系

#### v0.64C Smart Audio Strategy

- LOCAL_AUDIO
- TTS_AUDIO
- HUMAN_AUDIO
- NONE
- 统一策略决策层

#### v0.64D First Audio Pack

- 本地音频路径体系
- 浏览器播放链路
- Fallback 容错逻辑

#### v0.64E Audio Coverage Analysis

- 发音覆盖率统计
- AudioCoverageCard
- 覆盖等级评估
- MagicGuildPanel 集成

### Current Statistics

Total Artifacts: 143

Local Audio: 10

Future TTS: 133

Human Audio: 0

Coverage: 100%

Level: Excellent

### Future Expansion Direction

后续版本仅允许扩展：

- Local Audio 内容库
- Human Audio 内容库
- TTS Provider 接入
- 发音质量评估
- 发音学习功能

原则上不再重构 Audio Foundation 架构。

---

Foundation Owner

AI Magic Camera Project

Milestone: MILESTONE-020

---

## v0.66D Product Polish Round 2

### Status

Completed

### Fixed Areas

#### Navigation Polish

- Added a lightweight guild navigation registry.
- Centralized the main MagicGuildPanel secondary entries:
  - Collection Book
  - Collection Sets
  - Knowledge Collections
  - Explorer Academy
- Standardized the guild back entry and reduced hard-coded navigation buttons.

#### Learning Flow Polish

- Added Discovery Rule helper functions.
- Made encyclopedia locked-content gating explicit.
- Made quiz availability continue to depend on discovered artifacts only.
- Added a locked learning content message for undiscovered encyclopedia entries.

#### Technical Debt Polish

- Confirmed Audio Foundation remains a completed foundation phase.
- Confirmed future audio work should extend the existing audio architecture instead of rebuilding it.
- Added follow-up candidates for navigation registry, Discovery Rule tests, knowledge coverage audit, quiz persistence decision, and encoding cleanup.

### New Follow-up Candidates

#### TD-020 Knowledge System Navigation Registry

The first registry now covers MagicGuildPanel. Future work can extend it to WorldMapPanel, NationalMapPanel, PassportPanel, and other second-level panels.

#### TD-021 Discovery Rule Automated Tests

Add automated tests to verify locked artifacts never reveal facts, stories, encyclopedia details, or quiz content.

#### TD-022 Knowledge Content Coverage Audit

Track coverage for facts, quiz questions, translations, and audio across `museumArtifacts`.

#### TD-023 Quiz Progress Persistence Decision

Knowledge Quiz currently keeps answer progress in session state only. Decide later whether quiz history should be saved.

#### TD-024 Encoding And Documentation Display Cleanup

Audit PowerShell and Markdown display encoding for Chinese text, especially older project documents.

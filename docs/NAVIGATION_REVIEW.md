# v0.66A Navigation Review

AI魔法识字相机导航体验审查。

## Review Purpose

本文件用于审查当前产品的页面入口、返回路径和主要功能层级，确认 v0.66 之前建立的世界探索、学习系统、公会总部、收藏系统之间是否仍然清晰。

本次只做审查记录，不修改代码。

## Scope

- 首页识别主流程
- MagicGuildPanel 公会总部
- MuseumCollectionsBookPanel 收藏册
- DiscoveryEncyclopediaPanel 发现百科
- CollectionSetPanel 收藏套装
- KnowledgeCollectionsPanel 主题知识册
- KnowledgeQuizPanel 知识挑战
- ExplorerAcademyPanel 探索学院
- WorldMapPanel 世界地图
- NationalMapPanel 国家地图
- MuseumExplorerPanel 博物馆探索页
- PassportPanel 魔法护照
- StorylinePanel 主线剧情
- WorldExpeditionPanel 世界远征
- SeasonalEventPanel 季节活动
- WorldMemoryFragmentPanel 世界记忆碎片
- MagicMuseumLeaguePanel 魔法博物馆联盟

## Current Navigation Structure

```text
首页
↓
识别结果 / 收藏 / 发音 / 分享

首页
↓
魔法探索者公会
├─ 魔法收藏册
│  └─ 魔法发现百科
├─ 魔法收藏套装
├─ 主题知识册
│  └─ 知识挑战
└─ 探索学院

首页
↓
世界魔法地图
└─ 国家魔法地图
   └─ 博物馆探索页

首页
↓
魔法探索护照

首页
↓
世界记忆之书

首页
↓
世界远征中心

首页
↓
世界季节活动

首页
↓
世界记忆碎片

首页
↓
魔法博物馆联盟
```

## Findings

### NAV-001 MagicGuildPanel 已成为合理的成长总部

公会总部现在集中承载：

- 馆长成长
- 收藏册
- 收藏套装
- 主题知识册
- 知识挑战
- 探索学院

这符合当前设计方向：把长期成长和学习入口集中到一个孩子容易理解的“总部”。

### NAV-002 WorldMapPanel 承担世界探索主链路

世界地图当前承担：

```text
世界
↓
国家
↓
城市
↓
博物馆
```

这个层级清楚，也和项目核心成长结构一致。随着国家和博物馆继续扩展，后续需要避免把太多 UI 状态继续堆在单个世界地图组件里。

### NAV-003 二级和三级页面返回入口基本完整

目前主要二级页面已经有返回入口，例如：

- 返回公会总部
- 返回世界地图
- 返回国家地图
- 关闭详情页

这对新手用户和儿童用户都很重要。后续新增页面应继续坚持“顶部可返回，底部可保留辅助返回”的规则。

### NAV-004 页面数量快速增长，后续需要导航注册表

当前项目主要通过组件内部状态切换页面。这个方式在现阶段仍然可控，但页面数量已经明显增加。

建议后续引入轻量导航注册表，例如：

```text
navigationMap.ts
```

用于集中记录：

- 页面名称
- 所属模块
- 返回目标
- 入口位置

第一阶段不需要引入复杂路由系统。

### NAV-005 公会总部和世界地图职责边界清晰

当前建议继续保持：

- 公会总部：学习、收藏、成长、知识系统
- 世界地图：国家、城市、博物馆探索
- 首页：识别入口和即时反馈

不要把所有系统都塞进首页，避免儿童用户迷路。

## Navigation Quality Checklist

| Item | Status | Notes |
| --- | --- | --- |
| 首页识别入口清晰 | Good | 主流程仍然明确 |
| 公会总部入口清晰 | Good | 适合作为成长总部 |
| 收藏册可返回 | Good | 已具备返回公会总部入口 |
| 百科可返回 | Good | 嵌套在收藏册内 |
| 知识挑战可返回 | Good | 嵌套在主题知识册内 |
| 国家地图可返回世界地图 | Good | 顶部返回体验已改善 |
| 博物馆探索页可返回国家地图 | Good | 符合三级页面要求 |
| 护照/远征/联盟等模块入口 | Acceptable | 后续可统一收到公会导航中 |
| 全局导航注册 | Missing | 可作为后续技术债 |

## Recommendations

1. 保持 MagicGuildPanel 作为学习与成长中心。
2. 保持 WorldMapPanel 作为世界探索中心。
3. 新增页面时必须有顶部返回入口。
4. 后续新增 `navigationMap.ts`，统一记录页面入口和返回关系。
5. 暂时不要引入复杂路由或地图 SDK。
6. 后续可以把护照、远征、联盟、世界记忆碎片进一步收束到公会总部中。

## Review Result

当前导航结构整体健康。

最需要关注的不是“功能缺失”，而是“页面继续增加后的可维护性”。建议后续优先补充轻量导航注册表和返回入口规范。

Status: Passed with follow-up recommendations.

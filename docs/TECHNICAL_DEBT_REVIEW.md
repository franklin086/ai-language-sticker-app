# v0.66C Technical Debt Review

AI魔法识字相机技术债务审查。

## Review Purpose

本文件用于核对 `docs/TECHNICAL_DEBT.md` 当前记录是否仍然适用于 v0.66 前后的项目状态，并给出后续处理建议。

本次只输出 review，不直接修改技术债务主清单。

## Source Reviewed

- `docs/TECHNICAL_DEBT.md`

## Current Technical Debt Summary

当前主清单包含：

- TD-001 到 TD-019
- BUG-012 到 BUG-015
- Audio Foundation Phase 完成说明

整体结论：

技术债务清单仍然有效。随着 v0.64 Audio Foundation 和 v0.65 Knowledge System 完成，建议后续新增 TD-020 以后条目，用于追踪学习系统、发现规则测试和导航注册表。

## Existing TD Review

| ID | Status | Review |
| --- | --- | --- |
| TD-001 | Open | 世界远征和主线/记忆碎片仍可进一步联动 |
| TD-002 | Open | 传奇发现视觉仍可继续升级，但不是阻塞项 |
| TD-003 | Open | 世界博物馆内容仍需持续扩展 |
| TD-004 | Open | 国家地图仍是卡片式，未来可继续视觉化 |
| TD-005 | Partially Improved | 公会总部已增强，但导航注册表仍未建立 |
| TD-006 | Open | 识别结果与知识库映射仍需长期维护 |
| TD-007 | Open | 全局计数审计应覆盖音频、百科、知识分类、问答、学院 |
| TD-008 | Future | 真实国家地图系统仍属于长期方向 |
| TD-009 | Open | Follow-up Recognition 闭环仍可增强 |
| TD-010 | Open | NPC 动态对话仍未接入真实上下文生成 |
| TD-011 | Partially Improved | 公会总部已经承担更多入口，但仍可继续统一导航 |
| TD-012 | Partially Improved | 分享卡已升级基础体验，仍可继续做第二代视觉和模板 |
| TD-013 | Open | 世界内容深度扩展仍是长期工作 |
| TD-014 | Open | 世界记忆碎片和主线剧情仍可进一步联动 |
| TD-015 | Open | 联盟自动归类机制仍有价值 |
| TD-016 | Open | 收藏册 500+ 藏品性能优化仍未正式处理 |
| TD-017 | Open | 套装自动生成器仍未建设 |
| TD-018 | Open | 百科 1000+ 条目性能优化仍未正式处理 |
| TD-019 | Open | 多语言内容覆盖率仍未达到 100% |

## Existing BUG Review

| ID | Status | Review |
| --- | --- | --- |
| BUG-012 | Still Relevant | 百科条目总数应持续和 `museumArtifacts.length` 保持一致 |
| BUG-013 | Partially Improved | 国家地图返回入口已改善，但全局返回规范仍需持续检查 |
| BUG-014 | Still Relevant | 收藏册未来超过 500 藏品后需要 FlatList / VirtualizedList |
| BUG-015 | Still Relevant | 联盟扩展后同步机制仍需更稳健 |

## Audio Foundation Review

Audio Foundation Phase 已完成：

- v0.64A Audio Architecture
- v0.64B Local Audio Assets
- v0.64C Smart Audio Strategy
- v0.64D First Audio Pack
- v0.64E Audio Coverage Analysis

Review result:

音频基础设施已经形成稳定分层，后续应优先复用：

- AudioButton
- playArtifactAudio()
- audioManifest
- AudioSourceType
- getBestAudioSource()
- AudioCoverageCard

不建议重新设计音频基础架构。

## Suggested New Technical Debt Items

以下条目建议后续追加到 `docs/TECHNICAL_DEBT.md`。

### TD-020 Knowledge System Navigation Registry

知识系统入口已经包括：

- 主题知识册
- 知识挑战
- 探索学院
- 发现百科
- 收藏册

建议建立轻量导航注册表，集中记录页面入口、返回目标和所属模块。

### TD-021 Discovery Rule Automated Tests

当前 Discovery Rule 主要依赖人工约束。

建议后续增加测试，覆盖：

- 未发现藏品不显示 fact
- 未发现藏品不显示 story
- 未发现藏品不显示百科正文
- 未发现藏品不进入 quiz

### TD-022 Knowledge Content Coverage Audit

当前知识卡和知识问答第一阶段覆盖约 20 个高频藏品。

建议后续建立覆盖率审计：

- Facts coverage
- Quiz coverage
- Translation coverage
- Audio coverage

### TD-023 Quiz Progress Persistence Decision

当前知识挑战是轻量单题模式，不新增 localStorage。

后续如果需要正确率、已完成题目、复习记录，需要先决定是否持久化。

### TD-024 Encoding And Documentation Display Cleanup

项目历史中曾出现 PowerShell 中文脚本编码问题。

建议后续统一检查：

- PowerShell 脚本 UTF-8 with BOM
- Markdown 中文显示
- 终端输出乱码
- 文档标题和 milestone 顺序

## Priority Recommendation

### High Priority

1. TD-021 Discovery Rule Automated Tests
2. TD-007 Global Count Audit
3. BUG-012 Encyclopedia Count Consistency

### Medium Priority

1. TD-020 Knowledge System Navigation Registry
2. TD-016 Collection Book Performance Optimization
3. TD-018 Encyclopedia Performance Optimization
4. TD-019 Multi-language Content Coverage

### Low Priority

1. TD-002 Legendary Discovery Visual Upgrade
2. TD-008 Real National Map System
3. TD-017 Collection Set Auto-generator

## Review Result

`docs/TECHNICAL_DEBT.md` 当前仍然可用。

v0.64 和 v0.65 完成后，技术债务重点已经从“功能补齐”逐渐转向：

- 发现规则保护
- 全局统计一致性
- 导航复杂度控制
- 大规模内容性能
- 多语言覆盖率

Status: Reviewed.

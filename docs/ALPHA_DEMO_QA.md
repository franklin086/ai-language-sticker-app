# MILESTONE-044 Alpha Demo QA

## Version

v0.73C-demo-qa

## Status

Completed

## Scope

This QA review checks the Alpha Demo path defined in `docs/ALPHA_DEMO_PLAN.md` and the v0.73A Demo Flow Hardening changes.

This milestone is documentation only. It does not modify business code, backend, Gemini, localStorage, XP, Achievement, Daily Quest, Treasure Chest, or Audio logic.

---

## QA Path

```text
首页
↓
开始发现
↓
拍照识别
↓
识别成功
↓
读故事
↓
学知识
↓
查百科
↓
去挑战
↓
看学习驾驶舱
↓
继续发现
```

## Recommended Demo Artifacts

- Panda
- Car
- Rocket
- Camera
- Mona Lisa

These artifacts remain the recommended demo set because they are easy to recognize and have story, knowledge fact, encyclopedia, quiz, and learning-system coverage.

---

## QA Findings

## DEMO-QA-001

页面：
首页

检查项：
开始发现入口是否明确

结果：
PASS

问题：
None

建议：
保留“开始发现”作为首页最重要的主行动。演示时不要先进入复杂系统，先让用户看到拍照识别路径。

---

## DEMO-QA-002

页面：
识别成功 / 结果卡

检查项：
识别成功后是否有主行动

结果：
PASS

问题：
None

建议：
v0.73A 已将“读故事”强化为更明显的主行动，符合 Demo 主路径。

---

## DEMO-QA-003

页面：
结果卡

检查项：
结果卡是否能进入故事

结果：
PASS

问题：
None

建议：
演示时优先点击“读故事”，不要先跳到挑战或学习驾驶舱，保持 Story First。

---

## DEMO-QA-004

页面：
藏品详情页

检查项：
故事后是否能进入知识

结果：
PASS

问题：
None

建议：
v0.73A 已将“学知识”强化为故事后的主要行动，路径清楚。

---

## DEMO-QA-005

页面：
藏品详情页 / 百科入口 / 挑战入口

检查项：
知识后是否能进入百科或挑战

结果：
PASS

问题：
None

建议：
“查百科”已支持从当前藏品直达百科详情；“去挑战”在有 Quiz 时可继续进入挑战。

---

## DEMO-QA-006

页面：
Knowledge Quiz

检查项：
Quiz 未解锁时是否有 fallback

结果：
PASS

问题：
None

建议：
v0.73A 已增加“看进度”和“继续发现”出口，避免未解锁 Quiz 时形成死路。

---

## DEMO-QA-007

页面：
Discovery Encyclopedia

检查项：
百科内容不足时是否有 fallback

结果：
PASS

问题：
None

建议：
内容不足时显示“更多资料正在完善中”，避免空白内容影响演示。

---

## DEMO-QA-008

页面：
Learning Dashboard

检查项：
学习驾驶舱是否能推荐下一步

结果：
PASS

问题：
None

建议：
演示时把 Dashboard 定位为“下一步行动建议”，不要展开讲所有统计模块。

---

## DEMO-QA-009

页面：
详情页 / 百科 / Quiz / 公会 / 学习驾驶舱

检查项：
返回路径是否清楚

结果：
PASS

问题：
None

建议：
现有返回入口可支撑 Demo。演示前仍建议手动走一遍：详情页返回、百科返回、Quiz 返回、公会返回。

---

## DEMO-QA-010

页面：
百科 / 结果卡 / Quiz fallback

检查项：
是否出现 undefined / null / 空白内容

结果：
PASS

问题：
None

建议：
v0.73A 已为百科故事和知识内容增加兜底文案。正式演示仍建议使用 Panda / Car / Rocket / Camera / Mona Lisa，减少随机内容风险。

---

## DEMO-QA-011

页面：
中文界面整体

检查项：
是否有英文标签混入中文界面

结果：
NEEDS_FIX

问题：
仍可能看到少量英文或英文风格标签，例如 `Magic Encyclopedia`、`Confidence`、`LEGENDARY`、部分学习系统标签或专业词。

建议：
进入 v0.73D 时做一次轻量 copy sweep：中文界面优先使用“魔法百科”“可信度”“传奇发现”等儿童友好中文短文案；保留品牌化英文只用于视觉庆祝语。

---

## DEMO-QA-012

页面：
收藏册 / 百科 / Quiz / 未发现藏品

检查项：
是否违反 Discovery Rule

结果：
PASS

问题：
None

建议：
未发现内容仍应只显示锁定、神秘藏品、继续探索解锁、进度等信息，不提前展示完整故事、知识点、百科正文或 Quiz 答案。

---

## DEMO-QA-013

页面：
Quiz fallback / Demo 行动路径

检查项：
是否违反 Learn By Discovery

结果：
NEEDS_FIX

问题：
核心规则没有被破坏，但 Quiz fallback 中“继续发现”的行为更像返回上一级学习页面，而不是直接回到首页发现入口。儿童用户可能理解为会直接继续拍照探索。

建议：
v0.73D 可把该按钮文案调整为“返回知识册”，或接入现有继续发现回调，让按钮真正回到发现路径。不要新增系统，只统一按钮语义。

---

## Summary

PASS 数量：
11

NEEDS_FIX 数量：
2

BLOCKER 数量：
0

## Severity Summary

High：
0

Medium：
0

Low：
2

## BLOCKER Review

当前没有 BLOCKER。

Alpha Demo 主路径已经可以支撑演示：

```text
首页 -> 开始发现 -> 识别成功 -> 读故事 -> 学知识 -> 查百科 -> 去挑战 -> 看学习驾驶舱 -> 继续发现
```

## Remaining Issues

1. 中文界面仍有少量英文标签或英文风格庆祝语，需要在正式演示前做轻量文案统一。
2. Quiz fallback 中“继续发现”的按钮语义和实际返回路径略有偏差，需要在下一轮小修中统一。

## Recommendation

是否建议进入 v0.73B Demo Content Pack 或 v0.73D Demo Fixes：

建议先进入：

```text
v0.73D Demo Fixes
```

原因：

- 当前没有 BLOCKER，但还有 2 个 Low 级体验问题。
- 这两个问题都属于轻量 copy / navigation polish，修复成本低。
- 修完后再进入 v0.73B Demo Content Pack，会让内容扩充建立在更稳定的演示路径上。

Recommended order:

1. v0.73D Demo Fixes
2. v0.73B Demo Content Pack

---

## QA Conclusion

MILESTONE-044 QA result:

```text
Alpha Demo path: PASS with minor fixes recommended
Blocker count: 0
Recommended next milestone: v0.73D Demo Fixes
```
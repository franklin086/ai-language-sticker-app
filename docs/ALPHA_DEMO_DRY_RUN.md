# MILESTONE-047 Alpha Demo Final Dry Run

## Version

v0.73B-alpha-demo-final-dry-run

## Status

Completed

## Scope

This dry run reviews the curated Alpha Demo content pack after MILESTONE-046.

This milestone is documentation only. It does not modify business code, backend, Gemini, localStorage, XP, Achievement, Daily Quest, Treasure Chest, or Audio logic.

---

## Demo Path

```text
首页
↓
开始发现
↓
拍照识别
↓
发现藏品
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

## Review Method

The dry run checks the five recommended demo artifacts against current content data:

- `app/data/museumArtifacts.ts`
- `app/data/artifactFacts.ts`
- `app/data/knowledgeQuizData.ts`
- Knowledge category / collection / academy routing through existing helpers
- Encyclopedia fallback behavior through existing encyclopedia helpers

No code was changed during this review.

---

## DEMO-DRYRUN-001

藏品：
Panda

结果：
PASS

检查结果：

- Exists in `museumArtifacts`: Yes
- Has `objectZh / objectEn`: Yes, `熊猫 / Panda`
- Has aliases: Yes
- Has emoji: Yes, `🐼`
- Has story: Yes
- Has discovery fact: Yes
- Has Quiz: Yes
- Encyclopedia or fallback: Yes
- Knowledge book / academy routing: Yes, Animals
- Demo suitability: Strong
- Child-friendly content: Yes

问题：
None

建议：
Use Panda as the first or second demo object. It is visually clear, emotionally appealing, and strongly supports the Discovery -> Story -> Knowledge -> Quiz loop.

---

## DEMO-DRYRUN-002

藏品：
Car

结果：
PASS

检查结果：

- Exists in `museumArtifacts`: Yes
- Has `objectZh / objectEn`: Yes, `汽车 / Car`
- Has aliases: Yes
- Has emoji: Yes, `🚗`
- Has story: Yes
- Has discovery fact: Yes
- Has Quiz: Yes
- Encyclopedia or fallback: Yes
- Knowledge book / academy routing: Yes
- Demo suitability: Strong
- Child-friendly content: Yes

问题：
None

建议：
Use Car to show everyday discovery. Current content works well for city life and transportation. If the presenter wants a stronger technology angle, describe it as "城市里的移动工具" rather than forcing a technical explanation.

---

## DEMO-DRYRUN-003

藏品：
Rocket

结果：
PASS

检查结果：

- Exists in `museumArtifacts`: Yes
- Has `objectZh / objectEn`: Yes, `火箭 / Rocket`
- Has aliases: Yes
- Has emoji: Yes, `🚀`
- Has story: Yes
- Has discovery fact: Yes
- Has Quiz: Yes
- Encyclopedia or fallback: Yes
- Knowledge book / academy routing: Yes, Technology
- Demo suitability: Strong
- Child-friendly content: Yes

问题：
None

建议：
Use Rocket when the demo needs a stronger "wow" moment. It has legendary rarity and a simple space-exploration learning angle.

---

## DEMO-DRYRUN-004

藏品：
Camera

结果：
PASS

检查结果：

- Exists in `museumArtifacts`: Yes
- Has `objectZh / objectEn`: Yes, `相机 / Camera`
- Has aliases: Yes
- Has emoji: Yes, `📷`
- Has story: Yes
- Has discovery fact: Yes
- Has Quiz: Yes
- Encyclopedia or fallback: Yes
- Knowledge book / academy routing: Yes, Technology
- Demo suitability: Strong
- Child-friendly content: Yes

问题：
None

建议：
Use Camera to connect the product concept with real-world memory, photos, and discovery. It is a good bridge between the app's camera interaction and the learning layer.

---

## DEMO-DRYRUN-005

藏品：
Mona Lisa

结果：
PASS

检查结果：

- Exists in `museumArtifacts`: Yes
- Has `objectZh / objectEn`: Yes, `蒙娜丽莎 / Mona Lisa`
- Has aliases: Yes
- Has emoji: Yes, `🖼️`
- Has story: Yes
- Has discovery fact: Yes
- Has Quiz: Yes
- Encyclopedia or fallback: Yes
- Knowledge book / academy routing: Yes, Art
- Demo suitability: Strong
- Child-friendly content: Yes

问题：
None

建议：
Use Mona Lisa after one simple object has already been demonstrated. It shows that the app can cover art and world culture, not only animals or everyday objects.

---

## Summary

PASS 数量：
5

NEEDS_FIX 数量：
0

BLOCKER 数量：
0

## Artifact Readiness Matrix

| Artifact | Story | Fact | Quiz | Encyclopedia | Knowledge Book / Academy | Demo Ready |
| --- | --- | --- | --- | --- | --- | --- |
| Panda | PASS | PASS | PASS | PASS | PASS | PASS |
| Car | PASS | PASS | PASS | PASS | PASS | PASS |
| Rocket | PASS | PASS | PASS | PASS | PASS | PASS |
| Camera | PASS | PASS | PASS | PASS | PASS | PASS |
| Mona Lisa | PASS | PASS | PASS | PASS | PASS | PASS |

## Demo Content Notes

1. The five curated artifacts all have clear Chinese and English names.
2. The five curated artifacts all have emoji, aliases, story, discovery facts, and quiz data.
3. Encyclopedia content has safe fallback behavior, so the demo should not show a blank encyclopedia panel.
4. The five artifacts can enter the knowledge / academy layer through current category routing.
5. The content is short enough for a child-friendly demo and does not rely on long adult-style explanations.

## Risk Review

## Recognition Risk

Status:
LOW

Reason:
Panda, Car, Rocket, and Camera are visually clear. Mona Lisa may require a clean printed image or screen image to avoid being recognized as a generic painting.

Mitigation:
Prepare demo images in advance. If Mona Lisa maps to a generic painting, switch to Panda, Car, Rocket, or Camera.

## Content Risk

Status:
LOW

Reason:
All five artifacts have curated story, fact, and quiz content.

Mitigation:
Use the curated artifacts only during the formal demo. Avoid random objects until after the guided demo path is complete.

## Navigation Risk

Status:
LOW

Reason:
MILESTONE-043 and MILESTONE-045 already hardened the demo path and fallback copy.

Mitigation:
Before live presentation, do one manual click-through using Panda or Car.

## Discovery Rule Risk

Status:
LOW

Reason:
The dry run relies on discovered artifacts for story, facts, encyclopedia details, and quiz. Locked content should remain protected.

Mitigation:
Start the demo by discovering the artifact first, then move into story, knowledge, encyclopedia, and quiz.

---

## Final Decision

是否可以进入 Alpha Demo：
Yes

是否建议进入 v0.73E Demo Final Fixes：
No

是否建议进入 v0.74 Alpha Demo Release：
Yes

## Recommendation

Recommended next milestone:

```text
v0.74 Alpha Demo Release
```

Reason:

The curated demo content pack is ready. The five recommended artifacts all support the full Alpha Demo loop:

```text
发现
-> 故事
-> 知识
-> 百科
-> 挑战
-> 学习驾驶舱
-> 继续发现
```

There are no BLOCKER or NEEDS_FIX findings in this dry run.

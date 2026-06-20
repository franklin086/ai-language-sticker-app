# MILESTONE-048 Alpha Demo Release

## Version

v0.74-alpha-demo-release

## Status

Release Candidate

## Scope

This document prepares the first demonstrable Alpha Demo Release for AI Magic Camera.

This milestone is documentation only. It does not add business features, backend changes, Gemini changes, localStorage fields, XP logic, Achievement logic, Daily Quest logic, Treasure Chest logic, or Audio logic.

---

## 1. Release Summary

The current product is ready for an Alpha Demo release candidate.

The demo has passed the final dry run for five curated artifacts:

- Panda
- Car
- Rocket
- Camera
- Mona Lisa

The release demonstrates the complete Discovery -> Learning loop:

```text
首页
-> 开始发现
-> 拍照识别
-> 发现藏品
-> 读故事
-> 学知识
-> 查百科
-> 去挑战
-> 学习驾驶舱
-> 继续发现
```

## Release Goal

The goal of v0.74 is not to prove every product system.

The goal is to prove one stable, understandable, child-friendly demo path:

```text
先发现
再学习
再挑战
再继续探索
```

## Release Readiness

Current readiness:

- Demo path: Ready
- Demo content pack: Ready
- Five demo artifacts: Ready
- Story / Fact / Quiz / Encyclopedia path: Ready
- Learning Dashboard path: Ready
- Known limitations: Documented

---

## 2. Demo Assets

## Demo Asset Matrix

| Artifact | 中文名 | Story | Fact | Quiz | Encyclopedia / Fallback | Learning Dashboard Path |
| --- | --- | --- | --- | --- | --- | --- |
| Panda | 熊猫 | Ready | Ready | Ready | Ready | Ready |
| Car | 汽车 | Ready | Ready | Ready | Ready | Ready |
| Rocket | 火箭 | Ready | Ready | Ready | Ready | Ready |
| Camera | 相机 | Ready | Ready | Ready | Ready | Ready |
| Mona Lisa | 蒙娜丽莎 | Ready | Ready | Ready | Ready | Ready |

## Panda

Demo value:

- Strong child appeal.
- Easy to recognize from a clear photo, plush toy, picture, or book page.
- Good for showing animal learning, rare discovery, story, fact, and quiz.

Recommended use:

Use as the first guided demo artifact.

## Car

Demo value:

- Familiar real-world object.
- Good for showing everyday discovery and city-life learning.
- Useful backup if camera recognition needs a simple object.

Recommended use:

Use as a stable fallback or second demo artifact.

## Rocket

Demo value:

- Strong "wow" feeling.
- Good for showing legendary discovery and space exploration.
- Works well for a child-friendly challenge question.

Recommended use:

Use when the demo needs a stronger emotional moment.

## Camera

Demo value:

- Connects directly to the app's camera-based product idea.
- Good for explaining memory, images, and discovery.
- Shows everyday technology learning.

Recommended use:

Use to explain why photos and discovery belong together.

## Mona Lisa

Demo value:

- Shows that the app supports art and world culture, not only objects and animals.
- Good for demonstrating encyclopedia value.
- Strong Alpha Demo proof that the world content layer is already broader than MVP.

Recommended use:

Use after one simple object has already succeeded. Prepare a clear printed image or screen image.

---

## 3. Demo Script

## Minute 1: Product Positioning

Presenter goal:

Explain what the app is and why it matters.

Suggested script:

```text
AI魔法识字相机把真实世界变成一个可以探索、学习和挑战的魔法博物馆。
孩子先发现一个真实物体，再读故事、学知识、查百科，最后完成一个小挑战。
```

Show:

- Home screen.
- "今天可以做什么？"
- Main action: "开始发现"

Key message:

```text
这不是单纯的识别工具，而是一个 Discovery -> Learning 的学习闭环。
```

## Minute 2: Photo Recognition And Discovery

Presenter goal:

Show the first discovery moment.

Recommended artifact:

Panda or Car.

Steps:

1. Click `开始发现`.
2. Choose or take a prepared image.
3. Wait for recognition.
4. Show the result card and discovery feedback.

Suggested script:

```text
现在孩子发现了一个藏品。系统会显示中文名、英文名、稀有度、所属博物馆和下一步行动。
第一步不是马上考试，而是先产生兴趣。
```

Show:

- Recognized artifact.
- Story action.
- Audio button if visible.
- Share card if useful.

## Minute 3: Story, Fact, And Encyclopedia

Presenter goal:

Show the learning hierarchy.

Steps:

1. Click `读故事`.
2. Show the artifact story.
3. Click or point to `学知识`.
4. Show the discovery fact.
5. Click `查百科`.
6. Show encyclopedia content or fallback.

Suggested script:

```text
这里的顺序是：先读故事，让孩子知道它为什么有趣。
再学知识，记住一个关键点。
最后查百科，看到更完整的资料。
```

Key message:

```text
内容遵守 Discovery Rule：先发现，才展示完整内容。
```

## Minute 4: Challenge And Academy

Presenter goal:

Show that learning can become a small challenge.

Steps:

1. Click `去挑战`.
2. Answer one unlocked quiz question.
3. Show correct / try again feedback.
4. Open academy or knowledge collection progress.

Suggested script:

```text
挑战只来自已经发现的藏品。
孩子不会被提前剧透，而是在发现之后再学习、再挑战。
```

Show:

- One quiz question.
- Immediate feedback.
- Knowledge / academy progress.

## Minute 5: Learning Dashboard And Continue Discovery

Presenter goal:

Show the final feedback loop.

Steps:

1. Open Learning Dashboard.
2. Show today's recommended next action.
3. Show progress snapshot.
4. Point to continue discovery.

Suggested script:

```text
学习驾驶舱回答一个很重要的问题：下一步该做什么？
孩子可以继续发现新藏品，也可以完成知识册、参与挑战、查看学院进度。
```

Close with:

```text
Alpha Demo 证明了完整路径：
真实世界的发现，可以自然变成故事、知识、挑战和下一次探索。
```

---

## 4. Known Limitations

## Gemini Recognition May Be Unstable

Gemini can occasionally return:

- Generic labels instead of specific artifacts.
- Temporary 502 / 503 service errors.
- A nearby object instead of the intended demo object.

Mitigation:

- Use prepared clear images.
- Start with Panda or Car.
- Keep Rocket, Camera, and Mona Lisa as curated options.

## Some Audio Is Not Real MP3 Yet

Audio architecture exists, but not every artifact has a real local mp3 asset.

Mitigation:

- Treat audio as Alpha infrastructure.
- Do not position final pronunciation quality as complete.

## Some Statistics Are Derived

Learning Dashboard and progress panels use current app state and derived calculations.

Mitigation:

- Describe them as Alpha learning progress indicators.
- Avoid claiming they are complete long-term learning analytics.

## Content Library Still Needs Expansion

The current library supports the Alpha Demo, but broader real-world use needs more artifacts, facts, stories, quizzes, and localized content.

Mitigation:

- Demo only curated artifacts during the formal presentation.
- Use random discovery only after the main demo path is complete.

## No Real Child User Test Yet

The experience has not yet been tested with real children.

Mitigation:

- Treat v0.74 as an internal / stakeholder Alpha Demo.
- Plan child-friendly usability tests after the demo release.

## No Full Mobile Device QA Yet

The flow has not yet been fully verified on physical iOS and Android devices.

Mitigation:

- Use web demo for controlled presentation.
- Schedule real-device QA as the next milestone.

---

## 5. Release Checklist

## Automated Checks

Before tagging the release, run:

```powershell
npx tsc --noEmit
npm run lint
git diff --check
```

Expected result:

- TypeScript: PASS
- lint: PASS
- diff whitespace check: PASS

## Manual Demo Checks

Before live demo:

- [ ] Frontend starts.
- [ ] Backend starts.
- [ ] Gemini recognition returns a usable result.
- [ ] Main path works from home to recognition.
- [ ] Result card appears.
- [ ] Story opens.
- [ ] Fact appears after discovery.
- [ ] Encyclopedia opens or shows fallback.
- [ ] Quiz opens or shows safe fallback.
- [ ] Learning Dashboard opens.
- [ ] Continue discovery path is visible.
- [ ] No debug response is visible.
- [ ] No `undefined`, `null`, or blank critical content appears.

## Demo Five-Artifact Checks

- [ ] Panda works.
- [ ] Car works.
- [ ] Rocket works.
- [ ] Camera works.
- [ ] Mona Lisa works or has backup plan.

## Git Release Checks

Before creating tag:

```powershell
git status
git diff --check
```

If clean and approved:

```powershell
git tag v0.74-alpha-demo-release
git push origin v0.74-alpha-demo-release
```

Important:

Do not create or push the tag until the manual release checks are accepted.

---

## 6. Next Stage Recommendations

## Option A: Real Device Demo QA

Goal:

Run the Alpha Demo path on real mobile devices.

Value:

- Validates camera permissions, image picker behavior, layout, and touch ergonomics.
- Reduces risk before child testing.

Risk:

- May reveal platform-specific issues that require focused fixes.

Priority:

High.

## Option B: Real Audio Pack

Goal:

Add real local audio for the curated demo artifacts and most common words.

Value:

- Makes the demo feel more complete.
- Strengthens the language-learning promise.

Risk:

- Requires audio asset quality control.
- May need content workflow decisions.

Priority:

Medium-High.

## Option C: Demo Content Expansion

Goal:

Expand curated demo-ready artifacts beyond the first five.

Value:

- Gives the presenter more flexibility.
- Reduces recognition risk by increasing backup options.

Risk:

- Content work can expand quickly if not tightly scoped.

Priority:

Medium.

## Option D: Child User Test Preparation

Goal:

Prepare a safe and structured test plan for real child users.

Value:

- Tests whether children understand the discovery loop.
- Finds copy, pacing, and navigation issues that adults may miss.

Risk:

- Requires consent process, test script, observation template, and privacy review.

Priority:

Medium-High after Real Device Demo QA.

---

## Final Recommendation

Recommended next milestone:

```text
v0.75 Real Device Demo QA
```

Reason:

The Alpha Demo content and flow are ready as a release candidate. The next highest-risk unknown is not another product system. It is whether the same demo path works reliably on real devices.

Suggested order:

1. v0.75 Real Device Demo QA
2. v0.76 Real Audio Pack
3. v0.77 Demo Content Expansion
4. v0.78 Child User Test Preparation

## Tag Recommendation

是否建议打 `v0.74-alpha-demo-release` tag：

Yes, after the release checklist is completed and accepted.

Do not tag before:

- `npx tsc --noEmit` passes.
- `npm run lint` passes.
- `git diff --check` passes.
- Manual demo path has been walked once.
- The user confirms the release candidate is accepted.

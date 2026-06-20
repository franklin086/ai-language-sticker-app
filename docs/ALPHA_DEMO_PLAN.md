# MILESTONE-042 Alpha Demo Plan

## Version

v0.73-alpha-demo-preparation

## Status

Planned

## Purpose

Prepare a stable, demonstrable, and verifiable Alpha Demo route for AI Magic Camera.

This milestone is documentation only. It does not add new systems, features, backend changes, Gemini changes, localStorage fields, XP logic, Achievement logic, Daily Quest logic, Treasure Chest logic, or Audio logic.

---

## 1. Alpha Demo Positioning

AI Magic Camera is already beyond MVP.

The original MVP goal was:

```text
camera scan
-> AI recognition
-> animated word sticker
-> pronunciation
```

The current product has expanded into an Alpha Prototype with:

- Gemini recognition
- result card
- collection and museum systems
- artifact stories
- discovery facts
- encyclopedia
- quiz
- academy
- audio foundation
- sharing card
- learning dashboard
- discovery loop guidance

Alpha Demo goal:

```text
Show one smooth, guided product loop.
Do not prove every system.
Prove that discovery can naturally lead to learning and continued exploration.
```

---

## 2. Demo User Story

The 5-minute demo should follow one clear child-friendly path:

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

### Story Narrative

The presenter can describe the experience like this:

```text
孩子拿起相机，发现真实世界里的一个东西。
AI 把它变成一个魔法藏品。
孩子先读故事，知道它为什么有趣。
再看知识点，记住一个关键事实。
然后查百科，看到更完整的资料。
如果这个藏品已经解锁挑战，就可以做一个小问题。
最后回到学习驾驶舱，看到下一步应该继续发现什么。
```

### Core Product Promise

```text
先发现
再学习
再挑战
最后继续探索
```

---

## 3. Recommended Demo Artifacts

Recommended demo artifacts are selected from current `museumArtifacts`, `artifactFacts`, and `knowledgeQuizData`.

Selection criteria:

1. Easy to recognize from a photo or prepared image.
2. Has story content in `museumArtifacts`.
3. Has a discovery fact.
4. Has a quiz question.
5. Can enter Knowledge Collections, Explorer Academy, and Learning Dashboard.

## Primary Demo Set

### 1. 熊猫 / Panda

- Emoji: 🐼
- Museum: 动物博物馆
- Rarity: 传奇
- Why choose it:
  - Highly recognizable.
  - Strong child appeal.
  - Has story, fact, quiz, category, and academy path.
  - Good for demonstrating rare/legendary emotional feedback.
- Demo image suggestion:
  - Clear panda photo, panda toy, panda picture book, or panda plush.

### 2. 汽车 / Car

- Emoji: 🚗
- Museum: 交通博物馆
- Rarity: 稀有
- Why choose it:
  - Easy for Gemini to recognize.
  - Common real-world object.
  - Has story, fact, quiz, and audio strategy.
  - Good for showing specific recognition such as black car or SUV when available.
- Demo image suggestion:
  - Toy car, real car photo, or clean car image.

### 3. 火箭 / Rocket

- Emoji: 🚀
- Museum: 交通博物馆
- Rarity: 传奇
- Why choose it:
  - Strong visual and emotional effect.
  - Has story, fact, quiz, and legendary rarity.
  - Good for showing "wow" moment.
- Demo image suggestion:
  - Rocket toy, rocket illustration, or space poster.

### 4. 相机 / Camera

- Emoji: 📷
- Museum: 科技博物馆
- Rarity: 稀有
- Why choose it:
  - Fits the product theme.
  - Has story, fact, quiz, and technology category.
  - Good for demonstrating everyday object learning.
- Demo image suggestion:
  - Real camera, toy camera, or camera icon/photo.

### 5. 蒙娜丽莎 / Mona Lisa

- Emoji: 🖼️
- Museum: 卢浮宫魔法馆
- Rarity: 传奇
- Why choose it:
  - Demonstrates world culture and art expansion.
  - Has story, fact, quiz, translations, and encyclopedia value.
  - Good for showing the product is not limited to animals and objects.
- Demo image suggestion:
  - Printed Mona Lisa image or screen image.

## Backup Demo Artifacts

Use these if recognition for the primary set is unstable:

- 猫 / Cat
- 狗 / Dog
- 书 / Book
- 手机 / Phone
- 电脑 / Computer
- 袋鼠 / Kangaroo
- 海龟 / Sea Turtle

---

## 4. Demo Checklist

Use this checklist before any live demo.

## Recognition

- [ ] Backend starts successfully.
- [ ] Frontend starts successfully.
- [ ] Image upload reaches `/api/recognize`.
- [ ] Gemini returns `object_zh` or `object_en`.
- [ ] Result card appears after recognition.
- [ ] Temporary service error fallback is understandable.

## Story Entry

- [ ] Result card shows a clear story entry.
- [ ] Discovery celebration can lead to story.
- [ ] Artifact detail shows story first.
- [ ] Story text is not shown for undiscovered artifacts.

## Knowledge Entry

- [ ] Result card or detail page shows knowledge entry.
- [ ] DiscoveryFactCard appears only for discovered artifacts.
- [ ] Knowledge fact is short and understandable.
- [ ] Knowledge category badge appears where expected.

## Encyclopedia Entry

- [ ] Artifact detail has `📚 查百科`.
- [ ] Encyclopedia opens from the demo path.
- [ ] Discovered artifact shows full encyclopedia content.
- [ ] Undiscovered artifact stays locked.

## Quiz Entry

- [ ] Demo artifact has a quiz question.
- [ ] Quiz opens from current artifact context.
- [ ] Question appears only after the artifact is discovered.
- [ ] Answer feedback appears clearly.

## Learning Dashboard

- [ ] Dashboard can be opened from demo path.
- [ ] Top area shows recommended next action first.
- [ ] Dashboard statistics render without crashing.
- [ ] Continue discovery path is available.

## Audio Button

- [ ] Audio button is visible for demo artifact.
- [ ] Clicking audio does not crash.
- [ ] If local audio is missing, fallback behavior is safe.
- [ ] Presenter explains that real audio pack is still in progress if needed.

## Share Card

- [ ] Share card button is visible from result/detail flow.
- [ ] Share preview opens.
- [ ] PNG export does not break the page.
- [ ] Share card content uses the discovered artifact.

## Return Paths

- [ ] Can return from story/detail to main flow.
- [ ] Can return from encyclopedia.
- [ ] Can return from quiz.
- [ ] Can return from Learning Dashboard.
- [ ] No demo step traps the user in a modal.

## Multilingual Copy

- [ ] Chinese UI does not show obvious English-only labels.
- [ ] Language switcher still works.
- [ ] Main demo path remains understandable in Chinese.
- [ ] Long translated text does not visibly overflow in key screens.

---

## 5. Demo Risk List

## Recognition Failure

Risk:

Gemini may return 502, 503, high demand, or unclear result.

Mitigation:

- Prepare local demo images.
- Have at least 3 backup artifacts.
- Show the retry behavior only if needed.
- Do not depend on a single live camera shot.

## Inaccurate Recognition

Risk:

Gemini may return a generic object instead of the intended artifact.

Examples:

- Panda toy recognized as toy.
- Mona Lisa image recognized as painting.
- Car recognized as vehicle.

Mitigation:

- Use clear, centered images.
- Prefer common objects for the first demo.
- Use backup set if needed.
- Explain that specific recognition is still improving.

## Quiz Not Unlocked

Risk:

Quiz only unlocks after the artifact is discovered. If the app state is fresh or recognition maps to a different artifact, quiz may not appear.

Mitigation:

- Start with one artifact known to have quiz data.
- Verify the artifact appears in collection before opening quiz.
- Use Panda, Car, Rocket, Camera, or Mona Lisa first.

## Encyclopedia Content Is Thin

Risk:

Some artifacts may have basic story/fact content but not rich encyclopedia depth.

Mitigation:

- Demo only curated artifacts.
- Avoid showing random newly recognized items in the formal demo.
- Position encyclopedia as first version of the content layer.

## Multilingual Overflow

Risk:

Spanish, Portuguese, or Japanese text may be longer than Chinese and may overflow in compact UI.

Mitigation:

- Demo mainly in Chinese first.
- Briefly show language switcher only if layout looks stable.
- Record overflow as demo QA item, not live-debug it.

## Missing Real MP3

Risk:

Audio foundation exists, but real local mp3 files may not be present.

Mitigation:

- Present audio as architecture-ready.
- If playback falls back, explain that Real Audio Pack is a follow-up.
- Avoid promising final pronunciation quality in Alpha Demo.

## Derived Statistics

Risk:

Some learning analytics are derived from current state, not real historical logs.

Mitigation:

- Describe dashboard as Alpha learning summary.
- Avoid claiming it is a complete learning history.
- Keep wording focused on "current progress" and "next action."

---

## 6. Five-Minute Demo Script

## Minute 1: Product Goal

Presenter says:

```text
AI Magic Camera helps children discover real-world objects and turn them into magical language-learning artifacts.
The important idea is simple:
discover first, learn next, then try a small challenge.
```

Show:

- Home screen.
- Today guidance.
- Start discovery action.

Key message:

```text
This is not just a recognition app.
It is a discovery-to-learning loop.
```

## Minute 2: Photo Recognition And Discovery

Action:

1. Click Start Discovery / Choose from album.
2. Select a prepared Panda or Car image.
3. Wait for recognition.
4. Show the result card and discovery celebration.

Presenter says:

```text
The app recognizes the object and turns it into a magic artifact.
The child immediately gets a sense of discovery.
```

Show:

- Recognized Chinese and English name.
- Rarity.
- Museum.
- Audio button.
- Share card button if appropriate.

## Minute 3: Story, Knowledge, Encyclopedia

Action:

1. Click `读故事`.
2. Show artifact detail story area.
3. Click or point to `学知识`.
4. Show Discovery Fact.
5. Click `查百科`.
6. Show encyclopedia detail.

Presenter says:

```text
The content hierarchy is:
story first, then knowledge, then encyclopedia.
This keeps learning connected to curiosity instead of showing everything too early.
```

Key message:

```text
Discovery Rule protects the surprise:
undiscovered content stays locked.
```

## Minute 4: Challenge And Academy

Action:

1. Enter quiz for the discovered artifact.
2. Answer one question.
3. Show feedback.
4. Open Knowledge Collections or Explorer Academy.

Presenter says:

```text
After learning, the child can try a small challenge.
Challenges only appear for discovered artifacts, so the app follows Learn By Discovery.
```

Show:

- Quiz question.
- Correct/wrong feedback.
- Academy or knowledge collection progress.

## Minute 5: Learning Dashboard And Next Recommendation

Action:

1. Open Learning Dashboard.
2. Show top recommendation.
3. Show progress snapshot.
4. Click or point to continue discovery.

Presenter says:

```text
The dashboard answers the most important question:
what should I do next?
The child can continue discovering, complete a knowledge book, try a challenge, or improve academy progress.
```

Close with:

```text
The Alpha Demo proves the full loop:
real-world discovery becomes story, knowledge, challenge, and a reason to explore again.
```

---

## 7. Alpha Demo Pass Standards

## PASS

A demo run is PASS if:

- App launches successfully.
- Backend is reachable.
- At least one prepared artifact is recognized.
- Result card appears.
- Story can be opened.
- Knowledge fact can be shown.
- Encyclopedia can be opened.
- Quiz can be opened for at least one discovered artifact.
- Learning Dashboard opens.
- Recommended next action is visible.
- No page traps the user without a return path.
- No sensitive debug information appears on the formal page.

## NEEDS_FIX

A demo run is NEEDS_FIX if:

- Recognition works only after retry.
- Object is recognized but maps to a less ideal artifact.
- Quiz is missing for the selected artifact.
- Encyclopedia content appears but feels thin.
- Audio button falls back but does not crash.
- Share card opens but visual polish is weak.
- Some text is too dense or slightly overflowing.
- Return path exists but is hard to notice.

## BLOCKER

A demo run is BLOCKER if:

- Frontend cannot start.
- Backend cannot start.
- Recognition request cannot reach backend.
- Gemini always fails without usable fallback.
- Result card never appears after successful backend response.
- Story/knowledge/encyclopedia path is broken.
- Quiz crashes or blocks navigation.
- Learning Dashboard crashes.
- A modal or page traps the presenter.
- Undiscovered content reveals full story, fact, encyclopedia body, or quiz answer.

---

## 8. Next Stage Recommendation

## Option 1: v0.73A Demo Flow Hardening

Goal:

Make the main demo path more reliable and less dense.

Best for:

- Fixing navigation rough edges.
- Reducing demo friction.
- Verifying main loop manually.

Risk:

- Does not add more content.

Priority:

High.

## Option 2: v0.73B Demo Content Pack

Goal:

Create a curated demo content pack for 5 to 10 artifacts.

Best for:

- Improving story/fact/quiz/encyclopedia consistency.
- Making the demo feel richer.
- Reducing random content gaps.

Risk:

- Content work can expand quickly if not scoped tightly.

Priority:

Medium-High.

## Option 3: v0.73C Demo QA

Goal:

Run a structured QA pass against the demo checklist.

Best for:

- Finding actual blockers before showing the demo.
- Checking return paths, fallback states, and language layout.

Risk:

- QA may reveal issues that require follow-up fixes.

Priority:

High, after v0.73A or paired with it.

---

## Final Recommendation

Recommended next step:

```text
v0.73A Demo Flow Hardening
```

Reason:

The app already has enough systems and enough candidate demo content. The next highest-value step is to harden the main demo flow so that the presenter can move through:

```text
首页
-> 开始发现
-> 拍照识别
-> 发现藏品
-> 读故事
-> 学知识
-> 查百科
-> 去挑战
-> 看学习驾驶舱
-> 继续发现
```

Recommended follow-up order:

1. v0.73A Demo Flow Hardening
2. v0.73C Demo QA
3. v0.73B Demo Content Pack

Rationale:

First make the path reliable. Then test it. Then expand the curated content pack based on real demo gaps.


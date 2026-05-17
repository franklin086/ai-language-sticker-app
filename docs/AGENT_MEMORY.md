# Agent Memory

更新时间：2026-05-17

## 项目一句话

AI 互动单词贴纸 App：用 AI 视觉识别把现实物体转成可互动、会发音、带动画的单词贴纸，用于多语言学习。

## 当前仓库状态

- 仓库路径：`D:\ai-language-sticker-app`
- Git 分支：`main`
- 远程仓库：`https://github.com/franklin086/ai-language-sticker-app.git`
- 当前提交：`1ba1974 Initial Codex GitHub setup`
- 当前源码状态：项目骨架阶段，尚未初始化 Flutter/FastAPI 应用源码。

## 已读取资料

- `README.md`
- `docs/CODEX_TASKS.md`
- `.env.example`
- `connect-github.ps1`
- `auto-pull.ps1`
- `auto-push.ps1`
- `C:\Users\linfa\Desktop\AI_Sticker_APP_Development_Manual.docx`

## 产品目标

- 通过 AI 视觉识别现实物体。
- 将识别结果转化为可爱的动态单词贴纸。
- 支持多语言学习、真人发音、智能记忆。
- 做成无广告、无订阅、具有高级感的全球化教育产品。

## 核心开发原则

- 先做“惊艳感”，再做复杂系统。
- MVP 优先实现：扫描 -> 识别 -> 动态贴纸 -> 发音。
- 不要一开始做 AR、社交、复杂 AI 模型或自研模型。
- 先上线验证，再逐步完善。
- 控制 AI 成本：MVP 先用 API，后续靠缓存、图片压缩、本地模型替换优化。

## 推荐技术栈

- 前端：Flutter
- 后端：FastAPI
- 数据库：Supabase / PostgreSQL
- AI 识别：OpenAI Vision
- 动画：Rive
- 语音：ElevenLabs / OpenAI TTS
- 部署：Railway / Firebase

## MVP 阶段

1. 相机识别
   - 目标：摄像头识别现实物体并返回英文单词。
   - 验收：1 秒内识别苹果、杯子、猫等常见物体。

2. 背景去除
   - 目标：自动抠图生成透明背景。
   - 验收：边缘自然，无明显锯齿。

3. 动态贴纸
   - 目标：生成可爱的动态贴纸。
   - 验收：贴纸拥有动画、音效与流畅交互。

4. 真人发音
   - 目标：支持点击发音。
   - 验收：发音自然，无明显机械感。

5. 高级 UI
   - 目标：整体界面具备 Apple / Nintendo 级高级感。
   - 验收：动画丝滑、字体统一、视觉高级。

## 建议 Flutter 目录

```text
lib/
  core/
  features/
  services/
  widgets/
  animations/
  ai/
  main.dart
```

## 后端架构

```text
App -> FastAPI -> OpenAI Vision -> Sticker Engine -> Database
```

后端职责：

- AI 识别
- 用户数据
- 学习记录
- 多语言管理

## 数据库草案

- `users`：用户信息
- `stickers`：贴纸数据
- `learning_records`：学习记录
- `languages`：多语言数据
- `favorites`：收藏夹

## AI Sticker Engine

流程：

```text
识别物体 -> 自动抠图 -> 卡通化 -> 动画化 -> 添加音效
```

目标：让每个贴纸都有生命感与情绪价值。

## 动画与音效

- 动画框架：Rive
- 推荐动画：弹跳、呼吸、眨眼、摇晃
- 音效要求：真实、治愈、轻量

## OpenAI Vision 接入流程

1. 拍照上传。
2. 调用 OpenAI Vision API。
3. 获取识别结果。
4. 返回结构化数据。
5. 生成贴纸。

## UI/UX 风格

- 重点是“可爱”和“高级感”。
- 避免廉价动画与低级音效。
- 参考方向：Nintendo、Disney、Apple。
- 首次使用要产生 WOW 感。

## 上线计划

1. TikTok / 小红书预热。
2. TestFlight 内测。
3. App Store 全球上线。

## 时间规划

- MVP：1 到 2 个月
- 可上线版本：3 个月
- 精品版本：6 个月

## 最终验收标准

- 识别速度小于 1 秒。
- 贴纸动画流畅。
- 发音自然。
- UI 高级。
- 用户第一次使用产生 WOW 感。

## 当前待办

来自 `docs/CODEX_TASKS.md`：

- 选择技术栈。
- 初始化 App 项目。
- 设置环境变量。
- 完善 README。
- 实现相机输入、照片预览、AI 识别 mock、背景去除 mock、贴纸卡片 UI、多语言单词展示、语音播放。

## 当前技术选择

- 用户已决定把项目初始化为 Expo React Native App。
- 使用 TypeScript。
- 使用 Expo Router。
- 当前只做最小可运行 App：首页显示 `AI Language Sticker App`、`Take photo`、`Choose from album`。
- 暂时不要接入真实 AI。
- 暂时不要接入相机权限或相册权限。
- 不再按早期手册中的 Flutter 方案初始化前端，除非用户以后明确改回 Flutter。

## 注意事项

- 不要提交真实 API Key。
- 修改功能时同步更新文档。
- 推送前测试。
- `README.md` 当前内容可读，但 Git Commands 代码块格式疑似被破坏，后续可以顺手修复。
- `安装说明.txt`、`auto-pull.ps1`、`auto-push.ps1` 中中文注释显示为乱码，可能是编码问题；脚本逻辑仍可作为参考。

## 开发总原则

- 后续写代码、改代码、评审代码时，遵守本机 Skill：`C:\Users\linfa\OneDrive\.codex\skills\karpathy-guidelines\SKILL.md`。
- 先想清楚再写代码：明确假设、说出不确定点、遇到高风险选择时先解释并征求判断。
- 简单优先：只做当前任务真正需要的功能，不提前堆复杂抽象。
- 小步精准修改：只改和任务直接相关的文件和代码，不顺手重构无关内容。
- 每个任务要有可验证的成功标准，完成后尽量运行测试或检查命令。

## 与用户协作原则

- 用户不懂代码；需要用户做判断时，要用普通语言说明：目的、理由、推荐方案、取舍。
- 复杂操作要拆成每一步，逐步指导用户做，不一次性丢一大串专业命令或概念。
- 默认给出推荐路径；只有选择真的重要时才列备选方案。

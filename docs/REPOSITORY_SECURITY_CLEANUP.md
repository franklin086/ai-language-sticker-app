# MILESTONE-030 Repository Security Cleanup

AI魔法识字相机仓库安全清理方案。

## Purpose

彻底处理 Git 历史中曾经包含 `OpenAI API Key` 的风险记录，避免 GitHub Push Protection 阻止 tag push / branch push，也避免密钥继续在任何 Git 历史、标签、远程引用或本地对象中残留。

本文件只记录分析和推荐方案。

当前阶段禁止直接执行历史重写，必须等待人工确认。

## Known Problem

受影响提交：

```text
a23a11e233e5c0064a8df0457b170a2369cfb04b
```

提交信息：

```text
feat: v0.66D product polish round 2
```

问题文件：

```text
ai-language-sticker-app-api.txt
```

已知影响：

```text
GitHub Push Protection blocked tag push
```

原因：

该提交中包含 `ai-language-sticker-app-api.txt`，该文件曾记录 OpenAI API Key 或相关敏感信息。

## Current Local Findings

本次只使用只读 Git 命令排查，没有读取或输出密钥内容。

### 1. Commit Object Exists Locally

本地 Git 对象库中仍存在该提交：

```text
git cat-file -t a23a11e233e5c0064a8df0457b170a2369cfb04b
=> commit
```

### 2. File Exists Inside The Commit

该提交中确实包含问题文件：

```text
git ls-tree -r a23a11e233e5c0064a8df0457b170a2369cfb04b -- ai-language-sticker-app-api.txt
=> ai-language-sticker-app-api.txt
```

### 3. Commit Is Not Currently Reachable From Local Branches Or Tags

当前本地分支和标签没有包含该提交：

```text
git branch --all --contains a23a11e233e5c0064a8df0457b170a2369cfb04b
=> no output

git tag --contains a23a11e233e5c0064a8df0457b170a2369cfb04b
=> no output

git for-each-ref --format='%(refname:short)' --contains a23a11e233e5c0064a8df0457b170a2369cfb04b
=> no output
```

结论：

当前本地 `main`、`origin/main`、本地 tags 不再指向这个提交。

### 4. Commit Is Still Present In Local Reflog

该提交仍出现在本地 reflog：

```text
refs/heads/main@{2026-06-07 15:25:58 +0800}: commit: feat: v0.66D product polish round 2
HEAD@{2026-06-07 15:25:58 +0800}: commit: feat: v0.66D product polish round 2
```

### 5. Commit Is Currently Unreachable

本地 Git 认为该提交是 unreachable：

```text
git fsck --no-reflogs --unreachable --no-progress
=> unreachable commit a23a11e233e5c0064a8df0457b170a2369cfb04b
```

结论：

该提交目前不是分支/标签历史的一部分，但仍因为本地 reflog 和对象库而存在。

### 6. Working Tree File Check

当前工作区中同名文件存在：

```text
Test-Path ai-language-sticker-app-api.txt
=> True
```

但该文件被 `.gitignore` 忽略：

```text
.gitignore:54:ai-language-sticker-app-api.txt
```

结论：

该文件不会被正常 `git status` 显示，也不会被普通 `git add .` 提交，但它仍然是本机敏感文件，应由人工确认后删除或迁移到安全密钥管理位置。

## Impact Scope

### Confirmed

- 本地对象库仍有敏感提交对象。
- 本地 reflog 仍记录该提交。
- 该提交内包含 `ai-language-sticker-app-api.txt`。
- 当前工作区仍存在同名文件，但已被 `.gitignore` 忽略。

### Not Confirmed Yet

以下内容需要人工确认或联网检查：

- GitHub 远程是否已经存在该提交。
- GitHub 上是否存在指向该提交的 tag。
- GitHub Push Protection 阻止的是哪个具体 tag。
- 该 OpenAI API Key 是否已经被撤销。

## Immediate Security Requirement

无论 Git 历史是否最终清理成功，都必须先处理密钥本身：

1. 登录 OpenAI Platform。
2. 撤销泄露过的 OpenAI API Key。
3. 重新创建新 key。
4. 只放入本地 `.env`。
5. 不要再保存到 `.txt`、`.md`、截图或聊天记录中。

Git 历史清理不能替代密钥轮换。

## Recommended Cleanup Strategy

### Recommended Tool: git-filter-repo

优先方案：

```text
git-filter-repo
```

原因：

- 官方推荐替代 `git filter-branch`。
- 速度快。
- 对删除历史文件非常直接。
- 可以完整清理所有 branches 和 tags 中的指定路径。

推荐目标：

```text
从所有 Git 历史中删除 ai-language-sticker-app-api.txt
```

### Secondary Tool: BFG Repo Cleaner

备选方案：

```text
BFG Repo Cleaner
```

适用情况：

- 团队更熟悉 Java 工具。
- 只需要快速删除某个文件或替换 secrets。

缺点：

- 对精细历史控制不如 `git-filter-repo` 灵活。

## Proposed Fix Steps

以下步骤暂时不要执行，等待人工确认。

### Phase 1: Backup

目的：

在历史重写前保留一个可回滚副本。

推荐操作：

```powershell
cd D:\ai-language-sticker-app
git status
git branch backup/pre-security-cleanup
```

如果担心本地工作区有大量未提交内容，先额外复制整个项目文件夹。

### Phase 2: Confirm Reachable References

目的：

确认是否还有分支或标签指向泄露提交。

推荐检查：

```powershell
git fetch --all --tags
git branch --all --contains a23a11e233e5c0064a8df0457b170a2369cfb04b
git tag --contains a23a11e233e5c0064a8df0457b170a2369cfb04b
git for-each-ref --format="%(refname:short)" --contains a23a11e233e5c0064a8df0457b170a2369cfb04b
git rev-list --all -- ai-language-sticker-app-api.txt
```

### Phase 3A: If Commit Is Reachable From Any Branch Or Tag

使用 `git-filter-repo` 删除该文件历史：

```powershell
git filter-repo --path ai-language-sticker-app-api.txt --invert-paths --force
```

然后验证：

```powershell
git log --all -- ai-language-sticker-app-api.txt
git rev-list --objects --all | Select-String "ai-language-sticker-app-api.txt"
git branch --all --contains a23a11e233e5c0064a8df0457b170a2369cfb04b
git tag --contains a23a11e233e5c0064a8df0457b170a2369cfb04b
```

预期：

```text
no output
```

最后才推送：

```powershell
git push origin --force-with-lease main
git push origin --force --tags
```

注意：

tag push 涉及历史重写风险，必须人工确认后执行。

### Phase 3B: If Commit Is Only Local Unreachable Object

如果确认远程没有该提交、没有 tag 指向它，并且它只存在于本地 reflog / unreachable objects，可选择清理本地 reflog 和 unreachable 对象。

推荐步骤：

```powershell
git reflog expire --expire=now --expire-unreachable=now --all
git gc --prune=now --aggressive
```

然后验证：

```powershell
git cat-file -t a23a11e233e5c0064a8df0457b170a2369cfb04b
```

预期：

```text
fatal: git cat-file: could not get object info
```

注意：

这会清理本地回退历史。执行前必须确认不需要从 reflog 恢复任何提交。

## Rollback Plan

### If Using Backup Branch

如果重写后发现问题，可以使用：

```powershell
git switch backup/pre-security-cleanup
```

或从备份分支恢复需要的文件。

### If Using Folder Backup

如果整个仓库被复制过，可以直接回到备份目录继续工作。

### If Already Force Pushed

如果已经 force push 到远程：

1. 立即停止团队其他成员继续 push。
2. 用备份分支或备份仓库恢复。
3. 再次执行安全清理。
4. 重新 force push。

## Risk Notes

### High Risk

- 历史重写会改变 commit hash。
- 已经基于旧历史工作的本地仓库需要重新同步。
- force push tags 可能影响已发布版本引用。

### Medium Risk

- 本地 reflog 清理后，无法再轻松回到被清理的旧提交。
- 如果未先撤销 API Key，即使 Git 历史清理成功，泄露风险仍然存在。

### Low Risk

- 删除 `ai-language-sticker-app-api.txt` 的历史不会影响当前源码功能。
- 当前该文件已被 `.gitignore` 忽略，未来普通提交不会再加入它。

## Recommended Decision

推荐路径：

1. 立即撤销泄露过的 OpenAI API Key。
2. 确认 GitHub 远程是否仍有包含 `a23a11e` 的 tag 或 branch。
3. 如果远程可达：使用 `git-filter-repo` 清理全历史，然后 force-with-lease 推送。
4. 如果仅本地不可达：清理本地 reflog 和 unreachable objects。
5. 删除或安全迁移当前工作区中的 `ai-language-sticker-app-api.txt`。

当前不要直接执行历史重写。

Status: Analysis completed. Waiting for human confirmation.

---

## MILESTONE-031 Local Repository Cleanup Result

Status: Completed

Local reflog and unreachable objects were cleaned after human confirmation.

Verified result:

```text
git cat-file -t a23a11e233e5c0064a8df0457b170a2369cfb04b
=> fatal: git cat-file: could not get object info
```

The local commit object has been removed from this repository.

Detailed cleanup record:

```text
docs/LOCAL_REPOSITORY_CLEANUP.md
```

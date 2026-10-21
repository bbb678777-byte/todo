# ✅ todo 待办清单 · 超详细学习教程

> **写给新手**：这是你的第 3 个练习项目。这份教程**完全独立**，不需要翻前两个项目的教程，从头到尾照着做就能完成：
> **本地写代码 → 自动测试 → 推送到 GitHub → 自动更新到宝塔服务器的 Docker → 更新版本 → 回滚**。
>
> 每一步都写清楚了：**在哪里执行**、**输入什么**、**应该看到什么**、**看到别的怎么办**。

---

## 目录

**第一部分：认识项目**
- [第 0 章 阅读说明（先看这个）](#第-0-章-阅读说明先看这个)
- [第 1 章 认识这个项目](#第-1-章-认识这个项目)
- [第 2 章 进度检查清单](#第-2-章-进度检查清单)

**第二部分：本地开发**
- [第 3 章 准备本地工具：VS Code](#第-3-章-准备本地工具vs-code)
- [第 4 章 在本地运行程序和测试](#第-4-章-在本地运行程序和测试)
- [第 5 章 代码导读：每个文件在做什么](#第-5-章-代码导读每个文件在做什么)

**第三部分：一次性准备（只做一次）**
- [第 6 章 推送到 GitHub](#第-6-章-推送到-github)
- [第 7 章 服务器准备](#第-7-章-服务器准备)
- [第 8 章 第一次手动部署](#第-8-章-第一次手动部署)
- [第 9 章 配置 GitHub Actions 自动测试 + 自动部署](#第-9-章-配置-github-actions-自动测试--自动部署)

**第四部分：日常使用（以后天天用）**
- [**第 10 章 ★ 更新版本：v1.0.0 → v1.1.0 完整实战**](#第-10-章--更新版本v100--v110-完整实战)
- [第 11 章 亲眼看看：自动测试怎么拦住有 bug 的代码](#第-11-章-亲眼看看自动测试怎么拦住有-bug-的代码)
- [第 12 章 只改配置不改代码：.env 文件](#第-12-章-只改配置不改代码env-文件)
- [第 13 章 只改文档，不发新版本](#第-13-章-只改文档不发新版本)
- [第 14 章 回滚：新版本出问题了怎么办](#第-14-章-回滚新版本出问题了怎么办)
- [第 15 章 数据卷：待办为什么不会丢](#第-15-章-数据卷待办为什么不会丢)

**第五部分：查阅**
- [第 16 章 常见问题](#第-16-章-常见问题)
- [第 17 章 命令速查表](#第-17-章-命令速查表)

---

# 第一部分：认识项目

## 第 0 章 阅读说明（先看这个）

### 0.1 标记的含义

| 标记 | 意思 |
|---|---|
| 💻 **本地** | 在你自己的 Windows 电脑上执行（推荐用 VS Code 里的终端） |
| 🖥️ **服务器** | 在服务器上执行（宝塔面板 → 左侧菜单「终端」） |
| 🌐 **浏览器** | 在浏览器里操作（GitHub 网站、宝塔面板、访问网页） |
| ✅ | 看到这个结果 = 成功 |
| ❌ | 出错了，按旁边的说明处理 |
| ⚠️ | 重要提醒，一定要看 |
| 💡 | 小知识，帮你理解为什么 |

> ⚠️ **新手最常犯的错误：命令在错误的地方执行。** 比如把服务器的命令在 Windows 上执行。每条命令前面都标了 💻 / 🖥️，请先看清楚再执行。

### 0.2 需要替换成你自己的内容

| 教程里写的 | 替换成 | 例子 |
|---|---|---|
| `bbb678777-byte` | 你的 GitHub 用户名（已经帮你填好了） | — |
| `你的服务器IP` | 服务器公网 IP | `1.2.3.4` |

### 0.3 怎么执行命令

- 每个灰色代码块 = **一条命令**。点代码块右上角的复制按钮（或选中后 `Ctrl + C`），粘贴到终端，按 `回车`。
- **一次只执行一条**，看到结果、对照教程确认没问题后，再执行下一条。
- 在 VS Code 终端里粘贴：`Ctrl + V` 或右键。
- 在宝塔终端里粘贴：右键 → 粘贴，或 `Ctrl + Shift + V`。

### 0.4 遇到问题怎么办

1. 先看这一步下面的 ❌ 说明。
2. 再查 [第 16 章 常见问题](#第-16-章-常见问题)。
3. 还解决不了，把**你执行的命令**和**完整的报错**截图，发给别人求助（或问 AI）。

---

## 第 1 章 认识这个项目

### 1.1 这个程序是什么

一个**待办清单网站**：

- 输入要做的事，点「添加」
- 点 ⬜ 标记为完成（变成 ✅，文字加删除线），再点一次取消
- 点 ✕ 删除
- 点「清除已完成」一次删掉所有完成的事项
- 底部显示：共几项、已完成几项、未完成几项

和前两个项目一样，**只用 Node.js 自带的功能，不需要 `npm install` 安装任何东西**。

### 1.2 和前两个项目比，这次多学什么

| | hello-docker | guestbook 留言板 | **todo 待办清单（本项目）** |
|---|---|---|---|
| 端口 | 3000 | 3001 | **3002** |
| 数据 | 内存（重启丢失） | 数据卷（不丢） | 数据卷（不丢） |
| **自动测试** | ❌ | ❌ | ✅ **新！** 测试不通过就不部署 |
| **配置文件 .env** | ❌ | ❌ | ✅ **新！** 改网站标题不用改代码 |

**新知识点 1：自动测试**

测试 = 一段“检查代码对不对”的代码。比如：“添加一条待办后，列表里应该多一条”。

本项目有 9 个测试。每次 push 后，GitHub 会**先运行测试**：

- 全部通过 → 部署到服务器
- 有一个失败 → **停止，不部署**，服务器上还是原来好好的版本

这就像工厂的**质检**：不合格的产品不准出厂。专业团队几乎都这样做。

**新知识点 2：配置文件 .env**

网站标题“我的待办清单”这种**可能需要改的设置**，不写死在代码里，而是放在服务器上一个叫 `.env` 的配置文件里。想改标题，只要改这个文件，不需要改代码、不需要发新版本。

真实项目里，数据库密码、API 密钥等都是这样处理的：**写在 .env 里，绝对不上传到 GitHub**。

### 1.3 完整流程图

```
 💻 你的电脑                    🌐 GitHub                                    🖥️ 宝塔服务器
┌──────────────┐           ┌──────────────────────────────────────┐       ┌────────────────────┐
│ ① 改代码      │           │ ③ 保存代码                            │       │                    │
│ ② 本地测试    │──push────▶│ ④ Actions 启动                        │       │                    │
│   git commit │           │   ┌───────────┐     ┌──────────────┐  │       │ ⑥ 拉取最新代码       │
└──────────────┘           │   │ 第1关 test │ ──▶ │ 第2关 deploy  │──┼─SSH──▶│ ⑦ Docker 重新构建    │
                           │   │ 运行测试    │通过 │ 登录服务器     │  │       │ ⑧ 健康检查           │
                           │   └───────────┘     └──────────────┘  │       └────────────────────┘
                           │        │失败                           │                │
                           │        ▼                              │                ▼
                           │   ❌ 停止，不部署                       │      🌐 http://你的服务器IP:3002
                           └──────────────────────────────────────┘
```

**你只需要做 ① ②，然后 push。③ 到 ⑧ 全部自动完成。**

### 1.4 项目里每个文件是干什么的

```
1021_xx_2/
├── app/                         ← 程序代码都在这里
│   ├── server.js                ← 网站：处理网页请求、显示页面
│   ├── todos.js                 ← 业务逻辑：添加、完成、删除待办（被测试的代码）
│   ├── test/
│   │   └── todos.test.js        ← 自动测试：检查 todos.js 对不对
│   └── package.json             ← 程序信息，"version" 就是版本号
├── .github/
│   └── workflows/
│       └── deploy.yml           ← GitHub Actions：先测试，通过后自动部署
├── Dockerfile                   ← 怎么把程序打包成 Docker 镜像
├── docker-compose.yml           ← 怎么运行容器（端口 3002、数据卷、读取 .env）
├── deploy.sh                    ← 服务器上执行的部署脚本
├── .env.example                 ← 配置文件模板（会上传到 GitHub）
├── .dockerignore                ← 打包镜像时忽略哪些文件
├── .gitignore                   ← Git 不管哪些文件（.env、本地数据等）
├── .gitattributes               ← 统一换行符，防止 Windows 换行符让脚本在 Linux 上出错
└── README.md                    ← 本教程
```

日常更新时，**你主要改 `app/` 文件夹里的文件**，其他文件基本不用动。

### 1.5 程序提供的地址

| 地址 | 作用 |
|---|---|
| `/` | 待办清单首页 |
| `/health` | 健康检查：返回运行状态、版本号、待办数量 |
| `/api/todos` | 所有待办的 JSON 数据和统计 |

### 1.6 名词小词典

看不懂某个词时回来查：

| 名词 | 通俗解释 |
|---|---|
| **Git** | 版本管理工具。像游戏存档：每次 commit 就是存一次档，随时能读档回去 |
| **仓库（repository / repo）** | 一个项目的全部代码 + 历史记录。本地一份，GitHub 上一份 |
| **提交（commit）** | 存一次档，记录“这次改了什么” |
| **推送（push）** | 把本地的存档上传到 GitHub |
| **拉取（pull）** | 把 GitHub 上的新存档下载到本地 |
| **标签（tag）** | 给某次存档起个名字，比如 `v1.1.0`，方便以后找到 |
| **main 分支** | 主线代码。本项目约定：main 上的代码 = 服务器上运行的代码 |
| **GitHub** | 存放代码的网站 |
| **GitHub Actions** | GitHub 的“自动化机器人”，push 后自动测试、自动部署 |
| **job（任务）** | Actions 里的一个步骤组。本项目有两个：`test`（测试）和 `deploy`（部署） |
| **Secrets** | GitHub 仓库的“保险箱”，存服务器 IP、登录密钥等敏感信息 |
| **自动测试** | 用代码检查代码。运行 `node --test` 就会自动执行所有检查 |
| **环境变量** | 程序启动时从外部传进来的设置，比如 `APP_TITLE=我的待办清单` |
| **.env 文件** | 存放环境变量的文本文件，每行一个 `名字=值` |
| **Docker 镜像** | 打包好的程序“安装包”（系统 + Node.js + 你的代码） |
| **Docker 容器** | 镜像运行起来的实例，就是正在跑的程序 |
| **数据卷（volume）** | 容器外面的一块存储空间，待办数据存在这里，换容器也不丢 |
| **部署** | 把新代码放到服务器上运行起来 |
| **回滚** | 新版本有问题，退回到旧版本 |

---

## 第 2 章 进度检查清单

每完成一项就在心里打个勾，下次接着从没完成的地方做：

**本地开发**
- [x] 本地已安装 Node.js 和 Git（前两个项目时已装好）
- [x] 项目代码已写好，本地第一次提交已完成
- [ ] 安装 VS Code（第 3 章）
- [ ] 本地运行程序和测试（第 4 章）

**一次性准备**
- [ ] 在 GitHub 创建 `todo` 仓库并推送（第 6 章）
- [ ] 服务器放行 3002 端口（第 7 章）
- [ ] 服务器第一次手动部署成功（第 8 章）
- [ ] 配置 Secrets，Actions 运行成功（第 9 章）

**日常使用练习**
- [ ] 完成一次版本更新 v1.0.0 → v1.1.0（第 10 章）
- [ ] 亲眼看到测试拦住有 bug 的代码（第 11 章）
- [ ] 通过 .env 修改网站标题（第 12 章）
- [ ] 练习一次回滚（第 14 章）

---

# 第二部分：本地开发

## 第 3 章 准备本地工具：VS Code

改代码需要编辑器。Windows 记事本也能改，但容易出编码、换行符的问题。**强烈推荐 VS Code**：免费，专业开发者最常用。

> 如果已经装好了 VS Code，跳到 [3.3](#33-用-vs-code-打开项目)。

### 3.1 安装 VS Code

**方法一（推荐）**：💻 本地，打开 PowerShell（按 `Win` 键，搜索 “PowerShell”，点击打开），执行：

```bash
winget install --id Microsoft.VisualStudioCode -e
```

✅ 最后显示“已成功安装”即可。

**方法二**：🌐 打开 <https://code.visualstudio.com/>，点 **Download for Windows** 下载并安装。安装过程中建议勾选：
- ☑ 添加到 PATH
- ☑ 将“通过 Code 打开”操作添加到 Windows 资源管理器目录上下文菜单

安装后**关闭所有 PowerShell 窗口再重新打开**，新程序才会生效。

### 3.2 安装中文语言包（可选）

1. 打开 VS Code。
2. 按 `Ctrl + Shift + X` 打开左侧扩展面板。
3. 搜索框输入 `Chinese`。
4. 找到 **Chinese (Simplified) (简体中文) Language Pack**，点 **Install**。
5. 右下角提示重启，点 **Change Language and Restart**。

### 3.3 用 VS Code 打开项目

1. VS Code 菜单：**文件** → **打开文件夹**。
2. 找到并选中 `C:\CODE\1021_xx_2`，点 **选择文件夹**。
3. 如果弹出“是否信任此文件夹中的文件的作者”，点 **是，我信任此作者**。
4. 左侧出现项目文件列表，就打开成功了。

> 💡 也可以在资源管理器里，右键 `1021_xx_2` 文件夹 → **通过 Code 打开**。

### 3.4 打开 VS Code 里的终端

本教程所有 💻 本地命令，都在这里执行：

1. 菜单：**终端** → **新建终端**（快捷键 `` Ctrl + ` ``，就是键盘左上角数字 1 左边的那个键）。
2. 窗口下方出现终端面板，显示：

```
PS C:\CODE\1021_xx_2>
```

✅ **一定要确认路径是 `C:\CODE\1021_xx_2`**。

❌ 如果路径不对，执行：

```bash
cd C:\CODE\1021_xx_2
```

> ⚠️ **每次执行 git 命令前，先看一眼终端左边的路径。** 你现在有 3 个项目，在错误的文件夹里执行 git 命令，会把代码提交到别的项目里去。

---

## 第 4 章 在本地运行程序和测试

### 4.1 运行程序

💻 本地（VS Code 终端）：

```bash
node app/server.js
```

✅ 看到下面这行说明启动成功：

```
[todo] v1.0.0 已启动：http://localhost:3000  标题=我的待办清单  数据文件=C:\CODE\1021_xx_2\app\data\todos.json
```

这行告诉你：版本 v1.0.0、访问地址、当前标题、数据存在哪个文件。

❌ 如果看到 `Error: listen EADDRINUSE: address already in use :::3000`：说明 3000 端口被占用了（可能是前两个项目的程序还开着）。找到那个终端按 `Ctrl + C` 关掉，再重新执行。

### 4.2 在浏览器里试用

🌐 打开 <http://localhost:3000>，试试所有功能：

- [ ] 输入“买牛奶”，点「添加」→ 出现在列表里
- [ ] 再添加“写作业”→ 新的出现在**最上面**
- [ ] 点“买牛奶”前面的 ⬜ → 变成 ✅，文字变灰并加删除线
- [ ] 再点一次 ✅ → 变回 ⬜
- [ ] 什么都不输入，直接点「添加」→ 浏览器会提示“请填写此字段”
- [ ] 只输入几个空格，点「添加」→ 页面显示红字“⚠️ 内容不能为空”
- [ ] 点某一项右边的 ✕ → 删除
- [ ] 把一项标记完成，点「清除已完成」→ 完成的那项消失
- [ ] 底部统计数字正确

再打开 <http://localhost:3000/health>，看到：

```json
{
  "status": "ok",
  "version": "1.0.0",
  "todos": 2
}
```

**停止程序**：回到终端，按 `Ctrl + C`。

> 💡 本地端口是 **3000**，服务器上对外的端口是 **3002**，别搞混。
> 💡 本地数据存在 `app/data/todos.json`，这个文件被 `.gitignore` 忽略了，不会上传到 GitHub，也不会影响服务器上的数据。

### 4.3 运行自动测试

💻 本地：

```bash
node --test app/test/todos.test.js
```

✅ 期望看到（括号里的毫秒数每次不同，不用管）：

```
✔ validateTitle：正常内容通过，并去掉首尾空格 (3.718ms)
✔ validateTitle：空内容不通过 (0.1629ms)
✔ validateTitle：超过最大长度不通过 (0.1721ms)
✔ addTodo：新待办放在最前面，默认未完成 (2.8699ms)
✔ addTodo：不修改原来的列表 (0.2431ms)
✔ addTodo：内容为空时抛出错误 (1.2382ms)
✔ toggleTodo：切换完成状态 (0.5429ms)
✔ removeTodo：删除指定的待办 (0.2455ms)
✔ clearDone 和 stats：清除已完成并正确统计 (5.6801ms)
ℹ tests 9
ℹ suites 0
ℹ pass 9
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 210.3975
```

**怎么看懂：**

| 输出 | 意思 |
|---|---|
| `✔ 测试名字` | 这个测试通过了（绿色） |
| `✖ 测试名字` | 这个测试**失败**了（红色） |
| `ℹ tests 9` | 一共 9 个测试 |
| `ℹ pass 9` | 通过 9 个 |
| `ℹ fail 0` | 失败 0 个 ← **最重要的就是看这个，必须是 0** |

> 💡 这和 GitHub Actions 第 1 关执行的是**同一条命令**。所以：**本地测试通过，GitHub 上基本也会通过**。养成习惯：push 之前先在本地跑一遍测试。

### 4.4 用环境变量改标题（本地体验）

程序的标题是从环境变量 `APP_TITLE` 读取的。在本地试一下：

💻 本地，先设置环境变量（只对当前这个终端窗口有效）：

```bash
$env:APP_TITLE = "小明的待办"
```

再启动程序：

```bash
node app/server.js
```

✅ 启动日志变成了 `标题=小明的待办`，刷新浏览器，标题也变了。代码一个字都没改！

`Ctrl + C` 停止后，清除这个环境变量，恢复默认标题：

```bash
Remove-Item Env:APP_TITLE
```

> 💡 在服务器上，我们不用这种命令，而是把设置写进 `.env` 文件（第 12 章），效果一样，而且重启后也不会丢。

---

## 第 5 章 代码导读：每个文件在做什么

> 这一章帮你看懂代码。不看也不影响后面的操作，但**强烈建议看一遍**，后面改代码时会更有把握。

### 5.1 为什么分成 todos.js 和 server.js 两个文件？

```
浏览器 ──请求──▶ server.js（接待员：接收请求、显示网页、读写文件）
                    │
                    │ 调用
                    ▼
                 todos.js（业务专家：只管“待办”这件事的规则）
                    ▲
                    │ 检查
               todos.test.js（质检员：自动检查 todos.js 有没有出错）
```

把“规则”单独放在 `todos.js` 里，测试就很好写：不用启动网站，直接调用函数检查结果对不对。这是写可测试代码的常见做法。

### 5.2 todos.js：业务规则

用 VS Code 打开 `app/todos.js`，里面有这些函数：

| 函数 | 作用 | 例子 |
|---|---|---|
| `validateTitle(title)` | 检查内容是否合法（不能为空、不超过 50 字） | `validateTitle('  买牛奶 ')` → `{ ok: true, value: '买牛奶' }` |
| `addTodo(list, title)` | 添加一条待办，放在最前面 | |
| `toggleTodo(list, id)` | 切换完成 / 未完成 | |
| `removeTodo(list, id)` | 删除一条 | |
| `clearDone(list)` | 清除所有已完成的 | |
| `stats(list)` | 统计总数、已完成、未完成 | `{ total: 3, done: 1, left: 2 }` |

每条待办在程序里长这样：

```json
{
  "id": "mh0k2x9a3f1z",
  "title": "买牛奶",
  "done": false,
  "createdAt": "2026-10-21T05:30:00.000Z"
}
```

| 字段 | 意思 |
|---|---|
| `id` | 唯一编号，自动生成 |
| `title` | 待办内容 |
| `done` | 是否完成：`false` 未完成，`true` 已完成 |
| `createdAt` | 创建时间（国际标准时间，比北京时间慢 8 小时） |

### 5.3 todos.test.js：自动测试

打开 `app/test/todos.test.js`，看其中一个测试：

```js
test('toggleTodo：切换完成状态', () => {
  let list = todos.addTodo([], '写作业');        // 准备：创建一条待办
  const id = list[0].id;
  list = todos.toggleTodo(list, id);             // 执行：切换一次
  assert.strictEqual(list[0].done, true);        // 检查：应该变成已完成
  list = todos.toggleTodo(list, id);             // 执行：再切换一次
  assert.strictEqual(list[0].done, false);       // 检查：应该变回未完成
});
```

每个测试都是这三步：**准备 → 执行 → 检查**。

`assert.strictEqual(实际值, 期望值)` 的意思是：“我断定实际值等于期望值”。如果不相等，测试就失败，并告诉你实际是多少、期望是多少。

### 5.4 server.js：网站

打开 `app/server.js`，主要分为几块：

| 位置 | 作用 |
|---|---|
| 开头 `const APP_TITLE = process.env.APP_TITLE \|\| '我的待办清单'` | 从环境变量读标题，没有就用默认值 |
| `load()` / `save()` | 从 JSON 文件读取 / 保存待办 |
| `escapeHtml()` | 把用户输入里的 `<` `>` 等符号转义，防止有人输入恶意代码（XSS 攻击） |
| `renderHome()` | 生成首页的 HTML（网页长什么样就在这里改） |
| `http.createServer(...)` | 根据访问的地址，决定做什么（显示首页 / 添加 / 删除……） |
| 结尾 `shutdown()` | 收到停止信号时优雅退出 |

### 5.5 docker-compose.yml：怎么运行

```yaml
services:
  app:
    build: .                                    # 用当前目录的 Dockerfile 打包镜像
    image: todo:latest                          # 镜像名
    container_name: todo                        # 容器名
    ports:
      - "3002:3000"                             # 服务器 3002 端口 → 容器 3000 端口
    environment:
      - TZ=Asia/Shanghai                        # 时区：北京时间
      - PORT=3000
      - APP_TITLE=${APP_TITLE:-我的待办清单}       # 从 .env 读取标题，没有就用默认值
    volumes:
      - todo-data:/app/data                     # 数据卷：数据存在容器外面
    restart: always                             # 崩溃或服务器重启后自动启动
```

`${APP_TITLE:-我的待办清单}` 的意思是：如果 `.env` 文件里有 `APP_TITLE`，就用它的值；没有就用“我的待办清单”。

### 5.6 .github/workflows/deploy.yml：自动化流程

```yaml
jobs:
  test:                                         # 第 1 关：测试
    steps:
      - uses: actions/checkout@v4               #   下载你的代码
      - uses: actions/setup-node@v4             #   安装 Node.js 20
      - run: node --test app/test/todos.test.js #   运行测试

  deploy:                                       # 第 2 关：部署
    needs: test                                 #   ← 关键！必须等 test 成功才执行
    steps:
      - uses: appleboy/ssh-action@v1.2.0        #   SSH 登录服务器
        script: |
          cd /www/wwwroot/todo
          bash deploy.sh                        #   执行部署脚本
```

`needs: test` 就是“质检关卡”：test 失败，deploy 根本不会运行。

---

# 第三部分：一次性准备（只做一次）

## 第 6 章 推送到 GitHub

### 6.1 确认本地仓库状态

💻 本地（确认路径是 `C:\CODE\1021_xx_2`）：

```bash
git status
```

✅ 期望看到：

```
On branch main
nothing to commit, working tree clean
```

意思是：在 main 分支，所有文件都已经提交了（我已经帮你完成了第一次提交）。

查看提交记录：

```bash
git log --oneline
```

✅ 能看到一条：`xxxxxxx feat: 初始化 todo 待办清单项目`（前面的编号每个人不同）。

### 6.2 确认 GitHub SSH 连接正常

💻 本地：

```bash
ssh -T git@github.com
```

✅ 期望看到：

```
Hi bbb678777-byte! You've successfully authenticated, but GitHub does not provide shell access.
```

> 💡 前两个项目已经配好了 SSH 密钥，所以这里应该直接成功。

### 6.3 在 GitHub 创建新仓库

1. 🌐 打开 <https://github.com>，确认已登录。
2. 点右上角的 **+** 号 → **New repository**。
3. 填写：
   - **Repository name**：`todo`
   - **Description**（可选）：`待办清单 - 学习 Git + Docker + 自动测试`
   - 选 **Public**（公开，最简单，推荐）或 **Private**（私有，需要多做第 7.4 节）
4. ⚠️ 下面这三项**都不要勾选 / 不要选**：
   - ☐ Add a README file
   - .gitignore：None
   - License：None

   （本地已经有这些文件了，勾了会和本地冲突，导致推送失败。）
5. 点绿色按钮 **Create repository**。

✅ 创建成功后，页面上会显示 “Quick setup” 和一个地址，类似 `git@github.com:bbb678777-byte/todo.git`。确认上方选中的是 **SSH**（不是 HTTPS）。

### 6.4 关联远程仓库

💻 本地：

```bash
git remote add origin git@github.com:bbb678777-byte/todo.git
```

这条命令执行后**没有输出**，是正常的。确认一下：

```bash
git remote -v
```

✅ 期望看到：

```
origin  git@github.com:bbb678777-byte/todo.git (fetch)
origin  git@github.com:bbb678777-byte/todo.git (push)
```

❌ 如果报错 `error: remote origin already exists.`：说明已经关联过了，用下面这条改成正确的地址：

```bash
git remote set-url origin git@github.com:bbb678777-byte/todo.git
```

### 6.5 第一次推送

💻 本地：

```bash
git push -u origin main
```

✅ 期望看到：

```
Enumerating objects: 18, done.
Counting objects: 100% (18/18), done.
Delta compression using up to 4 threads
Compressing objects: 100% (15/15), done.
Writing objects: 100% (18/18), 15.20 KiB | 1.52 MiB/s, done.
Total 18 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To github.com:bbb678777-byte/todo.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

| 输出 | 意思 |
|---|---|
| `* [new branch] main -> main` | GitHub 上创建了 main 分支，代码上传成功 |
| `branch 'main' set up to track 'origin/main'` | 本地和远程关联好了，**以后直接 `git push` 就行** |

🌐 刷新 GitHub 仓库页面，能看到所有文件了，下面还会显示这份 README 教程。

### 6.6 第一次 Actions 会失败——这是正常的

🌐 点仓库顶部的 **Actions** 标签，会看到一条运行记录。点进去，你会看到：

- `test` ✅ 成功（测试通过了）
- `deploy` ❌ 失败（因为还没配置服务器信息）

**这是正常的**，第 9 章配好后就会成功。现在先不用管它。

---

## 第 7 章 服务器准备

> ⚠️ **本章所有命令都在 🖥️ 服务器上执行！**
> 打开方式：🌐 浏览器登录宝塔面板 → 左侧菜单点 **终端**。

### 7.1 确认 Git 和 Docker 都装好了

🖥️ 服务器：

```bash
git --version
```

✅ 显示类似 `git version 2.x.x`。

```bash
docker compose version
```

✅ 显示类似 `Docker Compose version v2.x.x`。

> 💡 前两个项目已经在这台服务器上部署过，这两个应该都没问题。
> 如果 `docker compose version` 报错，试试 `docker-compose version`，有一个能用就行。

### 7.2 确认 3002 端口没被占用

🖥️ 服务器：

```bash
ss -lntp | grep 3002
```

✅ **什么都不显示** = 3002 没被占用，可以用。

❌ 如果显示了内容，说明 3002 被别的程序占用了，见 [16.3 端口被占用](#163-部署和服务器相关)。

### 7.3 放行 3002 端口（两个地方都要开！）

外网访问服务器要经过**两道门**，任何一道没开都打不开网页：

```
浏览器 ──▶ 第 1 道门：云厂商安全组 ──▶ 第 2 道门：宝塔防火墙 ──▶ Docker 容器
```

**第 1 道门：宝塔防火墙**

1. 🌐 宝塔面板左侧 → **安全**。
2. 点 **添加端口规则**（有的版本叫“放行端口”）。
3. 填写：端口 `3002`，协议 `TCP`，备注 `todo`。
4. 点 **确定**。
5. ✅ 列表里出现 3002 这一行。

**第 2 道门：云厂商安全组**

1. 🌐 登录你买服务器的平台（阿里云 / 腾讯云 / 华为云等）的控制台。
2. 找到这台服务器（叫“云服务器 ECS”或“轻量应用服务器”）。
3. 进入 **安全组**（轻量应用服务器叫 **防火墙**）。
4. 点 **添加规则**，方向选 **入方向**：
   - 协议：`TCP`
   - 端口：`3002`
   - 来源（授权对象）：`0.0.0.0/0`
   - 备注：`todo`
5. 保存。

> 💡 前两个项目时你开过 3000 和 3001，这次一样的操作，只是端口换成 3002。

### 7.4 私有仓库才需要：配置 Deploy Key

**先确认你的仓库是公开还是私有**：🌐 打开 `https://github.com/bbb678777-byte/todo`，看仓库名旁边：

- 显示 **Public** → **跳过本节**，直接看第 8 章。
- 显示 **Private** → 继续往下做。

**为什么私有仓库要配？** 私有仓库只有你能看，服务器默认没有权限下载。Deploy Key 是一把**只能读取这一个仓库**的专用钥匙，给服务器用。

> ⚠️ GitHub 规定**一把 Deploy Key 只能用在一个仓库**。前两个项目用过的钥匙不能再用，要为 todo 新生成一把。

**第 1 步**：🖥️ 服务器生成钥匙：

```bash
ssh-keygen -t ed25519 -C "deploy-key-todo" -f ~/.ssh/github_deploy_todo -N ""
```

✅ 看到 `Your identification has been saved in /root/.ssh/github_deploy_todo` 和一个由符号组成的图案，就成功了。

**第 2 步**：🖥️ 服务器显示公钥：

```bash
cat ~/.ssh/github_deploy_todo.pub
```

输出一行以 `ssh-ed25519` 开头、以 `deploy-key-todo` 结尾的内容，**整行复制**。

**第 3 步**：🌐 打开 todo 仓库页面 → 顶部 **Settings** → 左侧 **Deploy keys** → 右上角 **Add deploy key**：
- **Title**：`server`
- **Key**：粘贴刚才复制的整行
- ☐ **不要**勾选 “Allow write access”（服务器只需要读取）
- 点 **Add key**

**第 4 步**：🖥️ 服务器，告诉 SSH“访问别名 `github-todo` 时用这把钥匙”。**下面整段一起复制，一次粘贴执行**：

```bash
cat >> ~/.ssh/config <<'EOF'
Host github-todo
    HostName github.com
    User git
    IdentityFile ~/.ssh/github_deploy_todo
    IdentitiesOnly yes
EOF
```

```bash
chmod 600 ~/.ssh/config
```

**第 5 步**：🖥️ 服务器测试：

```bash
ssh -T git@github-todo
```

第一次会问 `Are you sure you want to continue connecting (yes/no/[fingerprint])?`，输入 `yes` 回车。

✅ 看到 `Hi bbb678777-byte/todo! You've successfully authenticated, but GitHub does not provide shell access.` 就成功了。注意这里显示的是**仓库名** `bbb678777-byte/todo`，说明用的是 Deploy Key。

---

## 第 8 章 第一次手动部署

### 8.1 下载代码到服务器

🖥️ 服务器，**公开仓库**执行这条：

```bash
git clone https://github.com/bbb678777-byte/todo.git /www/wwwroot/todo
```

**私有仓库**执行这条（注意地址里是 `github-todo`，就是 7.4 配置的别名）：

```bash
git clone git@github-todo:bbb678777-byte/todo.git /www/wwwroot/todo
```

✅ 期望看到：

```
Cloning into '/www/wwwroot/todo'...
...
Receiving objects: 100% (18/18), done.
```

❌ 如果报错 `fatal: destination path '/www/wwwroot/todo' already exists and is not an empty directory.`：说明这个目录已经存在了。如果是之前失败留下的，可以删掉重来（⚠️ 确认里面没有重要文件）：

```bash
rm -rf /www/wwwroot/todo
```

### 8.2 进入项目目录

🖥️ 服务器：

```bash
cd /www/wwwroot/todo
```

看看下载下来的文件：

```bash
ls -la
```

✅ 能看到 `app`、`Dockerfile`、`docker-compose.yml`、`deploy.sh`、`.env.example` 等文件。

### 8.3 执行部署脚本

🖥️ 服务器：

```bash
bash deploy.sh
```

第一次执行需要构建镜像，大约 10 秒～1 分钟。✅ 期望看到类似这样的输出：

```
[deploy 2026-10-21 14:00:00] 使用 compose 命令：docker compose
[deploy 2026-10-21 14:00:00] git fetch --all --tags
[deploy 2026-10-21 14:00:01] 切换到目标版本：origin/main
HEAD is now at a1b2c3d feat: 初始化 todo 待办清单项目
[deploy 2026-10-21 14:00:01] 当前提交：a1b2c3d feat: 初始化 todo 待办清单项目 (...)
[deploy 2026-10-21 14:00:01] 已从 .env.example 创建 .env 配置文件，可以按需修改
[deploy 2026-10-21 14:00:01] docker compose up -d --build
 ...（构建镜像的输出）...
 ✔ Container todo  Started
[deploy 2026-10-21 14:00:15] 健康检查：http://127.0.0.1:3002/health
  第 1/15 次检查未通过，2 秒后重试...
[deploy 2026-10-21 14:00:17] ✓ 第 2 次检查通过：{"status":"ok","version":"1.0.0","todos":0}
[deploy 2026-10-21 14:00:17] ✓ 部署成功！
```

> 💡 “第 1/15 次检查未通过”是正常的：容器刚启动需要一两秒，脚本会自动重试。只要最后是 `✓ 部署成功！` 就行。
> 💡 注意中间那行“**已从 .env.example 创建 .env 配置文件**”：第一次部署时，脚本自动帮你创建了配置文件。第 12 章会教你怎么修改它。

### 8.4 deploy.sh 做了什么

| 步骤 | 做的事 | 说明 |
|---|---|---|
| 1 | 检测 `docker compose` 或 `docker-compose` | 兼容新旧版本 Docker |
| 2 | `git fetch --all --tags` | 从 GitHub 下载最新代码和标签 |
| 3 | `git reset --hard origin/main` | 让服务器代码和 GitHub 的 main 完全一样 |
| 4 | 没有 `.env` 就从 `.env.example` 复制一份 | 已有的 `.env` 不会被覆盖 |
| 5 | `docker compose up -d --build` | 重新打包镜像，用新容器替换旧容器 |
| 6 | `curl /health`（最多 15 次） | 确认新版本真的跑起来了 |
| 7 | `docker image prune -f` | 删除旧镜像，释放磁盘 |
| 失败时 | 打印容器日志 | 返回失败，Actions 会显示红叉 |

### 8.5 验证

🖥️ 服务器，查看容器状态：

```bash
docker ps --filter name=todo
```

✅ STATUS 一列显示 `Up xx seconds (healthy)`（刚启动的 30 秒内可能显示 `health: starting`，等一会儿再看）。

🌐 浏览器打开 `http://你的服务器IP:3002`：

✅ 看到待办清单页面，标题下面显示 `版本 v1.0.0 · 主机 xxxxxxxxxxxx`。添加几条待办试试。

❌ 打不开？按顺序检查：

1. 🖥️ 服务器本机能访问吗？

```bash
curl http://127.0.0.1:3002/health
```

2. 本机能访问（返回了 JSON）但浏览器打不开 → **端口没放行**，回去检查 7.3 的**两道门**。
3. 本机也访问不了 → 看日志找原因：

```bash
docker logs --tail 50 todo
```

### 8.6 在宝塔面板里看看

🌐 宝塔面板左侧 → **Docker**：

- **容器**：能看到 `todo`，状态运行中。点“日志”可以看程序输出。
- **镜像**：能看到 `todo:latest`。
- **存储卷**（或“卷”）：能看到 `todo_todo-data`，这就是存待办数据的地方。

> ⚠️ 宝塔面板适合用来**看**（状态、日志）和**临时操作**（重启）。**不要在面板里修改容器配置**，改了也会在下次部署时被覆盖。想改配置就改代码或 `.env`。

---

## 第 9 章 配置 GitHub Actions 自动测试 + 自动部署

### 9.1 原理

```
你 git push
    │
    ▼
GitHub 启动临时电脑
    │
    ├─▶ 第 1 关 test：下载代码 → 安装 Node.js → 运行测试
    │       │
    │       ├── 失败 ❌ → 停止，不部署
    │       │
    │       ▼ 通过 ✅
    └─▶ 第 2 关 deploy：用 Secrets 里的钥匙 SSH 登录服务器 → 执行 bash deploy.sh
```

第 2 关需要登录你的服务器，要知道 4 样东西，存在仓库的 **Secrets（保险箱）** 里：

| Secret 名字 | 填什么 |
|---|---|
| `SERVER_HOST` | 服务器公网 IP |
| `SERVER_USER` | 登录用户，一般是 `root` |
| `SERVER_SSH_KEY` | 服务器上 `~/.ssh/github_actions` 私钥文件的**全部内容** |
| `SERVER_PORT` | SSH 端口，**是 22 就不用填** |

> 💡 **Secrets 是每个仓库各自一份的。** 你在 guestbook 仓库填过，但 todo 是新仓库，看不到那边的，所以要再填一遍。**填的值和 guestbook 完全一样**就行（同一台服务器、同一把钥匙）。

### 9.2 在服务器上拿到私钥

🖥️ 服务器，先检查钥匙是否已经存在：

```bash
ls ~/.ssh/github_actions
```

**情况 A**：显示 `/root/.ssh/github_actions` → 钥匙已经有了（配 guestbook 时生成过），**跳到下面“显示私钥”**。

**情况 B**：显示 `No such file or directory` → 还没生成过，依次执行这 3 条：

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions -N ""
```

```bash
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
```

```bash
chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys
```

（第 1 条生成一对钥匙；第 2 条把公钥加入“允许登录这台服务器”的名单；第 3 条设置正确的文件权限，权限不对 SSH 会拒绝使用。）

**显示私钥**：

```bash
cat ~/.ssh/github_actions
```

输出类似：

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACBhY2NvdW50LWtleS1leGFtcGxlLW5vdC1yZWFsAAAAAAAAAAAAAAAAAAAA
......（中间若干行）......
-----END OPENSSH PRIVATE KEY-----
```

用鼠标选中**从 `-----BEGIN` 那一行开始，到 `-----END OPENSSH PRIVATE KEY-----` 那一行结束**的全部内容，复制。

> ⚠️ **头尾两行都要复制**，少一个字符都会失败。
> ⚠️ 私钥相当于服务器的登录密码，**只能填进 GitHub Secrets**，不要发给任何人、不要写进代码。

再确认一下：🌐 宝塔面板 → **安全** → **SSH 管理**（或“SSH 设置”）→ **SSH 密钥登录** 是**开启**状态。

### 9.3 在 GitHub 里添加 Secrets

1. 🌐 打开 `https://github.com/bbb678777-byte/todo`。
2. 点仓库页面**顶部那一排**（Code、Issues、Pull requests、Actions……）最右边的 **⚙ Settings**。
   ⚠️ 不是右上角头像菜单里的 Settings！
3. 左侧菜单往下找到 **Secrets and variables**，点开，再点下面的 **Actions**。
4. 页面上有 **Secrets** 和 **Variables** 两个标签，确认在 **Secrets** 标签下。
5. 点绿色按钮 **New repository secret**。

**添加第 1 个：**
- **Name**：`SERVER_HOST`
- **Secret**：你的服务器公网 IP，例如 `1.2.3.4`
  （只填 IP，**不要**加 `http://`，**不要**加端口号）
- 点 **Add secret**

**添加第 2 个：**再点 **New repository secret**
- **Name**：`SERVER_USER`
- **Secret**：`root`
- 点 **Add secret**

**添加第 3 个：**再点 **New repository secret**
- **Name**：`SERVER_SSH_KEY`
- **Secret**：粘贴 9.2 复制的完整私钥
- 点 **Add secret**

**添加第 4 个（只有 SSH 端口不是 22 才需要）：**

先确认端口：🌐 宝塔 → **安全** → **SSH 管理**，看“SSH 端口”。是 `22` 就**跳过**；不是 22 才添加：
- **Name**：`SERVER_PORT`
- **Secret**：你的 SSH 端口号，例如 `22222`

✅ 完成后，Repository secrets 列表里应该有：

```
SERVER_HOST
SERVER_SSH_KEY
SERVER_USER
（SERVER_PORT，可选）
```

**注意事项：**
- **名字必须一字不差**：全大写、单词之间是下划线 `_`。写成 `SERVER_IP`、`server_host`、`SERVER-HOST` 都读不到。
- 保存后**谁都看不到内容**（包括你自己），这是正常的。填错了就点名字右边的 ✏️ 铅笔图标重新填。
- 值的前后不要有多余的空格。

### 9.4 手动运行一次，测试配置

1. 🌐 仓库页面顶部点 **Actions**。
2. 左侧列表点 **Deploy**。
3. 右边出现一行蓝色提示 “This workflow has a workflow_dispatch event trigger.”，旁边有 **Run workflow** 下拉按钮，点它。
4. 弹出小窗口，Branch 保持 `main`，点绿色的 **Run workflow**。
5. 等几秒，列表最上面出现一条新记录（🟡 黄色圆圈 = 正在运行），点进去。

**看懂运行页面：**

页面中间有一张流程图，两个方框用箭头连着：

```
┌──────────┐      ┌──────────┐
│  ✅ test  │ ───▶ │ ✅ deploy │
└──────────┘      └──────────┘
```

- `test` 先运行，变绿后 `deploy` 才开始。
- 点 `test` 方框 → 展开 **运行自动测试**，能看到和本地一样的 `✔ ...` 测试结果。
- 点 `deploy` 方框 → 展开 **SSH 到服务器执行部署**，能看到服务器上 `deploy.sh` 的输出。

✅ **两个都是绿色对勾**，`deploy` 日志最后有 `✓ 部署成功！` → **配置完成！** 🎉

从此以后，每次 `git push` 到 main，都会**自动测试 + 自动部署**。

### 9.5 失败了怎么办

先看是哪一关失败：

**`test` 失败 ❌**（这时 `deploy` 会显示灰色的 ⊘ skipped = 跳过）

→ 代码有问题。点进 `test` 看哪个测试失败了，在本地运行 `node --test app/test/todos.test.js` 复现并修复。详见第 11 章。

**`test` 成功、`deploy` 失败 ❌**

→ 服务器连接或部署的问题。展开 deploy 日志，对照下表：

| 日志里的报错 | 原因 | 解决 |
|---|---|---|
| `missing server host` | `SERVER_HOST` 没填或名字写错 | 检查 Secrets 名字是否一字不差 |
| `ssh: handshake failed: ssh: unable to authenticate` | 私钥不对 / 公钥没加入 authorized_keys / 宝塔关了密钥登录 | 重新 `cat ~/.ssh/github_actions` 完整复制，覆盖 `SERVER_SSH_KEY`；确认执行过 9.2 情况 B 的第 2、3 条；开启宝塔 SSH 密钥登录 |
| `ssh: no key found` | 私钥复制不完整 | 重新复制，头尾两行都要有 |
| `dial tcp ...: i/o timeout` | SSH 端口不对，或被防火墙挡住 | 端口不是 22 要添加 `SERVER_PORT`；安全组放行 SSH 端口，来源 `0.0.0.0/0` |
| `cd: /www/wwwroot/todo: No such file or directory` | 服务器上还没下载代码 | 先完成第 8 章 |
| `健康检查失败` | 程序在服务器上启动失败 | 日志下面打印了容器日志，看具体报错；或 🖥️ 执行 `docker logs todo` |

修好后，点运行页面右上角的 **Re-run all jobs** 重新运行。

---

# 第四部分：日常使用（以后天天用）

## 第 10 章 ★ 更新版本：v1.0.0 → v1.1.0 完整实战

> **这是最重要的一章，也是以后每天都会用的流程。**
> 本章用一个真实的例子带你完整走一遍：给每条待办**显示添加时间**（比如 `10-21 14:30`），把版本从 **v1.0.0** 更新到 **v1.1.0**。
> 这次的修改会涉及**写代码 + 写测试**，正是专业团队的标准做法。

### 10.1 一张图看懂更新流程

```
  💻 本地                                                     🌐 GitHub             🖥️ 服务器
 ────────────────────────────────────────────────────────    ─────────────         ──────────
  第 0 步  给当前版本打 v1.0.0 标签（只做一次）
  第 1 步  记录更新前的状态（截图）
  第 2 步  git pull               先同步最新代码
  第 3 步  改业务代码              app/todos.js
  第 4 步  写测试                  app/test/todos.test.js
  第 5 步  改网页                  app/server.js
  第 6 步  改版本号                app/package.json
  第 7 步  运行测试                node --test ...
  第 8 步  本地运行试用            node app/server.js
  第 9 步  git status             看改了哪些文件
  第 10 步 git diff               看具体改了什么
  第 11 步 git add .              挑选要提交的改动
  第 12 步 git commit             存档
  第 13 步 git tag                贴版本标签
  第 14 步 git push ─────────────────────────────────────▶  收到新代码
           git push --tags ──────────────────────────────▶  收到标签
                                                             test 第1关 ✅
                                                             deploy 第2关 ──SSH──▶ deploy.sh
  第 15 步 🌐 在 Actions 页面看进度                                                  重建容器
  第 16 步 🌐 刷新网页，确认新版本上线 ◀─────────────────────────────────────────── 新版本运行中
```

看起来步骤很多，第一次可能要 20 分钟。熟练之后，整个流程 3～5 分钟。

### 10.2 先了解：版本号怎么定

版本号格式是 **`主版本.次版本.修订号`**，比如 `1.0.0`。这套规则叫**语义化版本（SemVer）**，全世界的软件都这么用：

| 改了什么 | 哪一位 +1 | 例子 |
|---|---|---|
| 修 bug、改错别字、小调整 | 最后一位（修订号 PATCH） | `1.0.0` → `1.0.1` |
| 加新功能、改界面 | 中间一位（次版本 MINOR） | `1.0.1` → `1.1.0` |
| 大改版，和旧版不兼容 | 第一位（主版本 MAJOR） | `1.1.0` → `2.0.0` |

**规则：左边的数字加 1 时，右边的全部归零。**
- `1.2.5` 修 bug → `1.2.6`
- `1.2.5` 加功能 → `1.3.0`（不是 `1.3.5`）
- `1.2.5` 大改版 → `2.0.0`

Git 标签习惯在前面加个 `v`：版本 `1.1.0` 对应标签 `v1.1.0`。

**本次“显示添加时间”是新功能，所以：1.0.0 → 1.1.0。**

---

### 10.3 第 0 步：给当前版本打 v1.0.0 标签（只需做一次）

服务器上现在运行的是 1.0.0，但还没有贴标签。先补上——**以后新版本出问题，就能一键回到这里**。

💻 本地（确认路径是 `C:\CODE\1021_xx_2`）。

先确认没有未提交的改动：

```bash
git status
```

✅ 期望看到：

```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

❌ 如果看到有 `modified:` 的文件：说明你改过东西还没提交。如果是不小心改的，可以用 `git restore 文件名` 恢复；如果是想要的修改，先提交推送（参考第 13 章）。

打标签：

```bash
git tag -a v1.0.0 -m "首个版本：待办清单基础功能"
```

| 部分 | 意思 |
|---|---|
| `git tag` | 打标签 |
| `-a v1.0.0` | 标签名叫 v1.0.0（`-a` 表示“附注标签”，会记录谁、什么时候打的） |
| `-m "..."` | 标签的说明 |

没有输出是正常的。推送标签到 GitHub：

```bash
git push origin v1.0.0
```

✅ 期望看到：

```
To github.com:bbb678777-byte/todo.git
 * [new tag]         v1.0.0 -> v1.0.0
```

> 💡 只推送标签**不会**触发自动部署（Actions 只监听 main 分支的新提交），服务器不会有任何变化，放心。

---

### 10.4 第 1 步：记录更新前的状态

🌐 浏览器打开 `http://你的服务器IP:3002`：

1. **先添加 2～3 条待办**，把其中一条标记为完成（用来验证更新后数据还在）。
2. 记下（或截图）现在的样子：
   - 标题下面：`版本 v1.0.0 · 主机 a1b2c3d4e5f6`
   - 每条待办只有内容，**没有时间**
   - 底部：`共 3 项 · 已完成 1 · 未完成 2`

---

### 10.5 第 2 步：先同步最新代码

💻 本地：

```bash
git pull
```

✅ 期望看到：

```
Already up to date.
```

> 💡 **为什么每次开始前都要 pull？** 如果你在 GitHub 网页上改过文件、或在别的电脑上推送过，本地就不是最新的。不先 pull，后面 push 时会被拒绝。**养成习惯：开始干活前先 `git pull`。**

---

### 10.6 第 3 步：改业务代码 —— app/todos.js

我们要在 `todos.js` 里新增一个函数 `formatTime`，作用是把时间转成北京时间的 `月-日 时:分` 格式。

**① 打开文件**：VS Code 左侧文件列表 → 点开 `app` 文件夹 → 点 `todos.js`。

**② 找到位置**：按 `Ctrl + F` 打开搜索框，输入：

```
module.exports = {
```

按回车，光标会跳到这一行（大约第 68 行）。

**③ 插入新函数**：先复制下面这段代码，然后在 VS Code 里按 `Home` 键，把光标放到 `module.exports = {` 这一行的**最前面**（`m` 字母的左边），直接按 `Ctrl + V` 粘贴。新函数会出现在 `module.exports` 的上面：

```js
// 把时间转成北京时间，格式：月-日 时:分，例如 10-21 14:30
function formatTime(iso) {
  const d = new Date(new Date(iso).getTime() + 8 * 60 * 60 * 1000); // UTC 时间 + 8 小时 = 北京时间
  const pad = (n) => String(n).padStart(2, '0'); // 补零：5 → 05
  return `${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
}

```

**④ 导出新函数**：新函数要“导出”，别的文件（server.js 和测试）才能使用。往下看 `module.exports = {` 里面的列表，找到最后一项 `stats,`，在它**下面**加一行 `formatTime,`。

改完后，文件末尾这部分应该**完全是这样**：

```js
// 把时间转成北京时间，格式：月-日 时:分，例如 10-21 14:30
function formatTime(iso) {
  const d = new Date(new Date(iso).getTime() + 8 * 60 * 60 * 1000); // UTC 时间 + 8 小时 = 北京时间
  const pad = (n) => String(n).padStart(2, '0'); // 补零：5 → 05
  return `${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
}

module.exports = {
  MAX_TITLE_LENGTH,
  MAX_TODOS,
  validateTitle,
  addTodo,
  toggleTodo,
  removeTodo,
  clearDone,
  stats,
  formatTime,
};
```

**⑤ 保存**：按 `Ctrl + S`。

> 💡 **怎么确认保存了？** VS Code 顶部的文件标签，文件名右边如果是**白色圆点 ●** = 没保存；变成 **×** = 已保存。
> ⚠️ 代码里的符号都要是**英文半角**：括号 `()`、引号 `'`、反引号 `` ` ``（键盘左上角 `Esc` 下面那个键）、逗号 `,`、分号 `;`。中文符号会导致报错。直接复制粘贴最保险。

**这段代码在做什么？**（看不懂也没关系，先照着做）

| 代码 | 意思 |
|---|---|
| `new Date(iso).getTime()` | 把时间文字转成毫秒数 |
| `+ 8 * 60 * 60 * 1000` | 加 8 小时（8 × 60 分 × 60 秒 × 1000 毫秒），国际标准时间 → 北京时间 |
| `pad(n)` | 补零，让 `5` 变成 `05`，`10` 保持 `10` |
| `getUTCMonth() + 1` | 月份（程序里月份从 0 开始算，所以要 +1） |
| `` `${...}-${...} ${...}:${...}` `` | 拼成 `10-21 14:30` 这样的文字 |

---

### 10.7 第 4 步：写测试 —— app/test/todos.test.js

**新功能要配新测试**，这是专业开发的规矩。以后谁不小心改坏了 `formatTime`，测试会立刻发现。

**① 打开文件**：VS Code 左侧 → `app` → `test` → `todos.test.js`。

**② 跳到文件末尾**：按 `Ctrl + End`。

**③ 粘贴新测试**：光标已经在文件最末尾了，直接按 `Ctrl + V` 粘贴下面这段：

```js

test('formatTime：转换成北京时间', () => {
  assert.strictEqual(todos.formatTime('2026-10-21T06:30:00.000Z'), '10-21 14:30');
  assert.strictEqual(todos.formatTime('2026-10-21T18:05:00.000Z'), '10-22 02:05'); // 跨天
});
```

**④ 保存**：`Ctrl + S`。

**这个测试在检查什么？**

| 输入（国际标准时间） | 期望输出（北京时间） | 检查的是 |
|---|---|---|
| `2026-10-21T06:30:00.000Z`（早上 6:30） | `10-21 14:30` | 正常加 8 小时 |
| `2026-10-21T18:05:00.000Z`（晚上 18:05） | `10-22 02:05` | 加 8 小时后**跨到第二天**，日期也要变；分钟 `5` 要补零成 `05` |

> 💡 写测试时，要特别想想**容易出错的边界情况**，比如“跨天”“补零”。这些地方最容易写出 bug。

---

### 10.8 第 5 步：改网页 —— app/server.js

现在让网页把时间显示出来。要改两个地方。

**① 打开文件**：VS Code 左侧 → `app` → `server.js`。

**② 修改 A：显示时间**

按 `Ctrl + F`，搜索：

```
class="title"
```

会跳到这一行（大约第 84 行）：

```html
        <span class="title">${escapeHtml(t.title)}</span>
```

把光标放到这一行的**最末尾**，按 `回车` 新起一行，粘贴：

```html
        <span class="time">${todos.formatTime(t.createdAt)}</span>
```

改完后这一段应该是这样的（中间那行是新加的）：

```html
        <span class="title">${escapeHtml(t.title)}</span>
        <span class="time">${todos.formatTime(t.createdAt)}</span>
        <form method="POST" action="/todos/${t.id}/delete" class="inline">
```

**③ 修改 B：时间的样式（灰色小字）**

按 `Ctrl + F`，搜索：

```
li.done .title
```

会跳到这一行（大约第 113 行）：

```css
    li.done .title { color: #aaa; text-decoration: line-through; }
```

把光标放到这一行的**最末尾**，按 `回车`，粘贴：

```css
    li .time { color: #bbb; font-size: 12px; }
```

改完后是这样的：

```css
    li.done .title { color: #aaa; text-decoration: line-through; }
    li .time { color: #bbb; font-size: 12px; }
```

**④ 保存**：`Ctrl + S`。

> ⚠️ 前面的空格要和上下行对齐（虽然不对齐也能运行，但代码会不整齐）。
> ⚠️ 不要误删 `${` `}` 这些符号，它们是程序变量。

---

### 10.9 第 6 步：改版本号 —— app/package.json

**① 打开文件**：VS Code 左侧 → `app` → `package.json`。

**② 找到第 3 行**：

```json
  "version": "1.0.0",
```

**③ 改成**：

```json
  "version": "1.1.0",
```

**④ 保存**：`Ctrl + S`。

> ⚠️ 只改数字！**引号 `"` 和最后的逗号 `,` 都要保留**。少了任何一个，程序会因为 JSON 格式错误启动失败。
> 💡 网页上显示的版本号、`/health` 返回的版本号，都是程序从这里读的。**每次发版只改这一个地方。**

**到这里，4 个文件都改完了。** 检查一下 VS Code 顶部的标签，确认都没有白色圆点（都保存了）。

---

### 10.10 第 7 步：运行测试

**推送之前，先在本地跑测试。** 本地不通过的话，推上去 GitHub 也会失败。

💻 本地：

```bash
node --test app/test/todos.test.js
```

✅ 期望看到**10 个**测试全部通过（之前是 9 个，多了我们刚写的 formatTime）：

```
✔ validateTitle：正常内容通过，并去掉首尾空格 (1.2ms)
✔ validateTitle：空内容不通过 (0.2ms)
✔ validateTitle：超过最大长度不通过 (0.1ms)
✔ addTodo：新待办放在最前面，默认未完成 (2.5ms)
✔ addTodo：不修改原来的列表 (0.4ms)
✔ addTodo：内容为空时抛出错误 (0.9ms)
✔ toggleTodo：切换完成状态 (0.8ms)
✔ removeTodo：删除指定的待办 (0.8ms)
✔ clearDone 和 stats：清除已完成并正确统计 (1.3ms)
✔ formatTime：转换成北京时间 (0.4ms)
ℹ tests 10
ℹ suites 0
ℹ pass 10
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 162.6752
```

重点看：`tests 10`、`pass 10`、`fail 0`。

❌ **如果有测试失败（`✖`）**：

| 报错 | 原因 | 解决 |
|---|---|---|
| `TypeError: todos.formatTime is not a function` | 忘了在 `module.exports` 里加 `formatTime,` | 回到 10.6 第 ④ 步 |
| `actual: undefined` | 同上，或者函数名拼错了 | 检查 `formatTime` 拼写，大小写都要一样 |
| `SyntaxError: ...` 并指出某个文件的行号 | 那个文件有语法错误（少了括号、用了中文符号等） | 打开报错的文件，看那一行附近 |
| `'10-21 6:30' !== '10-21 14:30'` 这类 | 函数逻辑和教程不一样 | 重新复制 10.6 的代码 |

---

### 10.11 第 8 步：本地运行试用

测试只检查了 `todos.js`，网页的改动要自己用眼睛看。

💻 本地：

```bash
node app/server.js
```

✅ 启动日志版本变成 v1.1.0：

```
[todo] v1.1.0 已启动：http://localhost:3000  标题=我的待办清单  数据文件=C:\CODE\1021_xx_2\app\data\todos.json
```

🌐 打开 <http://localhost:3000>，检查：

- [ ] 标题下面显示 `版本 v1.1.0`
- [ ] 添加一条新待办，右边出现灰色小字时间，比如 `10-21 14:30`
- [ ] 时间是**现在的北京时间**（和电脑右下角的时间对一下）
- [ ] 标记完成、删除等原有功能都正常

全部正常后，回终端按 `Ctrl + C` 停止。

❌ 如果页面上显示 `undefined` 而不是时间：说明 `formatTime` 没导出，回到 10.6 第 ④ 步。
❌ 如果启动就报错：看报错信息里的文件名和行号，检查那一行。

> 💡 **改坏了不知道怎么修？** 可以把某个文件恢复成修改前的样子，重新改一遍：
> ```bash
> git restore app/server.js
> ```
> （把 `app/server.js` 换成你要恢复的文件。⚠️ 这个文件的所有修改都会丢失。）

---

### 10.12 第 9 步：git status —— 看看改了哪些文件

💻 本地：

```bash
git status
```

✅ 期望看到：

```
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   app/package.json
        modified:   app/server.js
        modified:   app/test/todos.test.js
        modified:   app/todos.js

no changes added to commit (use "git add" and/or "git commit -a")
```

**怎么看懂：**

| 输出 | 意思 |
|---|---|
| `On branch main` | 当前在 main 分支 |
| `Your branch is up to date with 'origin/main'` | 和 GitHub 上的一样（还没有新提交） |
| `Changes not staged for commit` | 下面这些文件**改过了，但还没 `git add`** |
| `modified: app/todos.js` | 这个文件被修改了（显示为红色） |

✅ 应该**正好是这 4 个文件**。如果多了别的文件，想一想是不是不小心改到了（可以用 `git restore 文件名` 恢复）。

> 💡 VS Code 左侧，改过的文件名会变成**黄色**，右边带个 **M**（Modified）。

---

### 10.13 第 10 步：git diff —— 看看具体改了什么

💻 本地：

```bash
git diff
```

✅ 你会看到每个文件的改动，例如 `todos.js` 部分：

```diff
diff --git a/app/todos.js b/app/todos.js
index a142e45..aa4e99b 100644
--- a/app/todos.js
+++ b/app/todos.js
@@ -58,6 +58,13 @@ function stats(list) {
   return { total: list.length, done, left: list.length - done };
 }
 
+// 把时间转成北京时间，格式：月-日 时:分，例如 10-21 14:30
+function formatTime(iso) {
+  const d = new Date(new Date(iso).getTime() + 8 * 60 * 60 * 1000); // UTC 时间 + 8 小时 = 北京时间
+  const pad = (n) => String(n).padStart(2, '0'); // 补零：5 → 05
+  return `${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
+}
+
 module.exports = {
   MAX_TITLE_LENGTH,
   MAX_TODOS,
@@ -67,4 +74,5 @@ module.exports = {
   removeTodo,
   clearDone,
   stats,
+  formatTime,
 };
```

**怎么看懂：**

| 部分 | 意思 |
|---|---|
| `diff --git a/app/todos.js b/app/todos.js` | 下面是 `app/todos.js` 这个文件的改动 |
| `@@ -58,6 +58,13 @@` | 位置信息：原来从第 58 行开始的 6 行，现在变成从第 58 行开始的 13 行 |
| 开头是 `+` 的行（🟢 绿色） | **新增**的内容 |
| 开头是 `-` 的行（🔴 红色） | **删除**的内容 |
| 开头是空格的行（白色） | 没改的上下文，帮你定位 |

`package.json` 部分会显示：

```diff
-  "version": "1.0.0",
+  "version": "1.1.0",
```

一个 `-` 一个 `+`，表示这一行被修改了。

**diff 一屏显示不下怎么办？**

左下角会出现一个 `:`，这时：
- 按 `空格` → 往下翻一页
- 按 `↓` / `↑` → 一行一行滚动
- 按 `q` → **退出**（⚠️ 新手经常卡在这里，记住按 `q`）

> 💡 **只想看个大概？** 用这条命令只显示每个文件改了多少行：
> ```bash
> git diff --stat
> ```
> ✅ 应该看到：
> ```
>  app/package.json       | 2 +-
>  app/server.js          | 2 ++
>  app/test/todos.test.js | 5 +++++
>  app/todos.js           | 8 ++++++++
>  4 files changed, 16 insertions(+), 1 deletion(-)
> ```

> 💡 **更直观的方法**：VS Code 左侧点 **源代码管理** 图标（像三个圆圈连线，快捷键 `Ctrl + Shift + G`），点任意一个文件，会**左右对比**显示修改前后，红色是删除，绿色是新增。

> 💡 **为什么提交前要看 diff？** 这是专业开发者的习惯：确认改的都是自己想改的，没有误删代码，没有留下调试用的东西，没有把密码写进代码。

---

### 10.14 第 11 步：git add —— 把改动放进“待提交区”

💻 本地：

```bash
git add .
```

（`add` 后面一个空格，然后是英文句号 `.`，表示“当前目录下所有改动”。）

**没有任何输出是正常的。** 再看一下状态：

```bash
git status
```

✅ 期望看到文件变成了**绿色**，标题变成 `Changes to be committed`（准备提交的改动）：

```
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   app/package.json
        modified:   app/server.js
        modified:   app/test/todos.test.js
        modified:   app/todos.js
```

> 💡 **为什么要先 add 再 commit？** add 是“挑选”，commit 是“存档”。比如你改了 5 个文件，但这次只想提交其中 3 个，就只 add 那 3 个：`git add app/todos.js app/server.js app/package.json`。
> 💡 **add 错了？** 执行 `git restore --staged 文件名`，文件会退回“改过但没 add”的状态，**修改内容不会丢**。

---

### 10.15 第 12 步：git commit —— 存档

💻 本地：

```bash
git commit -m "feat: 每条待办显示添加时间，发布 v1.1.0"
```

✅ 期望看到：

```
[main 5e8f2c1] feat: 每条待办显示添加时间，发布 v1.1.0
 4 files changed, 16 insertions(+), 1 deletion(-)
```

| 输出 | 意思 |
|---|---|
| `main` | 提交到了 main 分支 |
| `5e8f2c1` | 这次提交的编号（每次都不同，你的会不一样） |
| `4 files changed` | 改了 4 个文件 |
| `16 insertions(+), 1 deletion(-)` | 新增 16 行，删除 1 行 |

**提交说明怎么写？** 格式：`类型: 做了什么`（冒号是英文的，后面有一个空格）

| 类型 | 什么时候用 | 例子 |
|---|---|---|
| `feat` | 新功能、界面改动 | `feat: 每条待办显示添加时间` |
| `fix` | 修 bug | `fix: 修复跨天时日期显示错误` |
| `test` | 只改了测试 | `test: 补充 formatTime 的测试` |
| `docs` | 只改文档 | `docs: 完善教程` |
| `style` | 只改样式、格式 | `style: 调整时间文字颜色` |
| `refactor` | 重构（功能不变，代码结构变了） | `refactor: 拆分渲染函数` |
| `chore` | 杂事（配置、依赖等） | `chore: 更新 Node 版本` |

> ⚠️ **忘了写 `-m "..."` 怎么办？** Git 会打开一个编辑器（可能是黑底的 Vim）。不会用的话：按 `Esc`，输入 `:q!`，按回车退出，然后重新执行带 `-m` 的命令。

到这里**只是在本地存档了，GitHub 和服务器都还没有变化**。

---

### 10.16 第 13 步：git tag —— 贴版本标签

💻 本地：

```bash
git tag -a v1.1.0 -m "v1.1.0：每条待办显示添加时间"
```

没有输出是正常的。查看所有标签：

```bash
git tag
```

✅ 期望看到：

```
v1.0.0
v1.1.0
```

> ⚠️ 标签名要和 package.json 的版本号**对应**：版本 `1.1.0` → 标签 `v1.1.0`。

---

### 10.17 第 14 步：git push —— 推送到 GitHub（触发自动测试和部署）

**先推送代码**（⚠️ 这一步会触发自动部署）：

💻 本地：

```bash
git push
```

✅ 期望看到：

```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
Delta compression using up to 4 threads
Compressing objects: 100% (8/8), done.
Writing objects: 100% (8/8), 1.20 KiB | 1.20 MiB/s, done.
Total 8 (delta 5), reused 0 (delta 0), pack-reused 0 (from 0)
To github.com:bbb678777-byte/todo.git
   a1b2c3d..5e8f2c1  main -> main
```

最后一行 `a1b2c3d..5e8f2c1  main -> main` 的意思：GitHub 上的 main 从旧提交 `a1b2c3d` 更新到了新提交 `5e8f2c1`。

**再推送标签**（`git push` 默认不推送标签，要单独推）：

```bash
git push --tags
```

✅ 期望看到：

```
To github.com:bbb678777-byte/todo.git
 * [new tag]         v1.1.0 -> v1.1.0
```

> 💡 为什么没有 v1.0.0？因为 10.3 节已经推送过了，Git 只推送 GitHub 上还没有的标签。

---

### 10.18 第 15 步：在 Actions 页面看进度

**push 完马上去看**：

1. 🌐 打开 `https://github.com/bbb678777-byte/todo/actions`
2. 列表最上面出现一条新记录，标题就是你的提交说明「feat: 每条待办显示添加时间，发布 v1.1.0」。
3. 左边的图标表示状态：

| 图标 | 意思 |
|---|---|
| 🟡 黄色圆圈（转动） | 正在运行，等一等 |
| ✅ 绿色对勾 | 成功 |
| ❌ 红色叉号 | 失败，点进去看原因 |

4. 点进这条记录，看流程图：

```
┌──────────┐      ┌──────────┐
│  ✅ test  │ ───▶ │ ✅ deploy │
└──────────┘      └──────────┘
```

5. 点 **test** → 展开「运行自动测试」，能看到 `ℹ tests 10`、`ℹ pass 10`（GitHub 上也是 10 个测试全部通过）。
6. 点 **deploy** → 展开「SSH 到服务器执行部署」，✅ 日志最后应该是：

```
[deploy ...] 当前提交：5e8f2c1 feat: 每条待办显示添加时间，发布 v1.1.0 (...)
...
[deploy ...] ✓ 第 1 次检查通过：{"status":"ok","version":"1.1.0","todos":3}
[deploy ...] ✓ 部署成功！
```

注意 `"version":"1.1.0"`——**服务器上已经是新版本了**！`"todos":3` 说明数据都还在。

一般 30 秒～1 分钟完成。

> 💡 这次运行记录下面会写 **push** 触发（之前手动运行时写的是 Manually triggered），说明是 push 自动触发的。

---

### 10.19 第 16 步：确认新版本上线

可以在下面 5 个地方确认：

**① 网页首页（最直观）**

🌐 打开 `http://你的服务器IP:3002`，按 `Ctrl + F5` **强制刷新**（避免浏览器缓存），对比第 1 步的截图：

| 对比项 | 更新前 | 更新后 | 说明 |
|---|---|---|---|
| 版本号 | v1.0.0 | **v1.1.0** | 新版本上线了 ✅ |
| 待办右边 | 没有时间 | **出现灰色时间** | 新功能生效了 ✅ |
| 主机名 | a1b2c3d4e5f6 | **变了** | 旧容器被删除，换了新容器 |
| 待办列表 | 3 项 | **还是那 3 项** | 数据卷起作用了，数据没丢 ✅ |
| 完成状态 | 1 项已完成 | **还是已完成** | 数据完整保留 ✅ |

**② 健康检查接口**

🌐 打开 `http://你的服务器IP:3002/health`：

```json
{
  "status": "ok",
  "version": "1.1.0",
  "todos": 3
}
```

**③ GitHub Actions 页面**

见上一步，deploy 日志里有 `"version":"1.1.0"`。

**④ GitHub 标签页面**

🌐 打开 `https://github.com/bbb678777-byte/todo/tags`，能看到 `v1.0.0` 和 `v1.1.0`。这就是你的**版本发布记录**。以后回滚，就是回到这里的某个版本。

**⑤ 服务器上**

🖥️ 服务器：

```bash
curl http://127.0.0.1:3002/health
```

```bash
cd /www/wwwroot/todo && git log -1 --oneline
```

✅ 显示 `5e8f2c1 feat: 每条待办显示添加时间，发布 v1.1.0`。

🎉 **恭喜！你完成了一次完整的、专业的版本更新！**

---

### 10.20 更新流程清单（以后照着做）

熟悉之后，每次更新照着这个清单：

```
□ 1.  git pull                                      开始前先同步
□ 2.  改代码（app/ 里的文件），Ctrl+S 保存
□ 3.  新功能？→ 在 app/test/todos.test.js 加测试
□ 4.  改版本号 app/package.json，Ctrl+S 保存
□ 5.  node --test app/test/todos.test.js           fail 必须是 0
□ 6.  node app/server.js → 浏览器试用 → Ctrl+C 停止
□ 7.  git status                                    看改了哪些文件
□ 8.  git diff                                      看改了什么（q 退出）
□ 9.  git add .
□ 10. git commit -m "feat: 做了什么，发布 vX.Y.Z"
□ 11. git tag -a vX.Y.Z -m "vX.Y.Z：做了什么"
□ 12. git push
□ 13. git push --tags
□ 14. GitHub Actions：test ✅ → deploy ✅
□ 15. 刷新网页（Ctrl+F5）确认版本号
```

### 10.21 课后练习：自己发布 v1.1.1

不看上面的步骤，自己试着发布一个**修订版本**：

- **要改的内容**：把输入框的提示文字从“要做什么？”改成“今天要做什么？”
  （在 `server.js` 里 `Ctrl + F` 搜索 `要做什么`）
- **版本号**：只是改个文字，属于小修改 → 修订号 +1：`1.1.0` → `1.1.1`
- **需要加测试吗**：不需要，这次没改 `todos.js` 的逻辑。但**测试还是要跑一遍**，确认没改坏。
- **提交说明**：`fix: 输入框提示改为今天要做什么，发布 v1.1.1`
- **标签**：`v1.1.1`

完成后检查：网页显示 `v1.1.1`，输入框提示变了，待办数据都还在，GitHub tags 页面有 3 个标签。

---

## 第 11 章 亲眼看看：自动测试怎么拦住有 bug 的代码

> 这一章我们**故意写一个 bug**，看看自动测试怎么保护服务器。做完你就会明白专业团队为什么要写测试。

### 11.1 在本地制造一个 bug

假设你想改点东西，结果不小心把“新待办放在最前面”写成了“放在最后面”。

💻 本地，打开 `app/todos.js`，`Ctrl + F` 搜索：

```
return [todo, ...list];
```

（大约第 37 行）把它改成：

```js
  return [...list, todo];
```

`Ctrl + S` 保存。

> 💡 `[todo, ...list]` 意思是“新的放前面，旧的跟在后面”；`[...list, todo]` 是“旧的在前，新的放最后”。只是顺序换了一下，很容易不小心写错。

### 11.2 本地运行测试

💻 本地：

```bash
node --test app/test/todos.test.js
```

❌ 这次你会看到测试失败了：

```
✔ validateTitle：正常内容通过，并去掉首尾空格 (1.2148ms)
✔ validateTitle：空内容不通过 (0.1842ms)
✔ validateTitle：超过最大长度不通过 (0.1423ms)
✖ addTodo：新待办放在最前面，默认未完成 (2.5363ms)
✔ addTodo：不修改原来的列表 (0.4297ms)
✔ addTodo：内容为空时抛出错误 (0.9067ms)
✔ toggleTodo：切换完成状态 (0.3128ms)
✖ removeTodo：删除指定的待办 (0.4344ms)
✔ clearDone 和 stats：清除已完成并正确统计 (1.1423ms)
ℹ tests 9
ℹ suites 0
ℹ pass 7
ℹ fail 2
...

✖ failing tests:

test at app\test\todos.test.js:27:1
✖ addTodo：新待办放在最前面，默认未完成 (2.5363ms)
  AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:

  '第一件事' !== '第二件事'
  ...
```

（如果你已经做完了第 10 章，测试总数会是 10 个，`pass` 是 8 个，失败的还是这 2 个。）

**怎么看懂失败信息：**

| 输出 | 意思 |
|---|---|
| `✖ addTodo：新待办放在最前面，默认未完成` | 这个测试失败了 |
| `ℹ fail 2` | 有 2 个测试失败 |
| `test at app\test\todos.test.js:27:1` | 失败的测试写在 todos.test.js 第 27 行 |
| `'第一件事' !== '第二件事'` | 实际得到的是“第一件事”，但期望是“第二件事” |

测试精准地告诉你：**新添加的“第二件事”本该在最前面，现在最前面却是“第一件事”**。顺着这个线索，很快就能找到是 `addTodo` 的顺序写反了。

> 💡 如果没有测试，你可能要在网页上点很多次才发现顺序不对，或者干脆没发现就上线了。

### 11.3 （可选）推送上去，看 GitHub 怎么拦截

想亲眼看到 GitHub 拦截的效果，可以把这个 bug 推上去。**放心，服务器不会受影响。**

💻 本地：

```bash
git add .
```

```bash
git commit -m "test: 故意制造 bug，验证自动测试能拦截"
```

```bash
git push
```

🌐 打开 Actions 页面，点进最新的记录，你会看到：

```
┌──────────┐      ┌──────────────┐
│  ❌ test  │ ───▶ │ ⊘ deploy     │
└──────────┘      │  (skipped)   │
                  └──────────────┘
```

- `test` ❌ 红色：测试失败。点进去能看到和本地一样的 `✖` 失败信息。
- `deploy` ⊘ 灰色 **skipped**（跳过）：因为测试没通过，**根本没有去部署**。

🌐 刷新 `http://你的服务器IP:3002`：**网站完全正常**，还是之前的版本。有 bug 的代码被挡在了门外。🛡️

GitHub 还会给你的邮箱发一封邮件，标题类似 `[bbb678777-byte/todo] Run failed: Deploy - main`，提醒你出问题了。

### 11.4 修复 bug

**如果你做了 11.3（推送了 bug）**，用 `git revert` 撤销那次提交：

```bash
git revert --no-edit HEAD
```

（`HEAD` 表示“最新的那次提交”。）

✅ 期望看到：

```
[main 9a8b7c6] Revert "test: 故意制造 bug，验证自动测试能拦截"
 1 file changed, 1 insertion(+), 1 deletion(-)
```

本地再跑一遍测试，确认全部通过：

```bash
node --test app/test/todos.test.js
```

✅ `fail 0` 后推送：

```bash
git push
```

Actions 页面这次 test ✅ → deploy ✅。

**如果你没做 11.3（只是本地改了，没有 commit）**，直接恢复文件就行：

```bash
git restore app/todos.js
```

再跑一遍测试确认 `fail 0`。

### 11.5 小结

| | 没有自动测试 | 有自动测试 |
|---|---|---|
| bug 什么时候被发现 | 上线后，用户发现 | push 后几秒钟，GitHub 发现 |
| 服务器 | 跑着有 bug 的代码 | 还是之前好的版本 |
| 你怎么知道 | 用户投诉 | 邮件通知 + 告诉你哪里错了 |

**以后改了 `todos.js`，记得补测试；每次 push 前，记得先在本地跑测试。**

---

## 第 12 章 只改配置不改代码：.env 文件

### 12.1 .env 是什么

`.env` 是一个放在**服务器项目目录里**的文本文件，每行一个设置：

```
APP_TITLE=我的待办清单
```

它和代码的关系：

```
GitHub 仓库（代码）                       服务器 /www/wwwroot/todo/
├── .env.example  ←── 模板，会上传 ──▶    ├── .env.example
│   APP_TITLE=我的待办清单                 │
│                                        ├── .env  ←── 真正的配置，只在服务器上
└── （没有 .env，被 .gitignore 忽略）       │   APP_TITLE=小明的待办清单
                                         │
                                         └── docker-compose.yml 读取 .env，传给程序
```

| | `.env.example` | `.env` |
|---|---|---|
| 是什么 | 模板，告诉别人“有哪些设置可以改” | 真正生效的配置 |
| 上传到 GitHub | ✅ 会 | ❌ **绝对不会**（写在 `.gitignore` 里） |
| 在哪 | 代码里 | 只在服务器上 |
| 部署时会被覆盖吗 | 会（跟随代码更新） | **不会**（Git 不管它） |

> 💡 **为什么要这样设计？** 真实项目里，`.env` 里放的是数据库密码、支付密钥等。如果写在代码里上传到 GitHub，全世界都能看到。所以：**代码里只放模板，真实配置只在服务器上**。
> 💡 第一次部署时，`deploy.sh` 已经自动帮你从 `.env.example` 复制出了 `.env`（第 8.3 节的输出里有提示）。

### 12.2 实战：修改网站标题

**方法一：用宝塔文件管理器（推荐新手）**

1. 🌐 宝塔面板左侧 → **文件**。
2. 进入目录 `/www/wwwroot/todo`（可以在顶部地址栏直接输入这个路径，回车）。
3. 找到 `.env` 文件。
   - 如果看不到：以点开头的文件是“隐藏文件”，在文件管理器的设置里打开“显示隐藏文件”。
4. 双击 `.env` 打开编辑器，把：

```
APP_TITLE=我的待办清单
```

改成你想要的标题，比如：

```
APP_TITLE=小明的待办清单
```

5. 按 `Ctrl + S` 保存，关闭编辑器。

**方法二：用命令**

🖥️ 服务器：

```bash
cd /www/wwwroot/todo
```

先看看现在的内容：

```bash
cat .env
```

修改标题（把 `小明的待办清单` 换成你想要的）：

```bash
sed -i 's/^APP_TITLE=.*/APP_TITLE=小明的待办清单/' .env
```

确认改好了：

```bash
grep APP_TITLE .env
```

✅ 显示 `APP_TITLE=小明的待办清单`。

### 12.3 让新配置生效

改了 `.env` 之后，**必须重新创建容器**才会生效（程序只在启动时读取一次配置）。

🖥️ 服务器：

```bash
cd /www/wwwroot/todo && bash deploy.sh
```

> 💡 也可以用 `docker compose up -d`，它会发现配置变了，自动重建容器。用 `deploy.sh` 更省心，还会做健康检查。
> ⚠️ `docker restart todo` **不行**！restart 只是重启，不会重新读取 `.env`。

🌐 刷新 `http://你的服务器IP:3002`：✅ 标题变成了“小明的待办清单”，**待办数据都还在，版本号没变**（因为代码没变）。

确认容器里的环境变量：

```bash
docker exec todo printenv APP_TITLE
```

✅ 显示 `小明的待办清单`。

### 12.4 以后 push 新代码，.env 会被覆盖吗？

**不会。** 你可以试试：随便发布一个新版本，部署完后标题还是“小明的待办清单”。

原因：`deploy.sh` 里的 `git reset --hard` 只会重置被 Git 管理的文件，而 `.env` 不归 Git 管（在 `.gitignore` 里），所以它会一直保留。

### 12.5 想恢复默认标题

方法一：把 `.env` 里那行改回 `APP_TITLE=我的待办清单`，再执行 `bash deploy.sh`。

方法二：🖥️ 删除 `.env` 后重新部署，`deploy.sh` 会从模板重新复制一份：

```bash
cd /www/wwwroot/todo && rm .env && bash deploy.sh
```

---

## 第 13 章 只改文档，不发新版本

只改了 `README.md` 这类文档、没改程序时，**不需要改版本号，也不需要打标签**：

💻 本地：

```bash
git status
```

```bash
git add README.md
```

```bash
git commit -m "docs: 补充教程说明"
```

```bash
git push
```

> 💡 push 到 main 依然会触发 Actions（测试 + 部署）。程序没变，Docker 会用缓存，很快完成，网页版本号也不变。这是正常的。

---

## 第 14 章 回滚：新版本出问题了怎么办

假设发布了 v1.1.0 后发现问题，想退回 v1.0.0。有两种方法。

### 方法 A：git revert（推荐 ✅，正规做法）

`git revert` 会生成一个**新提交**，内容正好是“撤销某次提交”。历史记录完整保留，谁都能看到“什么时候、撤销了什么”。

**第 1 步**：💻 本地，查看提交历史，找到出问题的那次提交：

```bash
git log --oneline
```

输出类似：

```
5e8f2c1 (HEAD -> main, tag: v1.1.0, origin/main) feat: 每条待办显示添加时间，发布 v1.1.0
a1b2c3d (tag: v1.0.0) feat: 初始化 todo 待办清单项目
```

出问题的是 `5e8f2c1`（⚠️ 你的编号不一样，用你自己看到的）。列表很长的话按 `q` 退出。

**第 2 步**：撤销那次提交：

```bash
git revert --no-edit 5e8f2c1
```

（`--no-edit` 表示直接用默认的说明，不打开编辑器。）

✅ 期望看到：

```
[main 7d6c5b4] Revert "feat: 每条待办显示添加时间，发布 v1.1.0"
 4 files changed, 1 insertion(+), 16 deletions(-)
```

现在 4 个文件都恢复成了 1.0.0 时的内容（`git revert` 只是把那次提交新增的 16 行删掉、删掉的 1 行加回来）。

**第 3 步**：本地测试：

```bash
node --test app/test/todos.test.js
```

✅ `tests 9`、`fail 0`（formatTime 的测试也被撤销了，所以又变回 9 个）。

**第 4 步**：推送，自动部署：

```bash
git push
```

Actions 变绿后刷新网页，版本恢复为 v1.0.0，待办数据都还在。

> 💡 **版本号只往前走。** 修好 bug 后，下一个版本应该是 `v1.1.1` 或 `v1.2.0`，**不要再用 `v1.1.0`**（这个标签已经存在了）。

### 方法 B：服务器紧急回滚（临时措施 ⚠️）

网站挂了，需要**几十秒内恢复**时用。

🖥️ 服务器：

```bash
cd /www/wwwroot/todo && bash deploy.sh v1.0.0
```

服务器立刻切换到 `v1.0.0` 标签的代码并重新部署。

> ⚠️ **这只是临时止血！** GitHub 上的 main 仍然是有问题的代码，**下次任何人 push，自动部署又会把有问题的版本发上去**。紧急回滚后，必须尽快按方法 A 在本地 revert 并 push。

### 两种方法对比

| | 方法 A：git revert | 方法 B：deploy.sh v1.0.0 |
|---|---|---|
| 在哪执行 | 💻 本地 | 🖥️ 服务器 |
| 速度 | 1～2 分钟 | 几十秒 |
| GitHub 上的代码 | 同步恢复 ✅ | 没变 ❌ |
| 下次 push 后 | 正常 | 问题版本会重新上线 ⚠️ |
| 会跑测试吗 | 会 ✅ | 不会 |
| 适合 | **日常回滚（首选）** | 紧急止血，之后必须补做方法 A |

---

## 第 15 章 数据卷：待办为什么不会丢

### 15.1 原理

每次部署，Docker 都会**删除旧容器、创建新容器**（所以主机名会变）。容器里的文件会跟着容器一起被删掉。

为了让数据不丢，`docker-compose.yml` 里配置了一个**数据卷**：

```yaml
    volumes:
      - todo-data:/app/data   # 把数据卷挂载到容器的 /app/data 目录
```

```
旧容器 ──写入 /app/data/todos.json──┐
                                   ├──▶  数据卷 todo_todo-data（存在服务器硬盘上，和容器无关）
新容器 ──读取 /app/data/todos.json──┘
```

容器删了，数据卷还在；新容器启动后，接着读原来的数据。

### 15.2 查看数据卷

🌐 宝塔面板 → **Docker** → **存储卷**，能看到 `todo_todo-data`。

或者 🖥️ 服务器：

```bash
docker volume ls
```

✅ 能看到 `todo_todo-data`（还有前一个项目的 `guestbook_guestbook-data`）。

> 💡 名字前面的 `todo_` 是 Docker 自动加的项目名前缀，取自目录名 `/www/wwwroot/todo`。

查看数据卷在服务器硬盘上的实际位置（看输出里的 `"Mountpoint"`）：

```bash
docker volume inspect todo_todo-data
```

直接查看数据内容：

```bash
docker exec todo cat /app/data/todos.json
```

### 15.3 备份数据

🖥️ 服务器，把数据文件复制出来，文件名带上日期：

```bash
docker cp todo:/app/data/todos.json /root/todos-backup-$(date +%Y%m%d).json
```

查看备份：

```bash
ls -l /root/todos-backup-*
```

### 15.4 恢复备份

🖥️ 服务器（把文件名换成你的备份文件）：

```bash
docker cp /root/todos-backup-20261021.json todo:/app/data/todos.json
```

```bash
docker restart todo
```

### 15.5 ⚠️ 千万不要做的事

- ❌ **不要执行 `docker compose down -v`**：`-v` 会把数据卷一起删掉，所有待办丢失。
  （普通的 `docker compose down` 和 `deploy.sh` 都不会删数据卷，放心用。）
- ❌ 在宝塔面板删除容器时，**不要勾选“同时删除存储卷”**。
- ❌ 不要在宝塔“存储卷”页面删除 `todo_todo-data`。

---

# 第五部分：查阅

## 第 16 章 常见问题

### 16.1 本地 Git 相关

**Q：执行 git 命令报错 `fatal: not a git repository`**

你不在项目目录里。看终端左边的路径，切换过去：

```bash
cd C:\CODE\1021_xx_2
```

**Q：`git commit` 提示 `nothing to commit, working tree clean`**

没有可以提交的改动。可能是：
- 文件改了**没保存**（VS Code 文件名旁有白色圆点 ●），按 `Ctrl + S`。
- 改的是别的项目文件夹里的文件。

**Q：`git commit` 提示 `no changes added to commit`**

改了文件，但忘了 `git add`。先执行 `git add .` 再 commit。

**Q：`git push` 提示 `Everything up-to-date`**

没有新提交可以推送。是不是忘了 `git commit`？用 `git status` 和 `git log --oneline -3` 检查。

**Q：`git push` 被拒绝 `! [rejected] main -> main (fetch first)`**

GitHub 上有你本地没有的提交（比如在 GitHub 网页上改过文件）。先拉取再推送：

```bash
git pull --rebase
```

```bash
git push
```

> ⚠️ 不要用 `git push --force` 强推，会覆盖 GitHub 上的提交。

**Q：`git tag` 报错 `fatal: tag 'v1.1.0' already exists`**

这个标签用过了。版本号只往前走，换一个新的（比如 `v1.1.1`），同时把 package.json 也改成对应的版本。

**Q：忘了 `git push --tags`**

不影响部署（部署只看 main 分支）。补推一下：

```bash
git push --tags
```

**Q：commit 之后发现说明写错了 / 漏改了文件**

如果**还没有 push**，可以修改最后一次提交：

```bash
git add .
```

```bash
git commit --amend -m "新的提交说明"
```

⚠️ 如果**已经 push 了**，就不要用 amend，再提交一次修正就行。

**Q：tag 打错了（还没 push）**

删掉本地标签重新打：

```bash
git tag -d v1.1.0
```

**Q：提交时出现 `warning: in the working copy of 'xxx', LF will be replaced by CRLF`**

换行符提示，**不是错误**，可以忽略。`.gitattributes` 会保证上传到 GitHub 的格式是对的。

**Q：`git diff` / `git log` 里中文显示成乱码或 `\346\210\221` 这样的编码**

💻 本地执行：

```bash
git config --global core.quotepath false
```

```bash
git config --global i18n.logOutputEncoding utf-8
```

**Q：`git diff` / `git log` 之后终端卡住，左下角显示 `:` 或 `(END)`**

这是分页显示模式，按 `q` 退出。

**Q：`git commit` 后进入了看不懂的黑色编辑界面**

这是 Vim 编辑器（忘了写 `-m` 时会打开）。按 `Esc`，输入 `:q!`，按回车退出，然后重新执行带 `-m "说明"` 的命令。

**Q：一不小心在别的项目文件夹里执行了 git 命令**

如果只是 `git status`、`git diff` 这种查看命令，没有任何影响。如果 commit 了，**在 push 之前**可以撤销最后一次提交（修改内容会保留）：

```bash
git reset --soft HEAD~1
```

### 16.2 测试相关

**Q：`node --test` 报错 `Could not find '...todos.test.js'`**

路径不对。确认终端在 `C:\CODE\1021_xx_2`（不是 `app` 文件夹里面），再执行 `node --test app/test/todos.test.js`。

**Q：本地测试通过，GitHub 上 test 失败**

1. 是不是忘了 `git add` 某个文件？用 `git status` 看有没有没提交的文件。
2. 点进 GitHub 的 test 日志，看具体哪个测试失败了。

**Q：我改了代码，需要改测试吗？**

| 改了什么 | 要不要改测试 |
|---|---|
| 只改网页样式、文字（server.js 里的 HTML/CSS） | 不需要，但要跑一遍确认没改坏 |
| 给 todos.js **加了新功能** | **要加新测试** |
| **改变了** todos.js 原有的规则（比如字数上限从 50 改成 80） | 检查相关测试，期望值可能要跟着改 |

### 16.3 部署和服务器相关

**Q：Actions 两个都是绿色，但网页没变化**

1. 按 `Ctrl + F5` 强制刷新浏览器。
2. 打开 `/health` 看版本号——如果是新的，说明是浏览器缓存问题。
3. 如果 `/health` 也是旧版本，检查 package.json 版本号是不是忘了改或忘了保存。

**Q：test 失败了，服务器会怎样？**

什么都不会发生。deploy 会被跳过，服务器上继续运行之前的版本。修好 bug 再 push 就行（见第 11 章）。

**Q：test 成功，deploy 失败了，网站还能访问吗？**

- 如果是 SSH 连接失败（`handshake failed`、`timeout`）：根本没连上服务器，网站不受影响。
- 如果是 `健康检查失败`：新容器已经替换了旧容器但启动失败，**网站可能打不开**。先用 [方法 B](#方法-b服务器紧急回滚临时措施-️) 紧急回滚，再排查问题。

**Q：Actions 根本没有运行**

- 确认推送到了 main 分支（`git push` 最后一行应该是 `main -> main`）。
- 只推送标签（`git push --tags`）不会触发部署，这是正常的。

**Q：网页打不开**

按顺序排查：

1. 🖥️ 容器在运行吗？

```bash
docker ps -a --filter name=todo
```

STATUS 应该是 `Up ... (healthy)`。

2. 🖥️ 服务器本机能访问吗？

```bash
curl http://127.0.0.1:3002/health
```

3. 本机能访问、浏览器打不开 → **端口没放行**，检查 7.3 的**两道门**。
4. 本机也不行 → 看日志：

```bash
docker logs --tail 50 todo
```

**Q：端口被占用 `Bind for 0.0.0.0:3002 failed: port is already allocated`**

🖥️ 看看谁占用了 3002：

```bash
ss -lntp | grep 3002
```

```bash
docker ps --filter "publish=3002"
```

如果是别的程序，可以把 `docker-compose.yml` 里的 `"3002:3000"` 改成 `"3003:3000"`（只改左边），同时把 `deploy.sh` 里的 `127.0.0.1:3002` 改成 `127.0.0.1:3003`，提交推送后用 3003 访问（记得放行新端口）。

**Q：服务器执行 deploy.sh 报 `$'\r': command not found`**

文件换行符变成了 Windows 格式。🖥️ 临时修复：

```bash
sed -i 's/\r$//' /www/wwwroot/todo/deploy.sh
```

**Q：拉取镜像超时（卡在 `pulling node:20-alpine`、`i/o timeout`）**

国内服务器访问 Docker Hub 慢，需要配置镜像加速：🌐 宝塔 → **Docker** → **设置** → **加速 URL**，填入可用的加速地址后保存。

**Q：改了 .env，网页没变化**

- 改完要执行 `bash deploy.sh`（不能用 `docker restart`）。
- 检查 `.env` 格式：`APP_TITLE=标题`，等号两边**不要有空格**，标题**不要加引号**。
- 用 `docker exec todo printenv APP_TITLE` 看容器里实际的值。

**Q：服务器 `git fetch` 很慢或失败**

国内服务器访问 GitHub 不稳定，可以多试几次。如果一直失败，可以考虑改用国内的 Gitee（码云）托管代码 + 宝塔 WebHook 插件部署。

---

## 第 17 章 命令速查表

### 17.1 日常更新（💻 本地）

| 命令 | 作用 |
|---|---|
| `git pull` | 开始干活前，同步最新代码 |
| `node --test app/test/todos.test.js` | 运行自动测试（看 `fail 0`） |
| `node app/server.js` | 本地运行（`Ctrl + C` 停止） |
| `git status` | 查看哪些文件改了 |
| `git diff` | 查看具体改了什么（`q` 退出） |
| `git diff --stat` | 只看每个文件改了几行 |
| `git add .` | 把所有改动加入待提交区 |
| `git commit -m "feat: 说明"` | 提交（存档） |
| `git tag -a v1.1.0 -m "说明"` | 打版本标签 |
| `git push` | 推送代码（**触发自动测试 + 部署**） |
| `git push --tags` | 推送标签 |

### 17.2 查看和撤销（💻 本地）

| 命令 | 作用 |
|---|---|
| `git log --oneline` | 查看提交历史（`q` 退出） |
| `git tag` | 查看所有标签 |
| `git restore 文件名` | 放弃某个文件的修改（⚠️ 修改会丢失） |
| `git restore --staged 文件名` | 撤销 add（修改保留） |
| `git commit --amend -m "新说明"` | 修改最后一次提交（只能在 push 之前） |
| `git revert --no-edit 提交编号` | 撤销某次提交（推荐的回滚方法） |
| `git revert --no-edit HEAD` | 撤销最新的一次提交 |
| `git tag -d v1.1.0` | 删除本地标签（push 之前） |
| `git remote -v` | 查看关联的 GitHub 地址 |

### 17.3 服务器（🖥️ 宝塔终端）

| 命令 | 作用 |
|---|---|
| `cd /www/wwwroot/todo && bash deploy.sh` | 手动部署最新代码（改 .env 后也用这个） |
| `cd /www/wwwroot/todo && bash deploy.sh v1.0.0` | 紧急回滚到指定版本 |
| `curl http://127.0.0.1:3002/health` | 健康检查 |
| `docker ps --filter name=todo` | 查看容器状态 |
| `docker logs --tail 50 todo` | 查看最近 50 行日志 |
| `docker logs -f todo` | 实时看日志（`Ctrl + C` 退出） |
| `docker restart todo` | 重启容器（⚠️ 不会重新读取 .env） |
| `docker exec todo printenv APP_TITLE` | 查看容器里的环境变量 |
| `docker exec todo cat /app/data/todos.json` | 查看待办数据 |
| `docker cp todo:/app/data/todos.json /root/backup.json` | 备份数据 |
| `cat /www/wwwroot/todo/.env` | 查看配置文件 |
| `docker volume ls` | 查看数据卷 |

### 17.4 网页地址（🌐 浏览器）

| 地址 | 作用 |
|---|---|
| `http://你的服务器IP:3002` | 待办清单首页 |
| `http://你的服务器IP:3002/health` | 健康检查（看版本号） |
| `https://github.com/bbb678777-byte/todo` | GitHub 仓库 |
| `https://github.com/bbb678777-byte/todo/actions` | 测试和部署记录 |
| `https://github.com/bbb678777-byte/todo/tags` | 版本标签 |
| `https://github.com/bbb678777-byte/todo/settings/secrets/actions` | Secrets 设置 |

### 17.5 三个项目对照

| | hello-docker | guestbook | todo |
|---|---|---|---|
| 本地目录 | `C:\CODE\1020_xuexi_Docker` | `C:\CODE\1021_xx` | `C:\CODE\1021_xx_2` |
| GitHub 仓库 | `hello-docker` | `guestbook` | `todo` |
| 服务器目录 | `/www/wwwroot/hello-docker` | `/www/wwwroot/guestbook` | `/www/wwwroot/todo` |
| 容器名 | `hello-docker` | `guestbook` | `todo` |
| 访问端口 | 3000 | 3001 | 3002 |
| 数据卷 | 无 | `guestbook_guestbook-data` | `todo_todo-data` |
| 自动测试 | 无 | 无 | ✅ |
| .env 配置 | 无 | 无 | ✅ |

---

🎉 **学完这个项目，你已经掌握了专业团队的核心开发流程：**
**本地开发 → 写测试 → 版本管理 → 自动测试 → 自动部署 → 配置管理 → 回滚。**

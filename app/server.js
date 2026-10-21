'use strict';

// 待办清单网站：只用 Node.js 自带模块，数据保存在 JSON 文件里
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const todos = require('./todos');

const pkg = require(path.join(__dirname, 'package.json'));
const VERSION = pkg.version;

// ===== 配置：都从环境变量读取，没设置就用默认值 =====
// 在服务器上通过 .env 文件修改，不需要改代码
const PORT = Number(process.env.PORT) || 3000;
const APP_TITLE = process.env.APP_TITLE || '我的待办清单';
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'todos.json');

fs.mkdirSync(DATA_DIR, { recursive: true });

function load() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

// 先写临时文件再改名，防止写到一半断电导致文件损坏
function save(list) {
  const tmp = DATA_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(list, null, 2));
  fs.renameSync(tmp, DATA_FILE);
}

let list = load();

// 转义用户输入，防止 XSS
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data, null, 2));
}

function redirectHome(res, error) {
  const location = error ? '/?error=' + encodeURIComponent(error) : '/';
  res.writeHead(303, { Location: location });
  res.end();
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 10 * 1024) {
        reject(new Error('请求体太大'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function renderHome(error) {
  const s = todos.stats(list);
  const items = list
    .map(
      (t) => `
      <li class="${t.done ? 'done' : ''}">
        <form method="POST" action="/todos/${t.id}/toggle" class="inline">
          <button class="check" title="切换完成状态">${t.done ? '✅' : '⬜'}</button>
        </form>
        <span class="title">${escapeHtml(t.title)}</span>
        <form method="POST" action="/todos/${t.id}/delete" class="inline">
          <button class="del" title="删除">✕</button>
        </form>
      </li>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(APP_TITLE)} v${VERSION}</title>
  <style>
    body { font-family: -apple-system, "Microsoft YaHei", sans-serif; background: #f2f4f8; margin: 0; }
    .wrap { max-width: 560px; margin: 40px auto; padding: 0 16px; }
    .card { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,.06); }
    h1 { margin: 0 0 4px; color: #6741d9; }
    .sub { color: #888; font-size: 13px; margin-bottom: 18px; }
    .add { display: flex; gap: 8px; margin-bottom: 8px; }
    .add input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font: inherit; }
    .add button { background: #6741d9; color: #fff; border: 0; padding: 0 20px; border-radius: 8px;
                  font-size: 15px; cursor: pointer; }
    .error { color: #e03131; font-size: 13px; margin-bottom: 8px; }
    ul { list-style: none; padding: 0; margin: 12px 0 0; }
    li { display: flex; align-items: center; gap: 8px; padding: 10px 0; border-bottom: 1px solid #eee; }
    li .title { flex: 1; word-break: break-word; }
    li.done .title { color: #aaa; text-decoration: line-through; }
    .inline { margin: 0; }
    .check, .del { background: none; border: 0; cursor: pointer; font-size: 18px; padding: 0 4px; }
    .del { color: #ccc; font-size: 16px; }
    .del:hover { color: #e03131; }
    .empty { color: #aaa; text-align: center; padding: 24px 0; border: 0; display: block; }
    .footer { display: flex; justify-content: space-between; align-items: center;
              margin-top: 14px; color: #888; font-size: 13px; }
    .footer button { background: none; border: 1px solid #ddd; border-radius: 6px; padding: 4px 10px;
                     color: #666; cursor: pointer; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <h1>✅ ${escapeHtml(APP_TITLE)}</h1>
      <div class="sub">版本 v${VERSION} · 主机 ${escapeHtml(os.hostname())}</div>
      <form method="POST" action="/todos" class="add">
        <input name="title" maxlength="${todos.MAX_TITLE_LENGTH}" placeholder="要做什么？" required autofocus>
        <button type="submit">添加</button>
      </form>
      ${error ? `<div class="error">⚠️ ${escapeHtml(error)}</div>` : ''}
      <ul>${items || '<li class="empty">🎉 没有待办事项，休息一下吧</li>'}</ul>
      <div class="footer">
        <span>共 ${s.total} 项 · 已完成 ${s.done} · 未完成 ${s.left}</span>
        <form method="POST" action="/todos/clear-done" class="inline">
          <button type="submit">清除已完成</button>
        </form>
      </div>
    </div>
  </div>
</body>
</html>`;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;

  try {
    if (req.method === 'GET' && p === '/health') {
      return sendJson(res, 200, { status: 'ok', version: VERSION, todos: list.length });
    }

    if (req.method === 'GET' && p === '/api/todos') {
      return sendJson(res, 200, { stats: todos.stats(list), todos: list });
    }

    if (req.method === 'GET' && p === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(renderHome(url.searchParams.get('error')));
    }

    if (req.method === 'POST') {
      // 新增待办
      if (p === '/todos') {
        const form = new URLSearchParams(await readBody(req));
        try {
          list = todos.addTodo(list, form.get('title'));
        } catch (err) {
          return redirectHome(res, err.message);
        }
        save(list);
        return redirectHome(res);
      }

      // 清除已完成
      if (p === '/todos/clear-done') {
        list = todos.clearDone(list);
        save(list);
        return redirectHome(res);
      }

      // 切换完成状态 / 删除：路径形如 /todos/<id>/toggle、/todos/<id>/delete
      const m = p.match(/^\/todos\/([a-z0-9]+)\/(toggle|delete)$/);
      if (m) {
        const [, id, action] = m;
        list = action === 'toggle' ? todos.toggleTodo(list, id) : todos.removeTodo(list, id);
        save(list);
        return redirectHome(res);
      }
    }

    sendJson(res, 404, { error: 'Not Found', path: p });
  } catch (err) {
    console.error('[todo] 请求出错：', err.message);
    sendJson(res, 400, { error: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`[todo] v${VERSION} 已启动：http://localhost:${PORT}  标题=${APP_TITLE}  数据文件=${DATA_FILE}`);
});

// 优雅退出：docker stop 发送 SIGTERM
function shutdown(signal) {
  console.log(`[todo] 收到 ${signal}，正在退出...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 5000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

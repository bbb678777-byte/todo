'use strict';

// 待办清单的业务逻辑：只处理数据，不涉及网页和文件读写
// 单独放在一个文件里，方便写自动测试（见 test/todos.test.js）

const MAX_TITLE_LENGTH = 50;
const MAX_TODOS = 100;

// 生成一个简短的唯一 ID，例如 "lx3k9a2f"
function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// 检查待办内容是否合法
// 返回 { ok: true, value: 处理后的内容 } 或 { ok: false, error: 错误原因 }
function validateTitle(title) {
  const value = String(title || '').trim();
  if (!value) {
    return { ok: false, error: '内容不能为空' };
  }
  if (value.length > MAX_TITLE_LENGTH) {
    return { ok: false, error: `内容不能超过 ${MAX_TITLE_LENGTH} 个字` };
  }
  return { ok: true, value };
}

// 新增一条待办，放在列表最前面；返回新的列表（不修改原列表）
function addTodo(list, title, now = new Date()) {
  const check = validateTitle(title);
  if (!check.ok) {
    throw new Error(check.error);
  }
  if (list.length >= MAX_TODOS) {
    throw new Error(`最多只能有 ${MAX_TODOS} 条待办`);
  }
  const todo = { id: newId(), title: check.value, done: false, createdAt: now.toISOString() };
  return [todo, ...list];
}

// 切换完成状态：未完成 ↔ 已完成
function toggleTodo(list, id) {
  return list.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

// 删除一条待办
function removeTodo(list, id) {
  return list.filter((t) => t.id !== id);
}

// 清除所有已完成的待办
function clearDone(list) {
  return list.filter((t) => !t.done);
}

// 统计：总数、已完成、未完成
function stats(list) {
  const done = list.filter((t) => t.done).length;
  return { total: list.length, done, left: list.length - done };
}

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
  formatTime
};

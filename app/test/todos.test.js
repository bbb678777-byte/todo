'use strict';

// 自动测试：用 Node.js 自带的测试工具 node:test，不需要安装任何东西
// 运行方法（在项目根目录）：node --test app/test/todos.test.js

const test = require('node:test');
const assert = require('node:assert');
const todos = require('../todos');

test('validateTitle：正常内容通过，并去掉首尾空格', () => {
  const r = todos.validateTitle('  买牛奶  ');
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.value, '买牛奶');
});

test('validateTitle：空内容不通过', () => {
  assert.strictEqual(todos.validateTitle('').ok, false);
  assert.strictEqual(todos.validateTitle('    ').ok, false);
  assert.strictEqual(todos.validateTitle(undefined).ok, false);
});

test('validateTitle：超过最大长度不通过', () => {
  const tooLong = '字'.repeat(todos.MAX_TITLE_LENGTH + 1);
  assert.strictEqual(todos.validateTitle(tooLong).ok, false);
});

test('addTodo：新待办放在最前面，默认未完成', () => {
  let list = [];
  list = todos.addTodo(list, '第一件事');
  list = todos.addTodo(list, '第二件事');
  assert.strictEqual(list.length, 2);
  assert.strictEqual(list[0].title, '第二件事');
  assert.strictEqual(list[0].done, false);
  assert.ok(list[0].id, '应该有 id');
});

test('addTodo：不修改原来的列表', () => {
  const original = [];
  todos.addTodo(original, '测试');
  assert.strictEqual(original.length, 0);
});

test('addTodo：内容为空时抛出错误', () => {
  assert.throws(() => todos.addTodo([], '   '), /内容不能为空/);
});

test('toggleTodo：切换完成状态', () => {
  let list = todos.addTodo([], '写作业');
  const id = list[0].id;
  list = todos.toggleTodo(list, id);
  assert.strictEqual(list[0].done, true);
  list = todos.toggleTodo(list, id);
  assert.strictEqual(list[0].done, false);
});

test('removeTodo：删除指定的待办', () => {
  let list = todos.addTodo([], 'A');
  list = todos.addTodo(list, 'B');
  list = todos.removeTodo(list, list[0].id); // 删掉 B
  assert.strictEqual(list.length, 1);
  assert.strictEqual(list[0].title, 'A');
});

test('clearDone 和 stats：清除已完成并正确统计', () => {
  let list = todos.addTodo([], 'A');
  list = todos.addTodo(list, 'B');
  list = todos.addTodo(list, 'C');
  list = todos.toggleTodo(list, list[0].id); // C 完成
  assert.deepStrictEqual(todos.stats(list), { total: 3, done: 1, left: 2 });

  list = todos.clearDone(list);
  assert.deepStrictEqual(todos.stats(list), { total: 2, done: 0, left: 2 });
});

test('formatTime：转换成北京时间', () => {
  assert.strictEqual(todos.formatTime('2026-10-21T06:30:00.000Z'), '10-21 14:30');
  assert.strictEqual(todos.formatTime('2026-10-21T18:05:00.000Z'), '10-22 02:05'); // 跨天
});
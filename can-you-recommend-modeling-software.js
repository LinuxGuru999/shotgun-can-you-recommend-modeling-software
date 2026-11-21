#!/usr/bin/env node
// Budget Tracker CLI - add expenses and print category totals.
const fs = require('fs'), path = require('path');
const file = path.join(__dirname, 'expenses.csv');
const [, , cmd, ...args] = process.argv;
if (cmd === 'add') {
  const [amount, category, note = ''] = args;
  if (!amount || !category) { console.error('Usage: add <amount> <category> [note]'); process.exit(1); }
  fs.appendFileSync(file, [new Date().toISOString().slice(0,10), amount, category, note].join(',') + '\n');
  console.log('Added ' + amount + ' to ' + category);
} else if (cmd === 'report') {
  if (!fs.existsSync(file)) { console.log('No expenses yet.'); process.exit(0); }
  const totals = {};
  for (const line of fs.readFileSync(file, 'utf8').trim().split('\n')) { const [, amount, category] = line.split(','); totals[category] = (totals[category] || 0) + Number(amount); }
  for (const [cat, total] of Object.entries(totals)) console.log(cat.padEnd(18) + total.toFixed(2));
} else console.log('Usage: node budget.js add <amount> <category> [note] | report');

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

test('page exposes the complete fitting workflow', () => {
  for (const id of ['file', 'region', 'background', 'shape', 'peakRows', 'fit', 'chart', 'metrics', 'resultRows']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});

test('scientific constraints and exports are present', () => {
  for (const token of ['lockSplit', 'lockRatio', 'widthTolerance', 'shirley', 'tougaard', 'downloadCurve', 'downloadJson']) {
    assert.ok(js.includes(token) || html.includes(token), `missing ${token}`);
  }
});

test('Ir and Pb templates retain the 4:3 doublet area ratio', () => {
  assert.match(js, /split:3\.0,ratio:\.75/);
  assert.match(js, /split:4\.86,ratio:\.75/);
});

test('the page states the interpretation boundary', () => {
  assert.match(html, /较高 R² 不等于化学归属正确/);
});

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function element() {
  return { dataset: {}, children: [], setAttribute() {},
    appendChild(child) { this.children.push(child); }, innerHTML: '' };
}
const document = { createElement: element, createDocumentFragment: element };
const rows = [
  { title: 'Physical print', is_digital: false },
  { title: 'Old digital download' },
  { title: 'Digital art file', is_digital: true },
  { title: 'Download', type: 'download' },
  { title: 'Another print', type: 'print' }
].map(p => ({ image_url: 'test.jpg', ...p }));
const context = { document, window: {}, console,
  fetch: async () => ({ ok: true, json: async () => ({ products: rows }) }) };
vm.runInNewContext(fs.readFileSync('assets/js/site-config.js', 'utf8'), context);
assert.equal(context.window.SITE_CONFIG.categories.length, 1);
vm.runInNewContext(fs.readFileSync('assets/js/products.js', 'utf8'), context);
(async () => {
  const container = element();
  await context.window.LuminareProducts.loadProducts(container, 3, { silent: true });
  const cards = container.children[0].children;
  assert.equal(cards.length, 2);
  assert.ok(cards.every(card => card.dataset.type === 'print'));
  assert.ok(cards.every(card => !card.innerHTML.includes('Digital Download')));
  assert.ok(cards[0].innerHTML.includes('Physical print'));
  assert.ok(cards[1].innerHTML.includes('Another print'));
  console.log('Catalog render: digital excluded before limit; physical cards preserved.');
})().catch(error => { console.error(error); process.exitCode = 1; });

import { setupDomTests } from '../util';


describe('multiple-apps, main-then-sibling', function() {
  const { setupDom, tearDownDom } = setupDomTests(document);
  let app: HTMLElement;

  beforeEach(async () => {
    app = await setupDom('/multiple-apps/main-then-sibling.html');
  });
  afterEach(tearDownDom);


  it('renders', async () => {
    await test(app);
  });

});


describe('multiple-apps, sibling-then-main', function() {
  const { setupDom, tearDownDom } = setupDomTests(document);
  let app: HTMLElement;

  beforeEach(async () => {
    app = await setupDom('/multiple-apps/sibling-then-main.html');
  });
  afterEach(tearDownDom);


  it('renders', async () => {
    await test(app);
  });

});


async function test(app: HTMLElement) {
  const multipleAppsCmp = app.querySelector('multiple-apps-cmp');
  expect(multipleAppsCmp.classList.contains('hydrated')).toBe(true);
  expect(multipleAppsCmp.getAttribute('data-multiple-apps-cmp-host')).toBe('');
  expect(multipleAppsCmp.children[0].textContent.trim()).toBe('main light dom');
  expect(multipleAppsCmp.children[1].nodeName.toLowerCase()).toBe('sibling-root');

  const siblingRoot = app.querySelector('sibling-root');
  expect(siblingRoot.classList.contains('hydrated')).toBe(true);
  expect(siblingRoot.getAttribute('data-sibling-root-host')).toBe('');
  expect(siblingRoot.children[0].nodeName.toLowerCase()).toBe('div');
  expect(siblingRoot.children[0].getAttribute('data-sibling-root')).toBe('');
  expect(siblingRoot.children[0].children[0].nodeName.toLowerCase()).toBe('section');
  expect(siblingRoot.children[0].children[0].textContent.trim()).toBe('sibling inner dom');

  expect(siblingRoot.children[0].children[1].nodeName.toLowerCase()).toBe('article');
  expect(siblingRoot.children[0].children[1].getAttribute('data-sibling-root')).toBe('');
  expect(siblingRoot.children[0].children[1].getAttribute('data-sibling-root-slot')).toBe('');
  expect(siblingRoot.children[0].children[1].textContent.trim()).toBe('sibling light dom');

  const mainElm = multipleAppsCmp.children[2];
  expect(mainElm.nodeName.toLowerCase()).toBe('main');
  expect(mainElm.getAttribute('data-multiple-apps-cmp')).toBe('');

  expect(mainElm.children[0].nodeName.toLowerCase()).toBe('section');
  expect(mainElm.children[0].getAttribute('data-multiple-apps-cmp')).toBe('');
  expect(mainElm.children[0].textContent.trim()).toBe('main inner dom');

  expect(mainElm.children[1].nodeName.toLowerCase()).toBe('article');
  expect(mainElm.children[1].classList.contains('sibling-has-loaded')).toBe(true);
  expect(mainElm.children[1].getAttribute('data-multiple-apps-cmp')).toBe('');
  expect(mainElm.children[1].textContent.trim()).toBe('siblingAppHasLoaded');
}

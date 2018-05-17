import * as d from '../../declarations';
import { initComponentLoaded } from '../init-component-instance';
import { mockDomApi, mockPlatform } from '../../testing/mocks';
import { initHostElement } from '../init-host-element';


describe('componentOnReady', () => {

  let plt: d.PlatformApi;
  let elm: d.HostElement;
  let instance: d.ComponentInstance;
  let App: d.AppGlobal;

  class TestInstance {
    componentDidLoad() {/**/}
  }

  beforeEach(() => {
    App = {};
  });


  describe('initCoreComponentOnReady', () => {

    it('should resolve if elm has loaded and is a known component', async () => {
      const cmpRegistry: d.ComponentRegistry = {
        'ion-cmp': {}
      };
      plt = mockPlatform(null, null, cmpRegistry);
      elm = plt.domApi.$createElement('ion-cmp') as any;
      initHostElement(plt, { tagNameMeta: 'ion-cmp' }, elm, 'hydrated');
      plt.hasLoadedMap.set(elm, true);

      let resolvedElm = null;
      await elm.componentOnReady().then(rElm => {
        resolvedElm = rElm;
      });
      expect(resolvedElm).toBe(elm);

      expect(plt.onReadyCallbacksMap.has(elm)).toBe(false);
    });

    it('should not resolve if elm hasnt loaded but is a known component', async () => {
      const cmpRegistry: d.ComponentRegistry = {
        'ion-cmp': {}
      };
      plt = mockPlatform(null, null, cmpRegistry);
      elm = plt.domApi.$createElement('ion-cmp') as any;
      initHostElement(plt, cmpRegistry['ion-cmp'], elm, 'hydrated');

      let resolvedElm: any = 88;
      elm.componentOnReady().then(rElm => {
        resolvedElm = rElm;
      });
      expect(resolvedElm).toBe(88);

      expect(plt.onReadyCallbacksMap.has(elm)).toBe(true);
    });

  });


  describe('initHostElement', () => {

    beforeEach(() => {
      App = {};
      plt = mockPlatform();
      elm = plt.domApi.$createElement('ion-cmp') as any;
      instance = new TestInstance();
      plt.instanceMap.set(elm, instance);
      initHostElement(plt, { tagNameMeta: 'ion-cmp' }, elm, 'hydrated');
    });

    it('should call multiple componentOnReady promises', async () => {
      let resolvedElm1 = null;
      let resolvedElm2 = null;

      const p1 = elm.componentOnReady().then(resolveElm => {
        resolvedElm1 = resolveElm;
      });

      const p2 = elm.componentOnReady().then(resolveElm => {
        resolvedElm2 = resolveElm;
      });

      initComponentLoaded(plt, elm, 'hydrated');

      await p1;
      await p2;

      expect(resolvedElm1).toBe(elm);
      expect(resolvedElm2).toBe(elm);
    });

  });

});

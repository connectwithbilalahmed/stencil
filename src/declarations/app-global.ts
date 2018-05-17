import * as d from './index';


export interface WindowData extends Window {
  /**
   * queued componentOnReady() fns not handled yet
   */
  ['s-cr']?: QueuedComponentOnReady[];

  /**
   * namespaces of actively loading apps
   */
  ['s-loading']?: string[];

  /**
   * All defined custom elements
   */
  ['s-defined']?: { [tag: string]: boolean };

  HTMLElement?: any;

  Promise?: PromiseConstructor;
}



export interface AppGlobal {
  ael?: (elm: Element|Document|Window, eventName: string, cb: d.EventListenerCallback, opts?: d.ListenOptions) => void;
  components?: d.ComponentHostData[];
  Context?: any;
  loadBundle?: (bundleId: string, dependents: string[], importFn: CjsImporterFn) => void;
  loaded?: boolean;
  h?: Function;
  initialized?: boolean;
  raf?: DomControllerCallback;
  rel?: (elm: Element|Document|Window, eventName: string, cb: d.EventListenerCallback, opts?: d.ListenOptions) => void;
}


export interface QueuedComponentOnReady {
  /**
   * Host Element
   */
  0: d.HostElement;

  /**
   * resolve fn
   */
  1: (elm: d.HostElement) => void;
}


export interface CoreContext {
  attr?: number;
  emit?: (elm: Element, eventName: string, data?: d.EventEmitterData) => void;
  enableListener?: EventListenerEnable;
  eventNameFn?: (eventName: string) => string;
  isClient?: boolean;
  isPrerender?: boolean;
  isServer?: boolean;
  window?: Window;
  location?: Location;
  document?: Document;
  mode?: string;
  queue?: d.QueueApi;
  resourcesUrl?: string;
  [contextId: string]: any;
}


export interface DomControllerCallback {
  (cb: d.RafCallback): number;
}


export interface EventListenerEnable {
  (instance: any, eventName: string, enabled: boolean, attachTo?: string|Element, passive?: boolean): void;
}


export interface CjsImporterFn {
  (exports: CjsExports, requirePoly: Function): void;
}


export interface CjsExports {
  [moduleId: string]: d.ComponentConstructor;
}


import * as d from '../declarations';


export function drainQueuedComponentOnReadys(queuedComponentOnReadys: d.QueuedComponentOnReady[], appsActivelyLoading: string[], HTMLElement: any, namespace: string, plt: d.PlatformApi, i?: number, queuedComponentOnReady?: d.QueuedComponentOnReady, onReadyCallbacks?: d.OnReadyCallback[]) {

  if (queuedComponentOnReadys) {
    for (i = queuedComponentOnReadys.length - 1; i >= 0; i--) {
      queuedComponentOnReady = queuedComponentOnReadys[i];

      if (plt.getComponentMeta(queuedComponentOnReady[0])) {
        // this element belongs to this app

        if (plt.hasLoadedMap.has(queuedComponentOnReady[0])) {
          // element has already loaded
          queuedComponentOnReady[1](queuedComponentOnReady[0]);

        } else {
          // element hasn't loaded yet
          // add this resolve specifically to this elements queue
          onReadyCallbacks = plt.onReadyCallbacksMap.get(queuedComponentOnReady[0]) || [];
          onReadyCallbacks.push(queuedComponentOnReady[1]);
          plt.onReadyCallbacksMap.set(queuedComponentOnReady[0], onReadyCallbacks);
        }

        // remove the resolve from the queue so in the end
        // all that's left in the queue are elements not apart of any apps
        queuedComponentOnReadys.splice(i, 1);
      }
    }
  }

  if (appsActivelyLoading) {
    i = appsActivelyLoading.indexOf(namespace);
    if (i > -1) {
      // remove this app from the array of apps actively loading
      appsActivelyLoading.splice(i, 1);
    }

    if (!appsActivelyLoading.length) {
      // this was the last app to load
      // so let's clean up everything

      if (HTMLElement && HTMLElement.prototype) {
        // remove the HTMLElement.prototype.componentOnReady
        delete HTMLElement.prototype.componentOnReady;
      }

      if (queuedComponentOnReadys) {
        while (queuedComponentOnReady = queuedComponentOnReadys.pop()) {
          // reject any queued componentsOnReadys that are left over
          // since these elements were not apart of any apps
          queuedComponentOnReady[1](null);
        }
      }
    }
  }
}

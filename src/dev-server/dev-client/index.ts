import * as d from '../../declarations';
import { initClient } from './init-client';

declare const window: d.DevClientWindow;

initClient(window.$devServer, window, document);

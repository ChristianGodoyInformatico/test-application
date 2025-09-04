// src/test.ts
declare const require: any;

import 'zone.js';
import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Inicializar entorno de pruebas
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Importa automáticamente todos los archivos *.spec.ts
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);

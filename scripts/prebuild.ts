#!/usr/bin/env node
'use strict';

import fs from 'fs/promises';
import path from 'path';
import * as sprite from '@oviirup/sprite';
import * as React from 'react';
import * as ReactDOM from 'react-dom/server';

const cwd = process.cwd();

// exit process on termination signal
for (const signal of ['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGKILL']) {
  process.on(signal, () => {
    process.stdout.write('exiting ...\n');
    process.stdout.write('\x1B[?25h');
    process.exit(0);
  });
}

// build layout files
const layouts = {
  'src/options/layout.tsx': 'src/options/index.html',
  'src/popup/layout.tsx': 'src/popup/index.html',
  'src/sidepanel/layout.tsx': 'src/sidepanel/index.html',
};

async function createLayoutFile(input: string, output: string) {
  try {
    const module = await import(path.join(cwd, input));
    const element = React.createElement(module.default);
    const html = ReactDOM.renderToString(element);
    const outputFilePath = path.join(cwd, output);
    await fs.writeFile(outputFilePath, html);
    console.log('script: updated layout file');
  } catch {
    // do nothing
  }
}

for (const input in layouts) {
  await createLayoutFile(input, layouts[input]);
}

sprite.build();

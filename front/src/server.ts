import { APP_BASE_HREF } from '@angular/common';
import { renderApplication } from '@angular/platform-server';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './main.server'; 

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
  }));

  server.get('*', (req, res) => {
    renderApplication(bootstrap, {
      document: indexHtml,
      url: req.originalUrl,
      platformProviders: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl },
      ],
    }).then(html => res.send(html))
      .catch(err => {
        console.error('SSR Error:', err);
        res.status(500).send(err.message || err);
      });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Servidor Node Express en http://localhost:${port}`);
  });
}

run();

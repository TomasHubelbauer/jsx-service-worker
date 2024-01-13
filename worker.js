self.importScripts('https://unpkg.com/typescript/lib/typescript.js');

async function compile(request) {
  const response = await fetch(request);
  if (!response.ok) {
    return response;
  }

  const now = performance.now();
  const { outputText, diagnostics } = ts.transpileModule(
    await response.text(),
    { compilerOptions: { target: 'esnext', jsx: 'react' } }
  );

  if (diagnostics.length > 0) {
    return new Response(`throw new Error('${JSON.stringify(diagnostics)}');`, response);
  }

  return new Response(`${outputText}\n// ${performance.now() - now} ms\n`, response);
}

self.addEventListener('install', () => {
  // Do not wait for tab close and reopen to use an updated service worker file
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Make the requests of the connected tabs take to this worker without reload
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', async (event) => {
  if (event.request.url.endsWith('.js')) {
    event.respondWith(compile(event.request));
  }
});

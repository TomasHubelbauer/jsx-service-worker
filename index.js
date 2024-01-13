const registration = await navigator.serviceWorker.register('worker.js');

// Force update the service worker file on every page load to ensure it is fresh
await registration.update();

// Set React exports to window globals since we're using UMD not ESM to fetch it
for (const field in React) {
  window[field] = React[field];
}

// Load the `App` component dynamically so it loads after the service worker
const app = await import('./App.js');
ReactDOM
  .createRoot(document.querySelector('#root'))
  .render(React.createElement(app.default))
  ;

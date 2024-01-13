# JSX Service Worker

This repository hosts an experiment in using service workers to convert JSX into
[`React.createElement`](https://react.dev/reference/react/createElement) calls
on the fly.

It is an extract of https://github.com/TomasHubelbauer/sw-js-to-ts-transpiler
which is my previous work using service workers to transpile TypeScript to
JavaScript on the fly.

This enables one to use React in the browser without using any build tools.

It works by pulling in React UMD build via a CDN to bring React itself into the
browser and then using a service worker to inspect all requests (this includes
ESM imports) and transpiling their JavaScript using TypeScript which effectively
means rewriting JSX to JS.

The CDN links are taken from the old React documentation:
https://legacy.reactjs.org/docs/cdn-links.html

There is no reference to this installation method in the new documentation, so I
think it is safe to say it is no longer supported.
I do not think it is likely it will stop to work anytime soon, though.
And if it ever does, the library can be vendored, however uncool that would be.

For completeness sake, here is the old documentation for React without JSX
https://legacy.reactjs.org/docs/react-without-jsx.html

This is what we're doing as far as the browser is concerned since the service
worker replaces the JSX with valid JavaScript.

Note that this experiment won't work on the `file:` protocol and a file server
must be used so that the service worker can be installed.
On macOS, Python is built-in and can be used as a static file server:
`python3 -m http.server`.
This will serve the web app at http://localhost:8000.

const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const PreactCompat = require('preact-compat');
const PreactCompatServer = require('preact-compat/server');
const PreactRenderToString = require('preact-render-to-string');
const { h, Component } = require('preact');
const { perform, report, count }  = require('./benchmark');

const PreactApp = require('./src/skeleton')(h, Component);
const ReactApp = require('./src/skeleton')(React.createElement, React.Component);
const PreactCompatApp = require('./src/skeleton')(PreactCompat.createElement, PreactCompat.Component);

perform('react', () => {
  return ReactDOMServer.renderToString(
    React.createElement(ReactApp)
  );
});

perform('preact-compat', () => {
  return PreactCompatServer.renderToString(
    PreactCompat.createElement(PreactCompatApp)
  );
});

perform('preact', () => {
  return PreactRenderToString(
    h(PreactApp)
  );
});

report('react');
report('preact');
report('preact-compat', true);
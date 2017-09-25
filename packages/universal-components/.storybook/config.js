import { configure } from '@storybook/react';

const req = require.context(
  '../components/', // path where stories live
  true, // recursive?
  /\__stories__\/.*.js$/, // story files match this pattern
);

function loadStories() {
  req.keys().forEach(module => req(module));
}

configure(loadStories, module);

import { configure, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'Universal Components Example',
  url: 'https://github.com/kkemple/universal-components-example',
  goFullScreen: false,
  showLeftPanel: true,
  sortStoriesByKind: false,
  hierarchySeparator: '/',
});

const req = require.context(
  '../components/', // path where stories live
  true, // recursive?
  /\__stories__\/.*.js$/, // story files match this pattern
);

function loadStories() {
  req.keys().forEach(module => req(module));
}

configure(loadStories, module);

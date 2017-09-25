# Universal Components Example
An example setup for building/testing/deploying universal components with React

## Folder Structure
This project uses [`Lerna`](https://github.com/lerna/lerna) to make managing multiple NPM packages easier. Often times you will end up with other packages related to your universal components package and using Lerna makes managing the inter-dependencies easier.

- `packages`: This directory holds the actual NPM packages you want to publish via Lerna (currently only the [universal-components](./packages/universal-components) package.
- `examples`: This directory holds a web and a native example app.

## Available Scripts

### lerna bootstrap
Hoists shared dependencies from any packges in `packages` directory. Also creates symlinks for inter-dependent packages in `packages` directory

### lerna publish
Publishes new tags and package versions for any packages in `packages` directory that have changed since last publish

## Running the Examples

### Web

This app was created using `create-react-app`. And although CRA supports using `react-native-web` out of the box, we need to eject so that we can [update Webpack config](./examples/web/config/webpack.config.dev.js) to also parse the universal components package (we must also do the same in [prod Wepback config](./examples/web/config/webpack.config.prod.js)).

You can see the universal component being included [here](./examples/web/src/App.js).

```
cd examples/web
yarn install
yarn start
```

### Native

This app was created using `create-react-native-app`. There were no special setup steps required.

You can see the universal component being included [here](./examples/native/App.js).

```
cd examples/native
yarn install
yarn start
```


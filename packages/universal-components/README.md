# Universal Components Package

## What are universal components?

Universal components are React components that can render anywhere. They are platform agnostic, which means you can use them on the web and native without changing any lines of code.

Why architect your components this way? The main benefit is code reuse. By building your components with React Native primitives, you only have to write them once. Since other platforms such as VR & Sketch also share RN primitives, you can eventually expand universal components to include those platforms as well (although some issues such as cross-platform SVGs are still getting ironed out).

To achieve a fully universal component library, we use [react-native-web](https://github.com/necolas/react-native-web). RNW sits as a layer on top of DOM primitives; for example, `<View />` will render to a `<div/>` on the web. RNW has nearly complete feature parity with RN, so you can be confident that almost any code that works with RN will also work with RNW. Check the [RNW explorer](https://necolas.github.io/react-native-web/storybook/) for a comprehensive list of supported components & APIs.

## Workflow

Components can be developed in isolation with [Storybook](https://storybook.js.org/) to eliminate differences between projects. This project uses the web version of Storybook to make sure that all universal components will render on the web.

## Folder structure:

- `components/`: Where all your universal components live
- `.storybook`: Storybook specific configuration
- `storybook-static`: Where storybook exports builds to
- `flow-typed/`: [Shared Flow types](https://github.com/flowtype/flow-typed)

Components are exported in `index.js` and published to an NPM package (`@<YOUR_NPM_USERNAME>/universal-components`) so they can be consumed by multiple projects. In order to coordinate publishing multiple packages in this repo, you use [Lerna](https://lernajs.io/). Run `lerna publish` from root of project to publish a version of this package. Then, you can upgrade the package within the application (`yarn upgrade @<YOUR_NPM_USERNAME>/universal-components`) and import the components to use them.

## Available Scripts

### yarn storybook
Starts up storybook for development of components

### yarn build
Builds the production version of storybook

### yarn deploy
Deploys the production build of storybook to [`surge.sh`](https://surge.sh)

## Styling

For styling, the `StyleSheet` API is included in RN so you can write your styles as JS objects. RNW supports the `StyleSheet` API via CSS modules. Don't be alarmed if you open up dev tools and see a huge string of ugly looking class names attached to your DOM elements - this is RNW's way of memoizing styles for fast performance compared to other CSS in JS solutions.

Since the RNW styling API mirrors RN's, it follows the default styling properties of [Yoga](https://facebook.github.io/yoga/docs/learn-more/), Facebook's cross-platform layout engine. The main point to remember about Yoga is that Flexbox is enabled by default with `flexDirection: column`.

## Platform specific code

Sometimes, you might need to account for slight differences between platforms in your components. You can either use the Platform API or platform extensions to accomplish this.

### Platform API: Good for styling one-offs
```javascript
import { Platform } from 'react-native';

switch (Platform.OS) {
  case 'ios':
  case 'android':
    // do something on native
  case 'web':
  default:
    // do something on web
}
```

You can also write it like this:
```javascript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'blue',
      },
    }),
  },
});
```

### Platform extensions: Good for differences in component implementation

```javascript
import { Button } from '../components/button'
// will resolve from '../components/button/index.web.js' on web, '../components/button/index.ios.js' on iOS, etc
```

This functionality is built into the React Native packager. We've also added the ability to resolve platform extensions on web in the babel config (see [`.babelrc`](./.babelrc) for an example).


## Storybook configuration
Storybook configuration can be found in [`./.storybook`](./.storybook). The two key parts to notice are:
- Stories live next to components ([see example](./components/button)) and we load them via `./.storybook/config.js`
- Because we use babel-minify over UglifyJS for minifying we have to use full control mode for Webpack `./.storybook/webpack.config.js`

## How to use React Native modules on the web

⚠️ Warning: This is slightly hacky, but if you should do it anyway because standardizing third party modules & component libraries across platforms is important.

Some examples of RN libraries that can be used on the web include `victory-native`, `react-native-calendars`, and `react-native-vector-icons`. We're able to use these because of RNW's high feature parity with RN, the ability to transpile, and alias with Webpack or Babel.

### Steps:

1. After you install the library, you will need to transpile it with Babel because all RN modules are ES6. To do this, add the module name to the RegExp in `babel-loader` in `.storybook/webpack.config.js`:
```javascript
{
  test: /\.js$/,
  exclude: /node_modules\/(?!svgs)(?!MODULE_NAME_HERE)/,
  loader: 'babel-loader',
  query: { cacheDirectory: true },
},
```
2. In some cases, you'll need to create an alias in the Babel config. For example, you alias `svgs` to `react-native-svg` for your cross-platform svg implementation. You'll almost always be aliasing a web library's name to its native counterpart because aliasing is currently harder to execute with the RN packager, [Metro](https://github.com/facebook/metro-bundler).

Add the alias to `"module-resolver"` plugin in `.babelrc` like this:
```javascript
"alias": {
  "react-native": "react-native-web",
  "react-native-svg": "svgs",
```
3. If you're aliasing, you will need to tell Flow how to resolve the module. Add the module name mapper to `.flowconfig`:
```
module.name_mapper='\(react-native\)' -> 'react-native-web'
module.name_mapper='\(react-native-svg\)' -> 'svgs'
```

5. If you've made it this far and everything is working, celebrate! 🎉 You can now import your components normally. If you're getting cryptic errors, you might want to reach out to the maintainer of the library. Usually, they're more than happy to offer their help with supporting web. 😊

## Resources

- [React as a Platform](https://www.youtube.com/watch?v=hNwQPJy-XZY)
- [Write Once, Render Anywhere](http://reactnyc-universal-components.surge.sh/#/)
- [The Road to Universal Components](https://labs.mlssoccer.com/the-road-to-universal-components-at-major-league-soccer-eeb7aac27e6c)

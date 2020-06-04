### Svelte Preprocess Chain utility

## Purpose
The documentation about the [`preprocess`](https://svelte.dev/docs#svelte_preprocess) function of [`svelte`](https://github.com/sveltejs/), says:

> Multiple preprocessors can be used together. The output of the first becomes the input to the second. `markup` functions run first, then `script` and `style`.

But there are some cases where you need to run a preprocessor entirely before to run the next one. For example when you need to compile from any language to the basics (HTML, JS, CSS) and then perform other changes.

For that reason I created this package to basically run preprocess for every preprocessor you set.

## Install

```
pnpm i -D svelte-preprocess-chain
```

## Usage

This is the scenario I faced to create this package.
Translate TypeScript to HTML and Less/SASS/SCSS/Stylus/PostCSS to CSS with [`svelte-preprocess`](https://github.com/kaisermann/svelte-preprocess) and then some ajustment for Svelte Native with [`svelte-native-preprocessor`](https://github.com/halfnelson/svelte-native-preprocessor) (it uses [`svelte.parse`](https://svelte.dev/docs#svelte_parse) which only supports JavaScript).

```js
// import it
const sveltePreprocessChain = require("svelte-preprocess-chain");

// prepare your preprocessors chain
preprocessors = [
    sveltePreprocess(),
    svelteNativePreprocessor(),
];

// Then use this as the preprocess parameter
sveltePreprocessChain(preprocessors)

```

i.e. Webpack config file:

```js
module.exports = {
    //...
    module: {
        rules: [
            //...
            {
                test: /\.svelte$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'svelte-loader-hot',
                        options: {
                            preprocess: sveltePreprocessChain(preprocessors),
                            hotReload: true,
                            hotOptions: {
                                native: true
                            }
                        }
                    }
                ]
            }
        ]
    }
}
```

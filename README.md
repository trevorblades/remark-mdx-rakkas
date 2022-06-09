# remark-mdx-rakkas

> This is a fork of [remark-mdx-frontmatter](https://github.com/remcohaszing/remark-mdx-frontmatter) that is made to work nicely with [Rakkas](https://github.com/rakkasjs/rakkasjs)

## Installation

First, install this package, along with `remark-frontmatter`, which it relies on.

```bash
npm install remark-frontmatter @trevorblades/remark-mdx-rakkas
```

In your Rakkas config, you should have a standard-looking MDX configuration, using a Vite plugin and adding `mdx` to your array of `pageExtensions`. Pass this module and the `remarkFrontmatter` to your MDX plugin as the `remarkPlugins` option.

```js
import mdx from '@cyco130/vite-plugin-mdx';
import {remarkMdxRakkas} from '@trevorblades/remark-mdx-rakkas';
import remarkFrontmatter from 'remark-frontmatter';

export default {
  pageExtensions: ['jsx', 'tsx', 'mdx'],
  vite: {
    plugins: [
      mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxRakkas]
      })
    ]
  }
}
```

## Usage

This remark plugin takes frontmatter content, and makes it available to your layout components in Rakkas. Both YAML and TOML frontmatter data are supported.

For example, given a file named `page.mdx` with the following contents:

```mdx
---
title: Getting started
---

This is how you get started...

<InteractiveComponent />
```

The following component, `layout.jsx` can read its child pages' frontmatter by accessing the `meta` prop.

```jsx
import {Helmet} from 'react-helmet-async';

export default function Layout({children, meta}) {
  <>
    <Helmet title={meta.title}>
      <meta content={meta.description} name="description" />
    </Helmet>
    <h1>{meta.title}</h1>
    {children}
  </>
}
```

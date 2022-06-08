# remark-mdx-rakkas

> This is a fork of [remark-mdx-frontmatter](https://github.com/remcohaszing/remark-mdx-frontmatter) that is made to work nicely with [Rakkas](https://github.com/rakkasjs/rakkasjs)

## Installation

First, install this package and the `remark-frontmatter` one that it relies on.

```sh
npm install remark-frontmatter @trevorblades/remark-mdx-rakkas
```

In your Rakkas config:

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

This remark plugin takes frontmatter content, and outputs it as JavaScript exports. Both YAML and
TOML frontmatter data are supported.

For example, given a file named `example.mdx` with the following contents:

```mdx
---
hello: frontmatter
---

Rest of document
```

The following script:

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
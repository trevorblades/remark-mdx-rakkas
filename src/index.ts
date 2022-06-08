import { valueToEstree } from 'estree-util-value-to-estree';
import { load } from 'js-yaml';
import { Root, YAML } from 'mdast';
import { MDXJSEsm } from 'mdast-util-mdx';
import { parse } from 'toml';
import { Attacher, Transformer } from 'unified';

const transformer: Transformer = (ast) => {
  const mdast = ast as Root;
  const imports: MDXJSEsm[] = [];

  for (const node of mdast.children) {
    let data: unknown;
    const { value } = node as YAML;
    if (node.type === 'yaml') {
      data = load(value);
      // @ts-expect-error A custom node type may be registered for TOML frontmatter data.
    } else if (node.type === 'toml') {
      data = parse(value);
    }

    if (data == null) {
      continue;
    }

    if (typeof data !== 'object') {
      throw new TypeError(`Expected frontmatter data to be an object, got:\n${value}`);
    }

    imports.push({
      type: 'mdxjsEsm',
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ExportNamedDeclaration',
              source: null,
              specifiers: [],
              declaration: {
                type: 'FunctionDeclaration',
                id: { type: 'Identifier', name: 'load' },
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ReturnStatement',
                      argument: valueToEstree({ meta: data }),
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    });
  }
  mdast.children.unshift(...imports);
};

export const remarkMdxRakkas: Attacher = () => transformer;

import type { Literal } from 'npm:@types/unist@2'
import type { AstPath, Plugin } from 'prettier'
import { printer } from 'prettier/doc'

// @deno-types="../vendor/prettier-plugin-markdown.d.ts"
import md from '../vendor/prettier-plugin-markdown.js'

const wrappedRE = /^\s*<(script|style)\b/
const markerRE = /\s*\uFFFF/

const plugin: Plugin = {
  ...md,
  parsers: {
    ...md.parsers,
    markdown: md.parsers.mdx,
  },
  printers: {
    ...md.printers,
    mdast: {
      ...md.printers.mdast,

      embed: (path: AstPath<Literal<string>>, options) => {
        const { node } = path
        const { useTabs = false, tabWidth = 2 } = options

        if (node.type === 'word' && (node.value.at(0) === '{' || node.value.at(-1) === '}')) {
          // attr (FIXME: do better parsing)
          return node.value
        }

        if ((node.type !== 'jsx' && node.type !== 'liquidNode') || node.value.includes('\uFFFF')) {
          return md.printers.mdast.embed(path, options)
        }

        return async (textToDoc) => {
          const isWrapped = !wrappedRE.test(node.value)

          const doc0 = await textToDoc(
            isWrapped ? `<template>\n${node.value}\n\uFFFF\n</template>` : node.value,
            { parser: 'vue' },
          )

          if (!isWrapped) return doc0

          const { formatted } = printer.printDocToString(doc0, options as Required<typeof options>)
          const contents = formatted.slice(11).split(markerRE)

          let indent = useTabs ? 1 : tabWidth

          if (contents[1] !== '\n</template>') {
            const lastLine = contents[0]!.split('\n').at(-1)!
            indent = lastLine.match(useTabs ? /^\t*/ : /^ */)![0].length
          }

          const comments: { placeholder: string; content: string }[] = []
          let commentIndex = 0

          const dedentedContent = contents[0]!
            .replace(/<!--([^]*?)-->/g, (match) => {
              const placeholder = `__HTML_COMMENT_${commentIndex++}__`
              comments.push({ placeholder, content: match })
              return placeholder
            })
            .replace(new RegExp(`^${useTabs ? '\t' : ' '}{0,${indent}}`, 'gm'), '')

          let finalContent = dedentedContent
          comments.forEach(({ placeholder, content }) => {
            finalContent = finalContent.replace(placeholder, content)
          })

          return finalContent
        }
      },
    },
  },
}

export default plugin

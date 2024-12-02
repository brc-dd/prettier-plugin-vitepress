import type { Literal } from 'npm:@types/unist@2'
import type { AstPath, Plugin } from 'prettier'
import { type builders, printer, utils } from 'prettier/doc'

// @deno-types="../vendor/prettier-plugin-markdown.d.ts"
import md from '../vendor/prettier-plugin-markdown.js'

const wrappedRE = /^\s*<(script|style)\b/

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

          const doc1 = findGroup(doc0, (doc) => Array.isArray(doc.contents))
          if (!doc1) return doc0

          const doc2 = findGroup(doc1, (doc) => doc1 !== doc)
          if (!doc2) return doc0

          doc1.contents = doc2.contents

          const { formatted } = printer.printDocToString(doc1, options as Required<typeof options>)
          if (!formatted.includes('\uFFFF')) return doc0

          return node.value // skip formatting something went wrong

          // return formatted.split('\uFFFF')[0]?.replace(/^\s{2}/gm, '')
        }
      },
    },
  },
}

function findGroup(
  doc: builders.Doc,
  predicate: (doc: builders.Group) => boolean,
): builders.Group | undefined {
  let result: builders.Group | undefined
  utils.traverseDoc(doc, (d) => {
    if (typeof d === 'object' && !Array.isArray(d) && d.type === 'group' && predicate(d)) {
      result = d
      return false
    }
    return true
  })
  return result
}

export default plugin

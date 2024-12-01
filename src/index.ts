import type { Literal } from 'npm:@types/unist@2'
import type { AstPath, Parser, Plugin, Printer } from 'prettier'
import { builders, utils } from 'prettier/doc'
import _md from 'prettier/plugins/markdown'

const md = _md as unknown as Plugin & {
  parsers: Record<'markdown' | 'mdx' | 'remark', Parser>
  printers: { mdast: Printer & Required<Pick<Printer, 'embed'>> }
}

const wrappedRE = /^\s*<(script|style)\b/

export default {
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
        if (node.type !== 'jsx') return md.printers.mdast.embed(path, options)

        return async (textToDoc) => {
          const isWrapped = !wrappedRE.test(node.value)

          const doc0 = await textToDoc(
            isWrapped ? `<template>${node.value}</template>` : node.value,
            { parser: 'vue' },
          )
          if (!isWrapped) return doc0

          const doc1 = findGroup(doc0, (doc) => Array.isArray(doc.contents))
          if (!doc1) return doc0

          const doc2 = findGroup(doc1, (doc) => doc1 !== doc)
          if (!doc2) return doc0

          doc1.contents = doc2.contents

          return doc0
        }
      },
    },
  },
} satisfies Plugin

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

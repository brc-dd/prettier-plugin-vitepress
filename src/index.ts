import type { AstPath, Plugin, Printer } from 'prettier'
import { builders, utils } from 'prettier/doc'
import _md from 'prettier/plugins/markdown'

interface Node {
  type: string
  value: string
  position: {
    start: { line: number; column: number; offset: number }
    end: { line: number; column: number; offset: number }
  }
}

const md = _md as unknown as Plugin & {
  printers: { mdast: Printer & Required<Pick<Printer, 'embed'>> }
}

const wrappedRE = /^\s*<(script|style)\b/

export default {
  ...md,
  printers: {
    ...md.printers,
    mdast: {
      ...md.printers.mdast,

      embed: (path: AstPath<Node>, options) => {
        const { node } = path

        if (node.type === 'html') {
          const isWrapped = !wrappedRE.test(node.value)

          return async (textToDoc) => {
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
        }

        return md.printers.mdast.embed(path, options)
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

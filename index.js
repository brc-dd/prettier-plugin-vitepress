// @ts-check
import md from 'prettier/plugins/markdown.mjs'

const RE = /\s*(script|style|template)/

export default /** @satisfies {import('prettier').Plugin} */ ({
  ...md,
  printers: {
    ...md.printers,
    mdast: {
      ...md.printers.mdast,
      embed: (path, options) => {
        const { node } = path
        if (node.type === 'html') {
          return async (textToDoc) => {
            const isWrapped = !RE.test(node.value)
            const doc = await textToDoc(
              isWrapped ? `<template>${node.value}</template>` : node.value,
              { parser: 'vue' }
            )
            if (isWrapped) {
              const { contents: c } = doc[0].contents
              c.contents = c.contents.find((node) => node.type === 'indent').contents.slice(1)
            }
            return [doc]
          }
        }
        return md.printers.mdast.embed(path, options)
      }
    }
  }
})

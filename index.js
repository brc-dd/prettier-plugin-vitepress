// @ts-check
import { utils } from 'prettier/doc'
import _md from 'prettier/plugins/markdown'

const RE = /\s*(script|style|template)/

const md =
  /** @type {import('prettier').Plugin & { printers: { mdast: import('prettier').Printer & { embed: NonNullable<import('prettier').Printer['embed']> } } }}*/ (
    /** @type {unknown} */ (_md)
  )

export default /** @satisfies {import('prettier').Plugin} */ ({
  ...md,
  printers: {
    ...md.printers,
    mdast: {
      ...md.printers.mdast,
      embed: (path, options) => {
        const { node } = path
        if (node.type === 'html') {
          const isWrapped = !RE.test(node.value)
          return async (textToDoc) => {
            const doc = utils.stripTrailingHardline(
              await textToDoc(isWrapped ? `<template>${node.value}</template>` : node.value, {
                parser: 'vue'
              })
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

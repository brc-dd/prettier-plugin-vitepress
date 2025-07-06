import { NodeTypes, type ParentNode, type TemplateChildNode } from '@vue/compiler-core'
import { parse } from '@vue/compiler-sfc'

// Step 1: Wrap Markdown in <template>
const markdown = `\
# Hello

<Foo>
<Bar>
<Baz>

*markdown* content with **HTML**.
</Baz>
</Bar>
</Foo>

Normal **markdown** content.

*markdown* content with <strong>inline  html</strong>.
`

const wrapped = `<template>${markdown}</template>`

// Parse as Vue SFC
const sfc = parse(wrapped)
const templateAst = sfc.descriptor.template?.ast

if (!templateAst) throw new Error('Failed to parse template')

const replacements: string[] = []

// Walk and transform from deepest node up
function processNode(node: ParentNode | TemplateChildNode, fullSource: string): string {
  if (node.type !== NodeTypes.ELEMENT && node.type !== NodeTypes.ROOT) {
    const source = node.loc.source
    const start = /^\s*/.exec(source)?.[0] || ''
    const end = /\s*$/.exec(source)?.[0] || ''
    replacements.push(source.slice(start.length, source.length - end.length))
    return `${start}<M${replacements.length - 1} />${end}`
  }

  let source = node.type === NodeTypes.ROOT ? fullSource : node.loc.source

  // Replace child fragments with formatted versions
  if (node.children?.length) {
    for (const child of node.children) {
      const original = child.loc.source
      const replacement = processNode(child, fullSource)
      source = source.replace(original, replacement)
    }
  }

  return source
}

const rootSource = sfc.descriptor.template!.content
let formatted = processNode(templateAst, rootSource)

// replacements.forEach((rep, index) => {
//   formatted = formatted.replace(`<M${index} />`, '\n' + rep + '\n')
// })

console.log('Formatted Output:\n')
console.log(formatted)

// function format(source: string): string {
//   console.log('format called with:', { source })
//   if (
//     source.includes('</div>') &&
//     !source.includes('<M2 />') &&
//     !source.includes('<M5 />')
//   ) return ``
//   return source
// }

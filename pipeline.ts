import { NodeTypes, type ParentNode, type TemplateChildNode } from '@vue/compiler-core'
import { parse } from '@vue/compiler-sfc'
import prettier from 'prettier'

console.time('formatting')

const md = `\
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

const wrapped = `<template>${md}</template>`
  .replace(/\r\n/g, '\n')

const sfc = parse(wrapped)
const templateAst = sfc.descriptor.template?.ast
if (!templateAst) throw new Error('Failed to parse template')

const replacements: string[] = [
  '\n',
]

function walk(node: ParentNode | TemplateChildNode): string {
  if (node.type !== NodeTypes.ELEMENT && node.type !== NodeTypes.ROOT) {
    const source = node.loc.source
    const start = /^\s*/.exec(source)?.[0] || ''
    const end = /\s*$/.exec(source)?.[0] || ''

    replacements.push(source.slice(start.length, source.length - end.length))

    return `${start}<M${replacements.length - 1} />${end}`
  }

  let source = node.type === NodeTypes.ROOT ? sfc.descriptor.template!.content : node.loc.source

  if (node.children?.length) {
    let hasMarkdown = false

    for (const child of node.children) {
      const original = child.loc.source
      let replacement = walk(child)

      if (!hasMarkdown && original.startsWith('\n\n')) {
        replacement = `\n<M0>\n${replacement}`
        hasMarkdown = true
      }
      if (child === node.children.at(-1) && hasMarkdown) {
        replacement = `${replacement}\n</M0>\n`
      }

      source = source.replace(original, replacement)
    }
  }

  return source
}

let formatted = `<template>${walk(templateAst)}</template>`

formatted = await prettier.format(formatted, {
  parser: 'vue',
  endOfLine: 'lf',
  useTabs: false,
  tabWidth: 2,
})

// TODO: replace M0 markers with blank lines and dedent inner content, handle nesting too
// then dedent outer html content to max 2 spaces to avoid rendering them as code blocks

formatted = formatted.replaceAll(/<M(\d+) \/>/g, (match, index) => {
  return replacements[Number(index)] ?? match
})

formatted = formatted
  .replace(/^\s*<template>|<\/template>\s*$/g, '')
  .replace(/^ {2}/gm, '')

formatted = await prettier.format(formatted, { parser: 'markdown' })

console.log(formatted)

console.timeEnd('formatting')

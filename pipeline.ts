import { NodeTypes, type ParentNode, type TemplateChildNode } from '@vue/compiler-core'
import { parse } from '@vue/compiler-sfc'
import prettier from 'prettier'

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

function addMarkers(md: string, replacements: string[]): string {
  const wrapped = `<template>${md}</template>`
    .replace(/\r\n/g, '\n')

  const sfc = parse(wrapped)
  const templateAst = sfc.descriptor.template?.ast
  if (!templateAst) throw new Error('Failed to parse template')

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

  return walk(templateAst)
}

function removeMarkers(vue: string, replacements: string[]): string {
  const sfc = parse(vue)
  const templateAst = sfc.descriptor.template?.ast
  if (!templateAst) throw new Error('Failed to parse template')

  function walk(_node: ParentNode | TemplateChildNode): { source: string; dedent: boolean } {
    // STUB
    const source = vue.replaceAll(/<M(\d+) \/>/g, (match, index) => {
      return replacements[Number(index)] ?? match
    }).replace(/^\s*<template>/, '').replace(/<\/template>\s*$/, '')

    return { source, dedent: true }
  }

  return walk(templateAst).source.replace(/^ {2}/gm, '')
}

async function format(md: string): Promise<string> {
  const replacements = ['\n']

  let formatted = `<template>${addMarkers(md, replacements)}</template>`
  formatted = await prettier.format(formatted, {
    parser: 'vue',
    endOfLine: 'lf',
    useTabs: false,
    tabWidth: 2,
  })

  formatted = removeMarkers(formatted, replacements)
  formatted = await prettier.format(formatted, { parser: 'markdown' })

  return formatted
}

console.time('formatting')
console.log(await format(md))
console.timeEnd('formatting')

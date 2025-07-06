import { NodeTypes, type ParentNode, type TemplateChildNode } from '@vue/compiler-core'
import { parse } from '@vue/compiler-sfc'
import prettier from 'prettier'

const md = `\
#  *Test*

## 1

<div> <h1 v-if="showHeader">Conditional Header</h1> <p v-else>No Header</p> <p>This is a Vue 3 template</p> <button @click="clickHandler">Click Me</button> </div>

## 2

 <template v-for="item in items" :key="item.id"> <p>{{  item.name  }}</p> </template>

## 3

  <form @submit.prevent="submitForm"> <input v-model="name" placeholder="Enter name" /> <input v-model="age" type="number" placeholder="Enter age" /> <button type="submit">Submit</button> </form>

## 4

   <div> <ChildComponent> <template #[dynamicSlotName] v-slot="{ text, count }"> {{ text }} {{ count }} </template> </ChildComponent> </div>
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
      if (source.trim() === '') return source
      if (node.type === NodeTypes.INTERPOLATION) return source

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

        if (node.type === NodeTypes.ELEMENT && !hasMarkdown && original.startsWith('\n\n')) {
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

  function walk(node: ParentNode | TemplateChildNode): { source: string; dedent: boolean } {
    if (node.type !== NodeTypes.ELEMENT && node.type !== NodeTypes.ROOT) {
      return { source: node.loc.source, dedent: false }
    }

    let source = node.type === NodeTypes.ROOT ? sfc.descriptor.template!.content : node.loc.source
    let dedent = false

    if (node.type === NodeTypes.ELEMENT) {
      const i = /^M(\d+)$/.exec(node.tag)
      if (i) {
        const index = Number(i[1])
        if (index !== 0 && index < replacements.length) {
          return { source: replacements[index]!, dedent: false }
        }
      }
    }

    if (node.children?.length) {
      for (const child of node.children) {
        const original = child.loc.source

        let { source: replacement, dedent: _dedent } = walk(child)
        dedent ||= _dedent

        if (child.type === NodeTypes.ELEMENT && child.tag === 'M0') {
          replacement = replacement.replace(/^<M0>/, '\n').replace(/<\/M0>$/, '\n')
          dedent = true
        }

        source = source.replace(original, replacement)
      }

      if (dedent) {
        source = source.replace(/^ {2}/gm, '')
      }
    }

    return { source, dedent }
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

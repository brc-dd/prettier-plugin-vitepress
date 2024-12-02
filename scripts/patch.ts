import { Lang, parse } from '@ast-grep/napi'
import denoJson from '../deno.json' with { type: 'json' }

const version = denoJson.imports.prettier.split('@')[1]

const res = await fetch(`https://esm.sh/v135/prettier@${version}/es2022/plugins/markdown.js`)
const code = (await res.text()).replace(/\/\/# sourceMappingURL=.*\.js\.map/g, '')

const root = parse(Lang.JavaScript, code).root()

const node1 = root.find('$A&&{blocks:[$B]}')!
const n1$A = node1.getMatch('A')!.text()

const node2 = root.find(`$A.use(${n1$A}?$B:$C).use($D).use`)!
const n2$A = node2.getMatch('A')!.text()
const n2$D = node2.getMatch('D')!.text()

const edit1 = node2.replace(`${n2$A}.use(${n2$D}).use`)
const transformed = root.commitEdits([edit1]).toString()

try {
  await Deno.mkdir('./vendor', { recursive: true })
} catch (err) {
  if (!(err instanceof Deno.errors.AlreadyExists)) {
    throw err
  }
}

await Deno.writeTextFile('./vendor/prettier-plugin-markdown.js', transformed)
await Deno.writeTextFile(
  './vendor/prettier-plugin-markdown.d.ts',
  `
import type { Parser, Plugin, Printer } from 'prettier'

declare const md: Plugin & {
  parsers: Record<'markdown' | 'mdx' | 'remark', Parser>
  printers: { mdast: Printer & Required<Pick<Printer, 'embed'>> }
}

export default md
`.trimStart(),
)

import { denoPlugins } from '@luca/esbuild-deno-loader'
import * as esbuild from 'esbuild'
import { parseArgs } from '@std/cli'

const flags = parseArgs(Deno.args, {
  boolean: ['minify'],
  string: ['version'],
})

const version = flags.version ?? flags._[0]

if (!version) {
  console.error('--version is required')
  Deno.exit(1)
}

await Deno.remove('npm', { recursive: true })

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ['src/index.ts'],
  outfile: 'npm/index.js',
  bundle: true,
  format: 'esm',
  external: ['prettier'],
  minify: flags.minify,
})

await Deno.writeTextFile(
  'npm/package.json',
  JSON.stringify({
    name: 'prettier-plugin-vitepress',
    version,
    description: 'a prettier plugin to format vue in markdown syntax used in vitepress',
    keywords: ['prettier', 'vitepress', 'vue', 'markdown'],
    repository: {
      type: 'git',
      url: 'git+https://github.com/brc-dd/prettier-plugin-vitepress.git',
    },
    funding: 'https://github.com/sponsors/brc-dd',
    license: 'MIT',
    author: 'Divyansh Singh <brc-dd@hotmail.com> (https://github.com/brc-dd)',
    sideEffects: false,
    type: 'module',
    main: 'index.js',
    peerDependencies: {
      prettier: '^3.4.1',
    },
  }),
)

await Deno.copyFile('LICENSE.md', 'npm/LICENSE.md')
await Deno.copyFile('README.md', 'npm/README.md')

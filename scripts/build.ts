import { denoPlugins } from '@luca/esbuild-deno-loader'
import * as esbuild from 'esbuild'
import denoJson from '../deno.json' with { type: 'json' }

try {
  await Deno.remove('dist', { recursive: true })
} catch (err) {
  if (!(err instanceof Deno.errors.NotFound)) {
    throw err
  }
}

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: [denoJson.exports],
  outfile: 'dist/index.js',
  bundle: true,
  format: 'esm',
  external: ['prettier'],
  minify: !!Deno.env.get('CI'),
  target: 'node18',
})

await Deno.writeTextFile(
  'dist/package.json',
  JSON.stringify({
    name: denoJson.name,
    version: denoJson.version,
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
      prettier: denoJson.imports.prettier.split('@')[1],
    },
  }),
)

await Deno.copyFile('LICENSE.md', 'dist/LICENSE.md')
await Deno.copyFile('README.md', 'dist/README.md')

// TODO: make it more generic, emit dts files too

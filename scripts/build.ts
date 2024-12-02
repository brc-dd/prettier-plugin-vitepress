import { denoPlugins } from '@luca/esbuild-deno-loader'
import { emptyDir } from '@std/fs'
import * as esbuild from 'esbuild'
import tsid from 'unplugin-isolated-decl/esbuild'
import denoJson from '../deno.json' with { type: 'json' }

const pick = [
  'name',
  'version',
  'description',
  'keywords',
  'repository',
  'funding',
  'license',
  'author',
] as const

const peerDeps = ['prettier'] as const
const minify = Deno.env.get('CI') === 'true'
const exports = typeof denoJson.exports === 'string' ? { '.': denoJson.exports } : denoJson.exports

await emptyDir('dist')

const res = await esbuild.build({
  plugins: [tsid(), ...denoPlugins()],
  entryPoints: Object.values(exports),
  outdir: 'dist',
  bundle: true,
  format: 'esm',
  platform: 'neutral',
  target: 'es2022',
  external: ['prettier'],
  metafile: true,
  minify,
})

const outputs = Object.fromEntries(
  Object.entries(res.metafile.outputs).flatMap(([key, value]) =>
    value.entryPoint ? [['./' + value.entryPoint, key.replace('dist/', './')]] : []
  ),
)

await Deno.writeTextFile(
  'dist/package.json',
  JSON.stringify(
    {
      ...Object.fromEntries(pick.map((key) => [key, denoJson[key]])),
      type: 'module',
      exports: Object.fromEntries(
        Object.entries(exports).map(([key, value]) => [key, outputs[value]]),
      ),
      peerDependencies: Object.fromEntries(
        peerDeps.map((dep) => [dep, denoJson.imports[dep].split('@')[1]]),
      ),
    },
    null,
    minify ? 0 : 2,
  ),
)

await Deno.copyFile('LICENSE.md', 'dist/LICENSE.md')
await Deno.copyFile('README.md', 'dist/README.md')

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

const formatted = await prettier.format(md, {
  parser: 'markdown',
})

console.log(formatted)

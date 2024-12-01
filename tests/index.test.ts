import prettier from 'prettier'
import plugin from '../src/index.ts'
import { assertEquals } from '@std/assert'

Deno.test('plugin', async (t) => {
  await t.step('should format vue in markdown', async () => {
    const code = `
---
yaml:  frontmatter
---

#  *Test*

## 1

<div> <h1 v-if="showHeader">Conditional Header</h1> <p v-else>No Header</p> <p>This is a Vue 3 template</p> <button @click="clickHandler">Click Me</button> </div>

## 2

 <template v-for="item in items" :key="item.id"> <p>{{  item.name  }}</p> </template>

## 3

  <form @submit.prevent="submitForm"> <input v-model="name" placeholder="Enter name" /> <input v-model="age" type="number" placeholder="Enter age" /> <button type="submit">Submit</button> </form>

## 4

   <div> <ChildComponent> <template #[dynamicSlotName] v-slot="{ text, count }"> {{ text }} {{ count }} </template> </ChildComponent> </div>

## 5

  <script setup lang="ts">import { defineProps } from 'vue'; const props = defineProps<{ name: string, age: number }>();</script>

## 6

  <style scoped>h1 { color: red; }</style>

## 7

Inline vue code <strong>  {{  item.name  }}  </strong> <em>  italic  </em> <pre>  code  </pre>

## 8

Comments <!-- comment -->

<!-- multiline
comment
-->
`

    const expected = `
---
yaml: frontmatter
---

# _Test_

## 1

<div>
  <h1 v-if="showHeader">Conditional Header</h1>
  <p v-else>No Header</p>
  <p>This is a Vue 3 template</p>
  <button @click="clickHandler">Click Me</button>
</div>

## 2

<template v-for="item in items" :key="item.id">
  <p>{{ item.name }}</p>
</template>

## 3

<form @submit.prevent="submitForm">
  <input v-model="name" placeholder="Enter name" />
  <input v-model="age" type="number" placeholder="Enter age" />
  <button type="submit">Submit</button>
</form>

## 4

<div>
  <ChildComponent>
    <template #[dynamicSlotName] v-slot="{ text, count }">
      {{ text }} {{ count }}
    </template>
  </ChildComponent>
</div>

## 5

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{ name: string; age: number }>();
</script>

## 6

<style scoped>
h1 {
  color: red;
}
</style>

## 7

Inline vue code <strong> {{ item.name }} </strong> <em> italic </em> <pre>  code  </pre>

## 8

Comments <!-- comment -->

<!-- multiline
comment
-->
`.trimStart()

    const result = await prettier.format(code, {
      parser: 'markdown',
      plugins: [plugin],
    })

    assertEquals(result, expected)
  })
})

// TODO:
// - handle liquidNode (tc 7)

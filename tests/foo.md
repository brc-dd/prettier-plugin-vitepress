<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Help me write tests for a formatter for vitepress on which I'm working on. I'm currently focussing on vue in markdown syntax used by vuepress/vitepress and want to generate excessive tests. Can you generate a large markdown file with vue in markdown code depicting everything from basic components to various edge cases. Keep it unformatted, I'll format it later, fix any discovered issues in edge cases, and add snapshots as tests. write in markdown code block.

```markdown
# VitePress Vue-in-Markdown Formatter Test File

## Basic Vue Component

<DemoComponent />

## Vue Component with Props

<Alert type="success" message="Operation successful!" />

<Alert type="error" message="Something went wrong." />

## Vue Component with Slots

<Card>
  <template #header>
    <h3>Card Header</h3>
  </template>
  <p>This is the card body.</p>
  <template #footer>
    <span>Card Footer</span>
  </template>
</Card>

## Vue Component with Multiple Props and Slots

<CustomButton color="primary" size="large">
  <span>Click Me</span>
</CustomButton>

## Vue Component with Event Handlers

<Counter @increment="onIncrement" :count="5" />

## Vue Component with v-bind and v-on

<MyInput v-model="inputValue" @input="onInput" />

## Vue Component with Dynamic Props

<DynamicComponent :is="componentName" :data="dynamicData" />

## Vue Component with Inline Expressions

<Badge :count="items.length" />

## Vue Component with Boolean Props

<ToggleSwitch :checked="true" />

## Vue Component with Array/Object Props

<DataTable :rows="[{id:1, name:'A'}, {id:2, name:'B'}]" />

## Vue Component with Complex Nested Content

<Accordion>
  <AccordionItem title="Section 1">
    <p>Content for section 1</p>
    <NestedComponent :foo="bar" />
  </AccordionItem>
  <AccordionItem title="Section 2">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </AccordionItem>
</Accordion>

## Vue Component with Markdown Inside

<InfoBox>
  **Bold text inside component**

  - List item 1
  - List item 2

  [Link](https://vitepress.dev)
</InfoBox>

## Vue Component with HTML Inside

<HtmlBox>
  <div>
    <span style="color: red;">Red Text</span>
  </div>
</HtmlBox>

## Vue Component with Code Block Inside

<CodeBlock>
```

console.log('Hello, world!');

```
</CodeBlock>

## Vue Component with Escaped Characters

<EscapeTest prop="&lt;div&gt;Test&lt;/div&gt;" />

## Vue Component with Self-Closing Tag

<Divider />

## Vue Component with No Props or Content

<EmptyComponent />

## Vue Component with Comments

<!-- This is a comment before the component -->
<CommentedComponent />
<!-- This is a comment after the component -->

## Vue Component with Unusual Indentation

  <IndentedComponent
    prop1="value1"
    prop2="value2"
  />

## Vue Component with Line Breaks in Props

<MultiLineProps
foo="bar"
baz="qux"
/>

## Vue Component with Special Characters in Props

<SpecialChars prop="!@#$%^&*()_+-=[]{}|;':,.<>/?`~" />

## Vue Component with Unicode in Props

<UnicodeTest prop="你好，世界🌏" />

## Vue Component with Empty Slot

<SlotTest>
</SlotTest>

## Vue Component with Only Whitespace in Slot

<SlotTest>

</SlotTest>

## Vue Component with Nested Components

<Parent>
<Child>
  <GrandChild />
</Child>
</Parent>

## Vue Component with Markdown Table Inside

<TableBox>
| Name | Value |
|------|-------|
| Foo  | Bar   |
</TableBox>

## Vue Component with List Inside

<ListBox>
- Item 1
- Item 2
</ListBox>

## Vue Component with HTML Comments Inside

<CommentBox>
<!-- This is an HTML comment inside the slot -->
<span>Visible content</span>
</CommentBox>

## Vue Component with Multiple Root Elements in Slot

<MultiRoot>
<div>First root</div>
<div>Second root</div>
</MultiRoot>

## Vue Component with Conditional Rendering

<Conditional v-if="show" />

## Vue Component with v-for

<ListRenderer :items="[1,2,3]" v-for="item in items" :key="item" />

## Vue Component with Scoped Slot

<ScopedSlotTest v-slot="{ item }">
<span>{{ item.name }}</span>
</ScopedSlotTest>

## Vue Component with Inline Template

<InlineTemplate>
<template v-if="show">
  <span>Visible</span>
</template>
<template v-else>
  <span>Hidden</span>
</template>
</InlineTemplate>

## Vue Component with Custom Directives

<DirectiveTest v-custom="value" />

## Vue Component with Dynamic Arguments

<DynamicArgTest :[dynamicProp]="value" />

## Vue Component with Multiple Events

<EventTest @click="onClick" @hover="onHover" />

## Vue Component with v-html

<HtmlContent v-html="rawHtml" />

## Vue Component with v-text

<TextContent v-text="textValue" />

## Vue Component with v-show

<ShowComponent v-show="isVisible" />

## Vue Component with v-pre

<PreComponent v-pre>
{{ this will not be compiled }}
</PreComponent>

## Vue Component with v-once

<OnceComponent v-once />

## Vue Component with v-cloak

<CloakComponent v-cloak />

## Vue Component with v-slot Shorthand

<SlotShorthand #default="{ foo }">
<span>{{ foo }}</span>
</SlotShorthand>

## Vue Component with Multiple v-slot

<MultiSlot>
<template #header>Header</template>
<template #default>Default</template>
<template #footer>Footer</template>
</MultiSlot>

## Vue Component with Deeply Nested Slots

<DeepSlot>
<template #outer>
  <InnerSlot>
    <template #inner>
      <span>Deep content</span>
    </template>
  </InnerSlot>
</template>
</DeepSlot>

## Vue Component with Edge Case: Unclosed Tag

<UnclosedComponent

## Vue Component with Edge Case: Malformed Props

<MalformedProps foo=bar baz />

## Vue Component with Edge Case: Invalid Characters

<InvalidChars prop="😀🚀💥" />

## Vue Component with Edge Case: Large Number of Props

<ManyProps
a="1"
b="2"
c="3"
d="4"
e="5"
f="6"
g="7"
h="8"
i="9"
j="10"
k="11"
l="12"
m="13"
n="14"
o="15"
p="16"
q="17"
r="18"
s="19"
t="20"
/>

## Vue Component with Edge Case: Props with Spaces

<SpaceProps prop1="value with spaces" prop2="another value" />

## Vue Component with Edge Case: Props with Newlines

<NewlineProps prop="line1
line2
line3" />

## Vue Component with Edge Case: Slot with Only Comments

<CommentSlot>
<!-- Only a comment, no content -->
</CommentSlot>

## Vue Component with Edge Case: Slot with Only HTML Entities

<EntitySlot>
&amp; &lt; &gt; &quot; &apos;
</EntitySlot>

## Vue Component with Edge Case: Slot with Only Whitespace and Entities

<WhitespaceEntitySlot>

&nbsp; &copy; &reg;

</WhitespaceEntitySlot>

## Vue Component with Edge Case: Slot with Only Vue Expressions

<ExpressionSlot>
{{ 1 + 1 }}
</ExpressionSlot>

## Vue Component with Edge Case: Slot with Only Raw Text

<RawTextSlot>
Just some text, nothing else.
</RawTextSlot>

## Vue Component with Edge Case: Slot with Only Markdown Syntax

<MarkdownSlot>
**Bold**
_Italic_
`Code`
> Blockquote
</MarkdownSlot>
```

---
title: "Vue in Markdown Tests"
description: "Comprehensive test cases for Vue syntax in VitePress markdown"
---

# 1. Basic Inline Component

<HelloWorld msg="Hello, VitePress!" />

# 2. Block Component

<HelloWorld
  msg="Block Component Test"
>
</HelloWorld>

# 3. Self-Closing Component

<MyComponent prop1="value1" prop2="value2" />

# 4. Component with Slot

<Wrapper>
  <template #default>
    <p>Default slot content</p>
  </template>
  <template v-slot:footer>
    <small>Footer content</small>
  </template>
</Wrapper>

# 5. Component with Dynamic Props

<DynamicComponent :items="list" :config="{ size: 10, color: 'red' }" />

# 6. Directive Usage

<template>
  <div v-if="show" v-for="(item, index) in items" :key="index">
    {{ item }}
  </div>
</template>

# 7. Event Handling

<Button @click="handleClick" @mouseover="hoverHandler">
  Click me
</Button>

# 8. v-model Binding

<input v-model="username" placeholder="Enter your name" />

# 9. Class and Style Binding

<div :class="{ active: isActive }" :style="{ color: activeColor, fontSize: fontSize + 'px' }">
  Styled text
</div>

# 10. Computed Prop Usage

<ComputedDisplay :value="computedValue" />

# 11. Script Setup Block

\`\`\`vue
<script setup>
import { ref, computed } from 'vue';
const count = ref(0);
function increment() {
  count.value++;
}
const doubled = computed(() => count.value * 2);
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
  <p>Doubled: {{ doubled }}</p>
</template>
\`\`\`

# 12. Raw HTML Mixed

<div>
  <p>This is raw HTML inside markdown</p>
  <CustomHtmlComponent attr="test"></CustomHtmlComponent>
</div>

# 13. Nested Components

<Parent>
  <ChildA />
  <ChildB>
    <GrandChild msg="Nested test" />
  </ChildB>
</Parent>

# 14. Edge Case: Unclosed Tag

<BrokenComponent prop="oops"

# 15. Edge Case: Incorrectly Cased Tag

<mycomponent>Should not render if case-sensitive</mycomponent>

# 16. Edge Case: Inline Mustache in Text

The value is {{ value }} inside a paragraph.

# 17. Edge Case: Curly Braces in Code Fence

\`\`\`js
// This should not be picked up as Vue interpolation:
const obj = { foo: "{{ notInterpolation }}" };
\`\`\`

# 18. Edge Case: Multiline Attributes

<MultiAttrComponent
  prop-a="line1"
  prop-b="line2"
  propC="line3"
/>

# 19. Edge Case: Comments Inside Component

<WithComments>
  <!-- This is a comment -->
  <span>Text</span>
  <!-- Another comment -->
</WithComments>

# 20. Edge Case: Template Rootless (multiple roots)

<template>
  <div>Root 1</div>
  <div>Root 2</div>
</template>

# 21. Edge Case: Functional Component

<FunctionalComp :data="items.map(item => item.id)" />

# 22. Edge Case: Dynamic Component Tag

<component :is="currentComponent" v-bind="props" />

# 23. Inline HTML Tag with Vue Syntax

<button disabled :disabled="isDisabled">Submit</button>

# 24. Code Fence with Vue Highlight

\`\`\`vue
<template>
  <MyFancyComponent :foo="bar">
    <template #header>
      <h1>{{ title }}</h1>
    </template>
  </MyFancyComponent>
</template>
<script>
export default {
  props: ['bar', 'title']
}
</script>
\`\`\`

# 25. Frontmatter Boundary Test

---
frontmatter: true
---
Content after frontmatter should still parse components like <TestComp />

# 26. Edge Case: Escaped Angle Brackets

&lt;NotAComponent&gt;Just text&lt;/NotAComponent&gt;

# 27. Edge Case: Component with Dash in Name

<my-custom-component message="dash-name works" />

# 28. Edge Case: Inline Vue Filter (deprecated but test)

<p>{{ message | uppercase }}</p>

# 29. Complex Nested Slots

<Layout>
  <template #sidebar>
    <Sidebar>
      <Menu>
        <MenuItem v-for="i in 3" :key="i" :label="'Item ' + i" />
      </Menu>
    </Sidebar>
  </template>
  <template #content>
    <Article :id="123" />
  </template>
</Layout>

# 30. Comments Outside Components

<!-- Just a markdown-level HTML comment -->

# 31. Edge Case: Script Tag without Setup

\`\`\`html
<script>
export default {
  name: 'NoSetup'
}
</script>
\`\`\`

# 32. Edge Case: Markdown List with Component

- Item 1
- <ListItem text="Item 2" />
- Item 3

# 33. Edge Case: Table with Vue Syntax

| Name                | Component                          |
| ------------------- | ---------------------------------- |
| Basic               | <BasicComp />                      |
| With Attributes     | <AttrComp foo="bar" baz="qux" />   |
| Nested              | <Parent><Child /></Parent>         |

# 34. Edge Case: HTML Entities in Props

<MyEntityComp title="5 &lt; 10 &amp; 20 &gt; 15" />

# 35. Edge Case: Multiple `<script>` Blocks

\`\`\`vue
<script setup>const a = 1;</script>
<script>export default { mounted() { console.log(a); } }</script>
\`\`\`

# 36. Edge Case: Template with Comments and Text

<template>
  <!-- start -->
  Hello <!-- inline comment --> World
  <!-- end -->
</template>

# 37. Custom Delimiters Example

<script setup>
import { defineComponent } from 'vue';
</script>
<template>
  <DelimiterComp v-slot="slotProps">
    [[ slotProps.message ]]
  </DelimiterComp>
</template>

# 38. Edge Case: Attribute with Backticks

<BacktickComp info="\`inline code\` should be literal" />

# 39. Vue i18n Interpolation

<p>{{ $t('hello.world') }}</p>

# 40. Closing Summary

This document covers basic to advanced and edge-case Vue syntax in markdown. Ensure your formatter handles all the above correctly.

Of course\! Generating a comprehensive, unformatted markdown file with a wide variety of Vue syntax is an excellent way to stress-test a formatter. The deliberate lack of consistent formatting, random spacing, and mixed syntax will help you uncover many edge cases.

Here is a large markdown file designed for this purpose. It contains everything from basic components to complex scenarios involving directives, slots, and nesting within markdown elements.

-----

````markdown
<script setup>
import MyCustomComponent from './MyCustomComponent.vue'
const message = 'Hello from <script setup>!'
const count = ref(10)
const isActive = true
const user = { name: 'John Doe', roles: ['admin', 'editor'] }
const items = [
  { id: 1, text: 'First Item', done: true },
  { id: 2, text: 'Second Item', done: false },
  { id: 3, text: 'Third Item', done: true }
]
const dynamicId = 'my-dynamic-element-id'
const handleClick = () => {
  alert('Button clicked!')
}
const handleSubmit = (event) => {
  console.log('Form submitted', event)
}
</script>

# VitePress Vue Component Test Document

This document tests various Vue component syntaxes within Markdown.

## 1. Basic Component Usage

Let's start with the basics. Here are some simple components.

A self-closing component: <MyButton/>
Another self-closing component with a space: <MyComponent />
And a kebab-case one: <my-component />

A component with a default slot:
<Card>This is the content for the card.</Card>

A component with more complex content, including **markdown**.
<Container>
  ## A Sub-heading
  This is a paragraph with `inline code`.

  - List item 1
  - List item 2
</Container>

A component with no space between tag and content:
<Badge>New</Badge>

## 2. Props and Attributes

This section tests all sorts of props.

### Static Props

<ComponentWithProps
  stringProp="A simple string"
  anotherProp='Using single quotes'
   spacedProp = "This has spaces around equals"
/>

### Dynamic Props (v-bind)

Full `v-bind`:
<UserProfile v-bind:user="user" v-bind:is-active="isActive"></UserProfile>

Shorthand `:`. This one is messy on purpose.
<DataDisplay
:message="message" :count="count"
:is-active="true"
:is-inactive="false"
:user-roles="['guest', 'reader']"
:config="{ theme: 'dark', notifications: { enabled: true } }"
/>

### Boolean Props

Shorthand boolean prop:
<CustomInput disabled />

Explicitly bound boolean:
<CustomInput :required="true" />

### Mixed Props

A component with static, dynamic, and boolean props all mixed together.
<ComplexComponent
  id="static-id"
  :dynamic-id="dynamicId"
  class="p-4 bg-blue-100"
  :style="{ color: 'red', fontSize: '16px' }"
  is-default
  v-bind:data-user="user.name"
  label='A "quoted" label'
/>

Component with attributes split across multiple lines:
<MultiLineComponent
  propA="value A"
  :propB="count * 2"
  propC
  :propD="{
    nested: {
      key: 'value'
    }
  }"
>
  Some content here.
</MultiLineComponent>

## 3. Event Handling (v-on)

Testing event handlers with `v-on` and `@`.

<InteractiveButton v-on:click="handleClick"/>
<InteractiveButton @click="handleClick" />

With an inline handler:
<SubmitButton @click="console.log('inline click!')" />

With arguments:
<Form @submit="handleSubmit(item, $event)" />

With modifiers. Notice the inconsistent spacing.
<Link @click.prevent.stop="doSomething" href="/"/>
<form @submit.prevent ></form>

## 4. Slots

Testing default, named, and scoped slots.

### Named Slots

Using `v-slot:`
<TwoColumnLayout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>

  <template v-slot:footer>
    <p>Contact us</p>
  </template>
</TwoColumnLayout>

Using the `#` shorthand.
<TwoColumnLayout>
  <template #header>
    <h1>Shorthand Header</h1>
  </template>

  <template #default>
  This is the *default* slot content.
  </template>

  <template #footer>
    <p>Shorthand Footer</p>
  </template>
</TwoColumnLayout>

### Scoped Slots

<TodoList :items="items">
  <template #item="{ item, index }">
    <div :class="{ done: item.done }">
      {{ index + 1 }}. {{ item.text }}
    </div>
  </template>
</TodoList>

A messy one with inconsistent syntax:
<DataList :source="items">
<template #default="{item,idx, random}">
  <span>{{idx}}: {{item.text}}</span>
</template>
</DataList>

## 5. Directives

Testing `v-if`, `v-for`, `v-show` etc.

### `v-if`, `v-else-if`, `v-else`

<div v-if="count > 10">Count is large.</div>
<p v-else-if="count > 5">Count is medium.</p>
<span v-else>Count is small.</span>

On a `<template>` tag:
<template v-if="user">
  <UserProfile :user="user" />
</template>
<template v-else>
  <LoginButton/>
</template>

### `v-for`

<ul v-for="item in items" :key="item.id">
  <li>{{ item.text }}</li>
</ul>

With index:
<div v-for="(item, index) in items" :key="item.id">
  {{ index }} - {{ item.text }}
</div>

On a `<template>` tag with `v-if`:
<template v-for="item in items" :key="item.id">
  <div v-if="!item.done">
    <TodoItem :item="item" />
  </div>
</template>

### `v-show`

<AlertBox v-show="isActive" type="info">This is an active alert.</AlertBox>

### `v-html` and `v-text`

<div v-html="'<strong>This should be bold</strong>'"></div>
<p v-text="message"></p>


## 6. Extreme Edge Cases & Nesting

This section combines everything in weird ways.

### Component inside Markdown Elements

- A list item with a component: <Badge text="Urgent" />
- Another list item.
  - A nested list item with a badly formatted component:
    <AlertBox type='warning'  title="Nested Alert"   >Content inside component in a list.</AlertBox>

> A blockquote with a component.
> <CardComponent   :padding="2"   >
> ## Markdown Header Inside Slot
>
> This is **bold text** inside a component slot, which is inside a blockquote.
> </CardComponent>

### HTML and Vue Components Mixed

<div>
    <p>Standard HTML paragraph.</p>
    <MyButton label='Click Me!' @click="handleClick" >
      <span>Icon</span>
      Click
    </MyButton>
    <hr />
    <div class="some-html-class">
        <p>Nesting further.</p>
        <ComponentInsideHtml :prop="1+2+3" />
    </div>
</div>


### Invalid or Tricky Syntax

A component with no space between attributes:
<InvalidComponent propA="1"propB="2"/>

A self-closing tag with content (invalid, but good to test parser robustness):
<SelfClosingWithContent/>
This content should not be associated with the above component.

A component tag inside a code block should be ignored:
`This is not a component: <MyButton />`

```vue
<template>
  <MyButton @click="handler" />
</template>
````

### Components with weird prop values

\<PropTester weirdProp="a string with 'single' and "double" quotes" /\>

\<PropTester multilineProp="this is a very long
string that spans multiple
lines in the attribute." /\>

## 7\. Imported and Global Components

Using a component imported in the script setup block.
\<MyCustomComponent title="From Script Setup" /\>

VitePress also has built-in components.
\<VPBadge text="Built-in" type="info" /\>
\<VPCard
title="Built-in Card"
href="/"

> 

Testing built-in components.
\</VPCard\>

-----

This is the end of the test file. A formatter should be able to parse all of the above Vue syntax and re-format it into a consistent and readable style.

\<style scoped\>
.done {
text-decoration: line-through;
opacity: 0.7;
}
div {
margin-top: 8px;
}
\</style\>

```
```
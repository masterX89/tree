<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <Input />
  <Tree />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Input from './components/Input'
import Tree from './components/Tree'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Input,
    Tree,
  },
}
</script>

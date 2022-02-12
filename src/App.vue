<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <Input />
  <Tree :data="treeData" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Input from './components/Input'
import Tree from './components/Tree'

function createData(level = 4, baseKey = '') {
  if (!level) return undefined
  return Array.apply(null, { length: level === 1 ? 2 : 1 }).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel(level) {
  if (level === 4) return '第一层'
  if (level === 3) return '第二层'
  if (level === 2) return '第三层'
  if (level === 1) return '第四层'
}

export default {
  name: 'App',
  components: {
    HelloWorld,
    Input,
    Tree
  },
  data() {
    return {
      treeData: createData()
    }
  }
}
</script>

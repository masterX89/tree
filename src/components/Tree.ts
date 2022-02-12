import { defineComponent, h, ref, computed } from 'vue'
import { createTreeMate } from 'treemate'

export default defineComponent({
  name: 'Tree',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const visible = ref('none')
    // const treeMateRef = createTreeMate(props.data)
    const treeMateRef = computed(() => createTreeMate(props.data))
    function handleClick() {
      if (visible.value === 'none') {
        visible.value = 'block'
      } else if (visible.value === 'block') {
        visible.value = 'none'
      }
    }
    console.log(treeMateRef)
    return {
      visible,
      tmNodes: computed(() => treeMateRef.value.treeNodes),
      handleClick
    }
  },
  render() {
    const { visible, handleClick, tmNodes } = this
    // TODO: Remove this when we have TreeNode and TreeContent
    console.log(tmNodes)
    return h('div', {}, [
      h('li', {}, [h('span', 'aaa')]),
      h(
        'li',
        {
          onClick: handleClick
        },
        [
          'title',
          h(
            'ul',
            {
              style: {
                display: visible
              }
            },
            [h('li', 'bb'), h('li', 'ccc')]
          )
        ]
      )
    ])
  }
})

import { defineComponent, h, ref, computed } from 'vue'
import TreeNode from './TreeNode'
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
    // TODO: find out different in computed and without computed
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
      treeMateNodes: computed(() => treeMateRef.value.treeNodes),
      handleClick
    }
  },
  render() {
    const { visible, handleClick, treeMateNodes } = this
    return h(
      'div',
      {},
      treeMateNodes.map((treeMateNode) =>
        h(TreeNode, {
          treeMateNode,
          key: treeMateNode.key
        })
      )
    )
  }
})

import { defineComponent, h, render } from 'vue'
import TreeNodeSwitcher from './TreeNodeSwitcher'

const TreeNode = defineComponent({
  name: 'TreeNode',
  props: {
    treeMateNode: Object
  },
  setup(props) {},
  render() {
    const { treeMateNode } = this

    return h('li', {}, [
      !treeMateNode.isLeaf ? h(TreeNodeSwitcher) : null,
      h(
        'span',
        {},
        {
          default: () => treeMateNode.rawNode.label
        }
      ),
      // TODO: change to `!tmNode.isLeaf && this.expanded && tmNode.children`
      !treeMateNode.isLeaf
        ? h(
            'ul',
            {},
            treeMateNode.children.map((child) =>
              h(TreeNode, {
                treeMateNode: child,
                key: child.key
              })
            )
          )
        : null
    ])
  }
})

export default TreeNode

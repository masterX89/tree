import { defineComponent, h, inject, PropType } from 'vue'
import { useMemo } from 'vooks'
import TreeNodeSwitcher from './TreeNodeSwitcher'
import type { TreeInjection, TreeMateNode } from './interface'

const TreeNode = defineComponent({
  name: 'TreeNode',
  props: {
    treeMateNode: {
      type: Object as PropType<TreeMateNode>,
      required: true
    }
  },
  setup(props) {
    const Tree = inject<TreeInjection>('Tree') as TreeInjection
    const expanded = useMemo(() =>
      Tree.mergedExpandedKeys.includes(props.treeMateNode.key)
    )
    function handleSwitcherClick(): void {
      Tree.handleSwitcherClick(props.treeMateNode)
    }
    return {
      expanded,
      handleSwitcherClick
    }
  },
  render() {
    const { treeMateNode, handleSwitcherClick, expanded } = this

    return h('li', {}, [
      !treeMateNode.isLeaf
        ? h(TreeNodeSwitcher, {
            expanded,
            onClick: handleSwitcherClick
          })
        : null,
      h(
        'span',
        {},
        {
          default: () => treeMateNode.rawNode.label
        }
      ),
      !treeMateNode.isLeaf && expanded && treeMateNode.children
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

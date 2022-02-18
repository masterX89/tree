import {
  defineComponent,
  h,
  ref,
  computed,
  PropType,
  toRef,
  provide,
  reactive
} from 'vue'
import TreeNode from './TreeNode'
import { createTreeMate } from 'treemate'
import { useMergedState } from 'vooks'

import type { Key, TreeInjection, TreeMateNode } from './interface'

export default defineComponent({
  name: 'Tree',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    expandedKeys: Array as PropType<Key[]>,
    defaultExpandedKeys: {
      type: Array as PropType<Key[]>,
      default: () => []
    }
  },
  setup(props) {
    // TODO: find out different in computed and without computed
    // const treeMateRef = createTreeMate(props.data)
    const treeMateRef = computed(() => createTreeMate(props.data))
    const uncontrolledExpandedKeysRef = ref(
      props.defaultExpandedKeys || props.expandedKeys
    )
    const controlledExpandedKeysRef = toRef(props, 'expandedKeys')
    const mergedExpandedKeysRef = useMergedState(
      controlledExpandedKeysRef,
      uncontrolledExpandedKeysRef
    )

    function handleSwitcherClick(treeNode: TreeMateNode): void {
      // 判断 tree 或者 node 是否为 disabled
      // if (props.disabled || treeNode.disabled) return
      const mergedExpandedKeys = mergedExpandedKeysRef.value
      const index = mergedExpandedKeys.findIndex(
        (expandKey) => expandKey === treeNode.key
      )
      if (~index) {
        const expandedKeysAfterChange = Array.from(mergedExpandedKeys)
        expandedKeysAfterChange.splice(index, 1)
        uncontrolledExpandedKeysRef.value = expandedKeysAfterChange
      } else {
        uncontrolledExpandedKeysRef.value = Array.from(
          mergedExpandedKeys
        ).concat(treeNode.key)
      }
    }

    provide<TreeInjection>(
      'Tree',
      reactive({
        mergedExpandedKeys: mergedExpandedKeysRef,
        handleSwitcherClick
      })
    )
    return {
      treeMateNodes: computed(() => treeMateRef.value.treeNodes)
    }
  },
  render() {
    const { treeMateNodes } = this
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

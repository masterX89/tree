import { TreeNode } from 'treemate'

export type Key = string | number

interface TreeOption {
  key: Key
  label: string
  children?: TreeOption[]
}

export type TreeMateNode = TreeNode<TreeOption>

export interface TreeInjection {
  mergedExpandedKeys: Key[]
  handleSwitcherClick: (treeNode: TreeMateNode) => void
}

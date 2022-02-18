import { defineComponent, PropType } from 'vue'
import SwitcherShrinkIcon from '../_internal/icons/SwitcherShrinkIcon'
import SwitcherExpandIcon from '../_internal/icons/SwitcherExpandIcon'

export default defineComponent({
  name: 'TreeNodeSwitcher',
  props: {
    expanded: {
      type: Boolean,
      default: false
    },
    onClick: Function as PropType<(e: MouseEvent) => void>
  },
  setup(props) {},
  render() {
    const { expanded } = this
    return (
      <span onClick={this.onClick}>
        {expanded ? <SwitcherExpandIcon /> : <SwitcherShrinkIcon />}
      </span>
    )
  }
})

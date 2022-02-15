import { defineComponent } from 'vue'
import SwitcherShrinkIcon from '../_internal/icons/SwitcherShrinkIcon'

export default defineComponent({
  name: 'TreeNodeSwitcher',
  props: {},
  setup(props) {},
  render() {
    return (
      <span>
        <SwitcherShrinkIcon />
      </span>
    )
  }
})

import { defineComponent, h, ref } from 'vue'

export default defineComponent({
  name: 'Tree',
  props: {},
  setup(props) {
    const visible = ref('none')
    function handleClick() {
      if (visible.value === 'none') {
        visible.value = 'block'
      } else if (visible.value === 'block') {
        visible.value = 'none'
      }
    }
    return {
      visible,
      handleClick
    }
  },
  render() {
    const { visible, handleClick } = this
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

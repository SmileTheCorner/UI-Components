import { defineComponent, h } from "vue"
export const checked = defineComponent({
  name: "checked",
  setup() {
    return () => h('svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: '24',
        height: '24',
        fill: 'white'
      },
      [h('path', {
        d: 'M21.03 5.72a.75.75 0 0 1 0 1.06l-11.5 11.5a.747.747 0 0 1-1.072-.012l-5.5-5.75a.75.75 0 1 1 1.084-1.036l4.97 5.195L19.97 5.72a.75.75 0 0 1 1.06 0Z',
        stroke: 'black',
        'stroke-width': '2'
      })]
    )
  }
})

export const indeterminate = defineComponent({
  name: "indeterminate",
  setup() {
    return () => h('svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: '24',
        height: '24'
      },
      [h('path', {
        d: 'M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z',
        stroke: '#752bec',
        'stroke-width': '2'
      })]
    )
  }
})
import { defineComponent } from "vue"
import "./index.scss"

const ShButton = defineComponent({
  name: "ShButton",
  props: {
    type: {
      type: String,
      default: "default"
    },
    icon: {
      type: String,
      default: ""
    },
    circle: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "middle",
    },
    text: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "",
    }
  },
  setup(props, ctx) {
    const slot = ctx.slots
    return () => (
      <button class={['sh-button', props.size, props.type, props.round ? 'is-round' : '', props.circle ? 'is-circle' : '']}>
        {slot.default ? slot.default() : <span>按钮</span>}
      </button>
    )
  },
})

export default ShButton

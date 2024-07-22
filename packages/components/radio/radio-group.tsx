import { defineComponent } from "vue"
const ShRadioGroup = defineComponent({
  name: "ShRadioGroup",
  props: {
    id: {
      type: String,
      default: undefined,
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: undefined,
    },
    //选中的值
    modelValue: {
      type: [String, Number, Boolean],
      default: undefined,
    },
  },
  setup(props, ctx) {
    const slot = ctx.slots
    return () => (
      <div class="sh-radio-group-box">
        {slot.default?.()}
      </div>
    )
  },
})

export default ShRadioGroup

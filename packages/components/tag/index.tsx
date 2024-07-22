import { defineComponent, computed, ref } from "vue"
import style from "./index.module.scss"
import { Subject } from "../../types/common"
import { hexToSemiTransparentRGBA } from "../../utils/common"

const ShTag = defineComponent({
  name: "ShTag",
  props: {
    type: {
      type: String as () => Subject,
      default: "primary"
    },
    color: {
      type: String,
      default: ""
    }
  },
  setup(props, ctx) {
    const slot = ctx.slots
    const typeValue = ref(props.type)
    //自定义的颜色处理
    const customColor = computed(() => {
      if (props.color) {
        //将默认的type置为空
        typeValue.value = ""
        const rgba = hexToSemiTransparentRGBA(props.color, 0.2)
        const customColor = {
          color: props.color,
          backgroundColor: rgba,
        }
        return customColor
      } else {
        return ""
      }
    })
    return () => (
      <div style={customColor.value} class={[`${style.shTagBox}`, typeValue.value ? `${style[typeValue.value]}` : '']}>
        {slot.default?.()}
      </div>
    )
  },
})

export default ShTag

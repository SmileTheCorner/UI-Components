import { defineComponent, computed } from "vue"

const ShIcon = defineComponent({
  name: "ShIcon",
  props: {
    icon: {
      type: String,
      default: ""
    },
    size: {
      type: [Number, String],
      default: 30
    },
    color: {
      type: String,
      default: '#ffffff'
    }
  },
  setup(props, _ctx) {
    const symbolId = computed(() => "#icon-" + props.icon)
    //查看size中是否有px,有px则不用加，否则加上px
    const size = computed(() => {
      return props.size.toString().includes("px") ? props.size.toString() : props.size.toString() + "px";
    })
    return () => (
      <svg class="sh-icon" aria-hidden="true" style={{ width: size.value, height: size.value }}>
        <use xlink:href={symbolId.value} fill={props.color}></use>
      </svg >
    )
  },
})

export default ShIcon

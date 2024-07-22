import { defineComponent, computed, nextTick } from "vue"
import "./index.scss"
import { haveSameParent } from "./index"

const ShRadio = defineComponent({
  name: "ShRadio",
  props: {
    //选中的值
    modelValue: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    //选项值
    value: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    //选项描述
    label: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    //选项名称
    name: {
      type: String,
      default: "",
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, ctx) {
    const slot = ctx.slots
    let emit = ctx.emit
    //输入框改变函数
    const onChange = (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      const inputValue = inputElement.value
      //更新选中的值
      emit('update:modelValue', inputValue);
      //change事件回调
      emit('change', inputValue)
      console.log("inputValue===>", inputValue)
    }
    //使用计算属性计算radio的name
    const radioName = computed(() => {
      if (props.name) {
        return props.name
      } else {
        //判断radio的父亲元素是否是一个，如果是则将当选框组归为一组
        nextTick(() => {
          haveSameParent()
        })
      }
    })
    return () => (
      <span class="sh-radio">
        <label>
          <input type="radio" disabled={props.disabled} class={{ "is-disabled": props.disabled }} onChange={onChange} value={props.value} name={radioName.value} />
          <span>{slot.default ? slot.default() : props.label}</span>
        </label >
      </span>
    )
  }
})

export default ShRadio

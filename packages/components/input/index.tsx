import { defineComponent, ref } from "vue"
import "./index.scss"

const ShInput = defineComponent({
  name: "ShInput",
  props: {
    modelValue: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    let slot = ctx.slots;
    let emit = ctx.emit;
    // 创建一个 ref 来存储输入值
    const inputValue = ref(props.modelValue);
    // 监听输入框输入的值
    const onInput = (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      inputValue.value = inputElement.value;
      // 发出更新事件
      emit('update:modelValue', inputValue.value);
    }
    return () => (
      <>
        <div class="sh-input-box">
          <div class="prepend" v-show={slot.prepend}>
            {slot.prepend?.()}
          </div>
          <input disabled={props.disabled} value={inputValue.value} onInput={onInput} class={{ 'pre-radius': slot.prepend, 'suf-radius': slot.append }} type="text" placeholder="请输入"></input>
          <div class="append" v-show={slot.append}>
            {slot.append?.()}
          </div>
        </div>
      </>
    )
  },
})

export default ShInput

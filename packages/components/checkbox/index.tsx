import { defineComponent, ref, computed } from "vue"
import style from "./index.module.scss"
import { checkboxPropsType } from "../../types/checkbox-type"
import "../../utils/cssr"

const ShCheckbox = defineComponent({
  name: "ShCheckbox",
  props: {
    moduleValue: {
      type: Array,
      default: []
    },
    options: {
      type: Array as () => checkboxPropsType[],
      default: []
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const emit = ctx.emit
    const checkedData = ref<checkboxPropsType[]>(props.options)
    const checkedList = ref<any[]>(props.moduleValue)
    //点击多选框
    const clickCheckBox = (item?: checkboxPropsType) => {
      if (item) {
        item.checked = !item.checked
        if (item.checked) {
          checkedList.value.push(item.value)
        } else {
          //寻找到之前选中的数据并把它从选中列表中删除
          const isIdInArrayIndex = checkedList.value.indexOf(item.value)
          if (isIdInArrayIndex != -1) {
            checkedList.value.splice(isIdInArrayIndex, 1)
          }
        }
        emit('update:modelValue', checkedList.value)
      } else {
        console.log("====>asdfdsa")
      }
    }

    //计算每个值中是否有计算checked
    const data = checkedData.value.map(item => ({
      ...item,
      checked: item.checked ?? false, // 如果 name 不存在，则设置默认值
    }))
    checkedData.value = data
    return () => (
      <div class={style.container}>
        {checkedData.value && checkedData.value.length > 0 ?
          checkedData.value.map((item) => {
            return <div class={[style.shCheckContent, item.border ? style.checkbox__border : "", item.checked ? style.checkbox__border__checked : ""]}>
              <div class={[style.shCheckBox, item.checked ? style.checked : ""]} onClick={() => clickCheckBox(item)}>
                {item.checked ? <span class={[item.indeterminate ? style.minusIcon : style.icon]}></span> : ""}
              </div>
              <div class={style.describe}>{item.label}</div>
            </div>
          }) :
          <div class={style.shCheckContent}>
            <div class={[style.shCheckBox]} onClick={() => clickCheckBox()}>
              <span class={[style.minusIcon]}></span>
            </div>
          </div>
        }
      </div >
    )
  },
})

export default ShCheckbox

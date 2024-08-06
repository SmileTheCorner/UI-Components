import { defineComponent } from "vue"
import style from "./index.module.scss"

const ShCheckbox = defineComponent({
  name: "ShCheckbox",
  props: {
    data: {
      type: Array,
      default: []
    },
    isCheckedAll: {
      type: Boolean,
      default: false
    }
  },
  setup(props, _ctx) {

    return () => (
      <div class={style.container}>
        {props.data.map((item, index) => {
          return <div class={style.shCheckContent}>
            < div class={style.shCheckBox}>
              <span class={[props.isCheckedAll ? style.icon : style.minusIcon]}></span>
            </div >
            <div class={style.describe}>{item.lable}</div>
          </div>
        })}
      </div>
    )
  },
})

export default ShCheckbox

import { defineComponent, nextTick, ref } from "vue"
import style from "./index.module.scss"

const ShSwitch = defineComponent({
  name: "ShSwitch",
  props: {
    //绑定的值
    modelValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    //激活的数值
    activeValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    //失效的数值
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    //激活文字描述
    activeText: {
      type: String,
      default: '',
    },
    //失效文字描述
    inactiveText: {
      type: String,
      default: '',
    },
    //激活颜色
    activeColor: {
      type: String,
      default: "#752bec"
    },
    //失效颜色
    inactiveColor: {
      type: String,
      default: "#282c38"
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, ctx) {
    let emit = ctx.emit
    //获取v-model上绑定的值
    const propModelValue = ref(props.modelValue)
    const controlCircleSwitch = ref<Boolean>(false)
    //计算选中的的背景颜色
    const activeStatus = () => {
      const switchBoxBackgroundElement = document.getElementById("switchBoxBackground")
      if (switchBoxBackgroundElement) {
        if (controlCircleSwitch.value) {
          //激活
          switchBoxBackgroundElement.style.backgroundColor = props.activeColor;
          switchBoxBackgroundElement.style.width = "100%"
          switchBoxBackgroundElement.style.transition = "width 0.4s linear,background-color 0.4s linear"
        } else {
          //失效
          switchBoxBackgroundElement.style.backgroundColor = props.inactiveColor;
          switchBoxBackgroundElement.style.width = "0"
          switchBoxBackgroundElement.style.transition = "width 0.4s linear,background-color 0.4s linear"
        }
      }
    }
    nextTick(() => {
      //绑定是否选中状态
      if (propModelValue.value == props.activeValue) {
        controlCircleSwitch.value = true
        activeStatus()
      } else {
        controlCircleSwitch.value = false
        activeStatus()
      }
      const switchBoxElement = document.getElementById("switchBox")
      //监听切换事件
      switchBoxElement?.addEventListener("click", function () {
        controlCircleSwitch.value = !controlCircleSwitch.value
        if (props.activeValue && props.activeValue) {
          emit("change", props.activeValue)
        } else {
          emit("change", props.inactiveValue)
        }

        activeStatus()
      })
    })
    const circleLeft = {
      left: "1px",
      transition: "left 0.4s linear"
    }
    const circleRight = {
      left: "calc(100% - 20px - 1px)",
      transition: "left 0.4s linear"
    }
    return () => (
      <div class={[style.shSwitchBox]} id="switchBox">
        <span class={style.switchBackgroundColor} id="switchBoxBackground"></span>
        <span class={[style.switchCircle]} style={controlCircleSwitch.value ? circleRight : circleLeft}></span>
        {controlCircleSwitch.value ? <span class={style.switchActiveText}>{props.activeText}</span> : <span class={style.switchInactiveText}>{props.inactiveText}</span>}
      </div>
    )
  }
})

export default ShSwitch

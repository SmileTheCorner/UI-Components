import { PropType, defineComponent, ref } from "vue"
import "./index.scss"
import { Selected, Options } from "../../types/select-type"

const ShSelect = defineComponent({
  name: "ShSelect",
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    options: {
      type: Array as PropType<Options[]>,
      default: () => ([] as Options[])
    }
  },
  setup(props, _ctx) {
    //占位值
    const placeholderValue = ref<string>(props.placeholder)
    //选中的值
    const selected: Selected = { name: "", value: "" }
    //显示上下拉图标图标
    const showIcons = ref<boolean>(true)
    //鼠标是否移入
    const isMouseMoveIn = ref<boolean>(false)
    //是否聚焦
    const isFocus = ref<boolean>(false)
    //控制下拉选项的显示和掩藏
    const showOptionsItemBox = ref<boolean>(false)

    document.addEventListener("DOMContentLoaded", (_event) => {
      //点击除选择框外的位置失去焦点并掩藏下拉选项框
      document.addEventListener('click', function () {
        //移除聚焦，收起选项下拉框
        isFocus.value = false
        showOptionsItemBox.value = false
        showIcons.value = true
        isMouseMoveIn.value = false
      })

      //监听选择框的鼠标移入移出事件来展示取消图标的显示和掩藏
      const selectBoxElement = document.getElementsByClassName('sh-select')[0]
      //鼠标移入
      selectBoxElement.addEventListener('mouseover', function () {
        if (hasNonEmptyProperty(selected)) {
          isMouseMoveIn.value = true
          showIcons.value = true
        }
      })
      //鼠标移出
      selectBoxElement.addEventListener('mouseleave', function () {
        if (hasNonEmptyProperty(selected)) {
          isMouseMoveIn.value = false
          isFocus.value ? showIcons.value = false : showIcons.value = true
        }
      })
    });

    //显示下拉框
    function showSelectBox(event: MouseEvent) {
      event.stopPropagation()
      if (hasNonEmptyProperty(selected) && isMouseMoveIn.value) {
        isMouseMoveIn.value = false
      }
      //聚焦
      isFocus.value = !isFocus.value
      //下拉选项框的显示和掩藏
      showOptionsItemBox.value = !showOptionsItemBox.value
      showIcons.value = !showIcons.value
      //对已经选择的项滚动到已经选择的项并且进行高亮显示
      highlightSelect()
    }
    //点击选项
    function clickOptionItem(event: MouseEvent) {
      event.stopPropagation()
      const target = event.target as HTMLElement
      let textContent = target.textContent!
      let dataValue = target.getAttribute('data-value')!

      //赋值
      selected.name = textContent
      selected.value = dataValue
      placeholderValue.value = textContent

      //失去焦点并掩藏下拉选项框
      showOptionsItemBox.value = false
      isFocus.value = false

      showIcons.value = true
      isMouseMoveIn.value = false
    }
    //高亮显示选中的项
    function highlightSelect() {
      //判断是否有选中的选项
      const isSelect = hasNonEmptyProperty(selected)

      //如果有选中的值则进行高亮显示
      if (isSelect) {
        const uiNode = document.getElementsByClassName('option-box-ul')[0]
        const liList = uiNode.getElementsByTagName('li')
        for (let item of liList) {
          const liElement = item as HTMLElement
          if (selected.name == item.textContent) {
            liElement.classList.add('selected')
          } else {
            liElement.classList.remove('selected')
          }
        }
      } else {
        return
      }
    }
    //清空已经选择的值
    function cancelSelectValue(event: Event) {
      event.stopPropagation()
      selected.name = ""
      selected.value = ""
      placeholderValue.value = props.placeholder

      isMouseMoveIn.value = false
    }
    //判断属性值是否为空
    function hasNonEmptyProperty(obj: Selected) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] != null && obj[key] != '') {
          // 这里检查属性值不是 null 也不是空字符串
          return true
        }
      }
      return false
    }
    return () => (
      <>
        <div class={['sh-select-box', props.disable ? 'sh-select-box-disabled' : '']} onClick={showSelectBox}>
          <div class={['sh-select', isFocus.value ? 'focus-style' : 'no-focus-style']}>
            <span class="placeholder">{placeholderValue.value}</span>
            <div class="icon">
              <span class="icon-item" v-show={showIcons.value && !isMouseMoveIn.value}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path></svg>
              </span>
              <span class="icon-item" v-show={!showIcons.value && !isMouseMoveIn.value}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M3.22 10.53a.749.749 0 0 1 0-1.06l4.25-4.25a.749.749 0 0 1 1.06 0l4.25 4.25a.749.749 0 1 1-1.06 1.06L8 6.811 4.28 10.53a.749.749 0 0 1-1.06 0Z"></path></svg>
              </span>
              <span class="icon-item" v-show={isMouseMoveIn.value} onClick={cancelSelectValue}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M2.344 2.343h-.001a8 8 0 0 1 11.314 11.314A8.002 8.002 0 0 1 .234 10.089a8 8 0 0 1 2.11-7.746Zm1.06 10.253a6.5 6.5 0 1 0 9.108-9.275 6.5 6.5 0 0 0-9.108 9.275ZM6.03 4.97 8 6.94l1.97-1.97a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l1.97 1.97a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-1.97 1.97a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L6.94 8 4.97 6.03a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018Z"></path></svg>
              </span>
            </div>
          </div>
          <div class={['sh-select-option-box', showOptionsItemBox.value ? 'show-option-box' : 'hidden-option-box', isFocus.value ? 'focus-style' : 'no-focus-style']}>
            <ul class="option-box-ul">
              {props.options.map(item => (
                <li class="option-item" data-value={item.value} onClick={clickOptionItem}>{item.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  },
})

export default ShSelect

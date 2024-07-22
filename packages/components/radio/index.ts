import { generateUUID } from "../../utils/rand"

//判断radio选项的父亲元素
export const haveSameParent = () => {
  let radioName = "radio-name" + generateUUID();
  const elements = document.getElementsByClassName('sh-radio')
  for (let i = 0; i < elements.length; i++) {
    let radioInput = elements[i].children[0].children[0] as HTMLElement
    if (i != elements.length - 1) {
      let afterRadioInput = elements[i + 1].children[0].children[0] as HTMLElement
      const currentNodeParent = elements[i].parentNode
      const afterNodeParent = elements[i + 1].parentNode
      if (currentNodeParent == afterNodeParent) {
        radioInput.setAttribute("name", radioName)
        afterRadioInput.setAttribute("name", radioName)
      } else {
        radioName = "radio-name" + generateUUID();
      }
    }
  }
}

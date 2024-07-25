import { defineComponent } from "vue"
import { ColumnProps } from "../../types/table-type"


const ShTableHead = defineComponent({
  name: "ShTableHead",
  props: {
    data: {
      type: Object as () => ColumnProps[],
      default: []
    }
  },
  setup(props, _ctx) {
    let checkedArr: any[] = []
    const checkAll = (event: Event) => {
      checkedArr = []
      if (!event.target) return
      const checkbox = event.target as HTMLInputElement;
      const isChecked = checkbox.checked;
      //获取所有复选框
      let allCheckDomArr = document.querySelectorAll('.shTable tbody input[type=checkbox]');
      for (const item of allCheckDomArr) {
        const inputElement = item as HTMLInputElement
        const checkStatus = inputElement.checked
        if (isChecked) {
          //全部选中
          if (!checkStatus) inputElement.checked = true
          const checkedItem = item.getAttribute("value")
          checkedArr.push(JSON.parse(checkedItem!))
        } else {
          //取消全部选中
          if (checkStatus) inputElement.checked = false
        }
      }
    }
    return () => (
      <thead>
        <tr>
          {props.data.map((item) => {
            if (item.type && ['selection'].includes(item.type)) {
              return <th> <input type="checkbox" onClick={checkAll} /></th>
            } else if (item.type && ['index'].includes(item.type)) {
              return < th scope="col" > {item.label ? item.label : '#'} </th>
            } else {
              return < th scope="col" > {item.label} </th>
            }
          })}
        </tr>
      </thead >
    )
  }
})

export default ShTableHead

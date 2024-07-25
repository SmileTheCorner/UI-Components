import { defineComponent, PropType } from "vue"
import { ColumnProps } from "../../types/table-type"
import { generateUUID } from "../../utils/rand"


const ShTableBody = defineComponent({
  name: "ShTableBody",
  props: {
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: null
    },
    columns: {
      type: Object as () => ColumnProps[],
      default: []
    }
  },
  setup(props, _ctx) {
    const name = "shTable_" + generateUUID()
    //点击选中每一项
    const clickCheckbox = (event: Event) => {
      //获取所有复选框
      let allCheckedDomArr = document.querySelectorAll('.shTable tbody input[type=checkbox]:checked');
      let bodyCheckDomArr = document.querySelectorAll('.shTable tbody input[type=checkbox]');
    }
    return () => (
      <tbody>
        {
          props.data.map((item, index) => (
            < tr key={index} >
              {
                props.columns.map((key) => {
                  if (key.type && ['selection'].includes(key.type)) {
                    return <td><input type="checkbox" name={name} value={JSON.stringify(item)} onInput={clickCheckbox} /></td>
                  } else if (key.type && ['index'].includes(key.type)) {
                    return <td>{index + 1}</td>
                  } else {
                    return <td>{item[key.prop]}</td>
                  }
                })
              }
            </tr>
          ))
        }
      </tbody >
    )
  }
})

export default ShTableBody

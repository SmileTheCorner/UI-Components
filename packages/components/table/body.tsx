import { defineComponent, PropType, ref } from "vue"
import { ColumnProps } from "../../types/table-type"
import { generateUUID } from "../../utils/rand"
import { useSelection } from "../../hooks/useSelection"


const ShTableBody = defineComponent({
  name: "ShTableBody",
  props: {
    //数据
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: null
    },
    //表头信息
    columns: {
      type: Object as () => ColumnProps[],
      default: []
    },
    //设置选中的数据
    setCheckedList: {
      type: Function,
      default: () => { }
    },
    //选中的数据
    checkedList: {
      type: Array as () => any[],
      default: []
    }
  },
  setup(props, _ctx) {
    const { selectedList, selectedRowKeys } = useSelection()
    console.log("tbody==>", selectedList.value, selectedRowKeys.value)

    const checkedListData = ref<any[]>(props.checkedList)
    //选中列表
    const toggleRowSelection = (event: Event, id: any) => {
      const checkboxElement = event.target as HTMLInputElement;
      const isChecked = checkboxElement.checked
      const isIdInArrayIndex = checkedListData.value.indexOf(id)
      if (isChecked && isIdInArrayIndex == -1) {
        checkedListData.value.push(id)
      } else if (!isChecked && isIdInArrayIndex != -1) {
        checkedListData.value.splice(isIdInArrayIndex, 1)
      }
      props.setCheckedList(checkedListData.value)
    }
    return {
      props
    }
  },
  render(){
    const {props} = this 
    return (
<tbody>
          {
            props.data.map((item, index) => (
              < tr key={index} >
                {
                  props.columns.map((key) => {
                    if (key.type && ['selection'].includes(key.type)) {
                      return <td><input type="checkbox"/></td>
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

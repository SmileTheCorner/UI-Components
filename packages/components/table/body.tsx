import { defineComponent, PropType, ref,watch,watchEffect} from "vue"
import { ColumnProps } from "../../types/table-type"
import { generateUUID } from "../../utils/rand"
import { useTable } from "./use-table"



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
  },
  setup(props, _ctx) {
    const name = "shTable_" + generateUUID()
    const {checkedList} = useTable()
    //选中的数据
    let  checkedListData = ref<any[]>([])
    return () => (
      <tbody>
        {
          props.data.map((item, index) => (
            < tr key={index} >
              {
                props.columns.map((key) => {
                  if (key.type && ['selection'].includes(key.type)) {
                    return <td><input type="checkbox" checked={checkedList.value.includes(item.id)} name={name}/></td>
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

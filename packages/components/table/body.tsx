import { defineComponent, PropType, ref } from "vue"
import { ColumnProps } from "../../types/table-type"
import { generateUUID } from "../../utils/rand"
import { useSelection } from "../../hooks/useSelection"
import ShCheckbox from "../checkbox"
import { checked } from "../../utils/constant"


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
              < tr key={item.id} >
                {
                  props.columns.map((key) => {
                    if (key.type && ['selection'].includes(key.type)) {
                      return <td><ShCheckbox options={[{value:item.id,checked:item.checked}]} /></td>
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

import { defineComponent, PropType, ref,watch} from "vue"
import { ColumnProps } from "../../types/table-type"
import ShCheckbox from "../checkbox"
import {useSelection} from "./hooks/useSelection"
import {type CheckboxItemType} from "../checkbox/type/index"



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
    const useData = useSelection()
    
    const listData = ref<any[]>(useData.listData.value)
    
    //监听选中数据的渲染
    watch(useData.listData,(newValue)=>{
      listData.value = newValue
    })
   
    //选中
    const checkItem = (item:CheckboxItemType)=>{
     useData.selectionItem("value",item.checked,item)
    }

    return {
      listData,
      checkItem,
      columns:props.columns
    }
  },
  render(){
    const {listData,columns,checkItem} = this 
    return (
       <tbody>
          {
            listData.map((item, index) => {
              const options = [{value:item.id,checked:item.checked}]
                return  < tr key={item.id} >
                  {
                    columns.map((key) => {
                      if (key.type && ['selection'].includes(key.type)) {
                         return <td><ShCheckbox options={options} onChange={checkItem}/></td>
                      } else if (key.type && ['index'].includes(key.type)) {
                        return <td>{index + 1}</td>
                      } else {
                        return <td>{item[key.prop]}</td>
                      }
                    })
                  }
                </tr>
              })
          }
        </tbody >
    )
  }
})

export default ShTableBody

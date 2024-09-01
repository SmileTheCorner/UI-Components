import { defineComponent, ref} from "vue"
import { ColumnProps } from "../../types/table-type"
import ShCheckbox from "../checkbox"
import {type CheckboxItemType} from "../checkbox/type/index"
import {useSelection} from "./hooks/useSelection"

const ShTableHead = defineComponent({
  name: "ShTableHead",
  props: {
    //列名
    columns: {
      type: Array as () => ColumnProps[],
      default: []
    },
  },
  
  setup(props) {
    const useData = useSelection()
    //全部选中
    const checkAll = (item:CheckboxItemType)=>{
      if(item.checked){
        useData.selectionAll()
      }else{
        useData.cancelSelectionAll()
      }
      useData.initData(useData.listData.value,useData.checkedRowKey.value,useData.rowKey.value)
    }
    const options = ref([{value:"sh-check-all",checked:false}])

    return {
      columns:props.columns,
      options,
      checkAll
    }
  },
  render(){
    const {columns,checkAll,options}  = this
    return (
      <thead>
          <tr>
            {columns.map((item) => {
              if (item.type && ['selection'].includes(item.type)) {
               return  <th> <ShCheckbox options={options} onChange={checkAll}/></th>
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

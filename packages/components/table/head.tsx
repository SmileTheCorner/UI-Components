import { defineComponent, ref,watch,computed} from "vue"
import {Column} from "./type/index"
import ShCheckbox from "../checkbox"
import {type CheckboxItemType} from "../checkbox/type/index"
import {useSelection} from "./hooks/useSelection"
import {mergeHeaderRowAndCol} from "./utils"

const ShTableHead = defineComponent({
  name: "ShTableHead",
  props: {
    //列名
    columns: {
      type: Array as () => Column[],
      default: []
    },
  },
  
  setup(props) {
    const options = ref<Partial<CheckboxItemType>[]>([{value:"sh-check-all",checked:false,indeterminate:false}])

    const useData = useSelection()

     //监听hooks中封装的全选的数据
    watch(useData.checkedRowKey,(newValue)=>{
      if(newValue && newValue.length>0){
        options.value[0].checked = true
      }
      if(newValue.length == 0){
        options.value[0].checked = false
      }
      options.value[0].indeterminate = !(useData.listData.value.length == newValue.length)
    })

    //全部选中
    const checkAll = (item:CheckboxItemType)=>{
      if(item.checked){
        useData.selectionAll()
      }else{
        useData.cancelSelectionAll()
      }
      useData.initData(useData.listData.value,useData.checkedRowKey.value,useData.rowKey.value)
    }

    //计算合并分组表头
    const newColumns = computed(()=>{
      return mergeHeaderRowAndCol(props.columns)
    })
    

    return {
      columns:newColumns.value,
      options,
      checkAll
    }
  },
  render(){
    const {columns,checkAll,options}  = this
    return (
      <thead>
            {columns.map((column:Column[]) => {
            return  <tr>
               { column.map((item:Column)=>{
                if (item.type && ['selection'].includes(item.type)) {
                  return  <th colspan={item.colspan} rowspan={item.rowspan}> <ShCheckbox options={options} onChange={checkAll}/></th>
                 } else if (item.type && ['index'].includes(item.type)) {
                   return < th scope="col" colspan={item.colspan} rowspan={item.rowspan}> {item.title ? item.title : '#'} </th>
                 } else {
                   return < th scope="col" colspan={item.colspan} rowspan={item.rowspan}> {item.title} </th>
                 }
              })}
              </tr>
            })}
        </thead >
    )
  }
})

export default ShTableHead

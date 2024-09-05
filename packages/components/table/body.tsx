import { defineComponent, PropType, ref,watch,computed} from "vue"
import {Column} from "./type/index"
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
      type: Object as () => Column[],
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
    //过滤表头渲染的数据
    const filterByKeyAndType =(array:Column[])=>{
      let result:Column[] = [];
      array.forEach(item => {
        if (item.key || item.type) {
          result.push(item);
        }
        if (item.children) {
          result = result.concat(filterByKeyAndType(item.children));
        }
      });
    
      return result;
    }
    //表头信息
    const columns = computed(()=>{
     return  filterByKeyAndType(props.columns)
    })

    return {
      listData,
      checkItem,
      columns:columns.value
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
                    columns.map((column) => {
                      if (column.type && ['selection'].includes(column.type)) {
                         return <td><ShCheckbox options={options} onChange={checkItem}/></td>
                      } else if (column.type && ['index'].includes(column.type)) {
                        return <td>{index + 1}</td>
                      } else {
                        return <td>{item[column.key as string]}</td>
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

import { defineComponent, PropType, ref,computed,watch} from "vue"
import { ColumnProps } from "../../types/table-type"
import ShCheckbox from "../checkbox"
import {useSelection} from "./hooks/useSelection"


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
    isCheckedAll:{
     type:Boolean,
     default: false
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
    const useData = useSelection()
    
    //监听hooks中封装的全选的数据
    watch(useData.checkedRowKey,(newValue)=>{
      //console.log("newValue===>",newValue)
    })

    //监听选中数据的渲染
    watch(useData.listData,(newValue)=>{
      listData.value = newValue
    })
    const listData = ref<any[]>(useData.listData.value)

    return {
      listData,
      columns:props.columns
    }
  },
  render(){
    const {listData,columns} = this 
    return (
       <tbody>
          {
            listData.map((item, index) => {
              const options = {value:item.id,checked:item.checked}
                return  < tr key={item.id} >
                  {
                    columns.map((key) => {
                      if (key.type && ['selection'].includes(key.type)) {
                        return <td><ShCheckbox options={options}/></td>
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

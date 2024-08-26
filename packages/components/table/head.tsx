import { defineComponent, PropType, ref } from "vue"
import { ColumnProps } from "../../types/table-type"
import { useSelection } from "../../hooks/useSelection"
import ShCheckbox from "../checkbox"
import {type checkboxItemType} from "../checkbox/type/index"

const ShTableHead = defineComponent({
  name: "ShTableHead",
  props: {
    //数据
    modelValue: {
      type: Array as PropType<any[]>,
      default: [],
    },
    //列名
    columns: {
      type: Object as () => ColumnProps[],
      default: []
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const emit = ctx.emit
    //数据列表
    const listData = ref<any[]>(props.modelValue)
    //全选参数
    const options = ref<checkboxItemType[]>([{value:'checkAll',checked:false}])
    //全部选中
    const checkAll = (item:checkboxItemType)=>{
      listData.value.map(obj=>{
        if(item.checked){
          obj.checked = true
        }else{
          obj.checked = false
        }
      })
      emit("update:modelValue",listData.value)
    }
    return {
      props,
      options,
      checkAll
    }
  },
  render(){
    const {props,options,checkAll}  = this
    return (
      <thead>
          <tr>
            {props.columns.map((item) => {
              if (item.type && ['selection'].includes(item.type)) {
               return  <th> <ShCheckbox options={options} onChange={()=>checkAll(options[0])}/></th>
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

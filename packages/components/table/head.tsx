import { defineComponent, PropType, ref } from "vue"
import { ColumnProps } from "../../types/table-type"
import { useSelection } from "../../hooks/useSelection"
import ShCheckbox from "../checkbox"

const ShTableHead = defineComponent({
  name: "ShTableHead",
  props: {
    //列名
    columns: {
      type: Object as () => ColumnProps[],
      default: []
    },
    //数据
    data: {
      type: Array as PropType<any[]>,
      default: [],
      require: true
    }
  },
  setup(props, _ctx) {
    const { selectionChange, selectedList } = useSelection("id", props.data)
    //是否全选
    let isCheckAll = ref<Boolean>(false)
    //存储选中的数据
    const checkAll = (event: Event) => {
      const checkbox = event.target as HTMLInputElement
      // isCheckAll.value = checkbox.checked
      selectionChange(checkbox.checked)
    }
    return {
      props
    }
  },
  render(){
    const {props}  = this
    return (
      <thead>
          <tr>
            {props.columns.map((item) => {
              if (item.type && ['selection'].includes(item.type)) {
                 <th> <ShCheckbox options={[{value:'1'}]}/></th>
              } else if (item.type && ['index'].includes(item.type)) {
                 < th scope="col" > {item.label ? item.label : '#'} </th>
              } else {
                 < th scope="col" > {item.label} </th>
              }
            })}
          </tr>
        </thead >
    )
  }
})

export default ShTableHead

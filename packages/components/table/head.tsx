import { defineComponent, PropType, ref } from "vue"
import { ColumnProps } from "../../types/table-type"
import { useTable } from "./use-table"

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
    },
    //选中的数据
    checkedList: {
      type: Array as PropType<any[]>,
      default: [],
      require: true
    },
    //设置选中的数据函数
    setCheckedList: {
      type: Function,
      default: () => { }
    }
  },
  setup(props, _ctx) {
    const { setCheckedList, checkedList } = useTable()

    //是否全选
    let isCheckAll = ref<Boolean>(false)
    //存储选中的数据
    let isCheckedList = ref<any[]>(checkedList)
    const checkAll = (event: Event) => {
      isCheckedList.value = []
      if (!event.target) return
      const checkbox = event.target as HTMLInputElement
      const isChecked = checkbox.checked
      isCheckAll.value = isChecked
      if (isCheckAll.value) {
        const checkId = props.data.map(row => row.id)
        isCheckedList.value.push(...checkId)
      }
      //将选中的数据传递给回调函数
      setCheckedList(isCheckedList.value)
    }
    return () => (
      <thead>
        <tr>
          {props.columns.map((item) => {
            if (item.type && ['selection'].includes(item.type)) {
              return <th> <input type="checkbox" checked={isCheckAll.value} onClick={checkAll} /></th>
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

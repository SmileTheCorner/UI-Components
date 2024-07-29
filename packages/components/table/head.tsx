import { defineComponent, PropType, ref } from "vue"
import { ColumnProps } from "../../types/table-type"

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
    //表头全选中的方法函数
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
    //是否全选
    let isCheckAll = ref<Boolean>(false)
    //存储选中的数据
    let isCheckedList = ref<any[]>([])
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
      props.setCheckedList(isCheckedList.value)
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

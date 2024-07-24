import { defineComponent } from "vue"
import { ColumnProps } from "../../types/table-type"


const ShTableHead = defineComponent({
  name: "ShTableHead",
  props: {
    data: {
      type: Object as () => ColumnProps[],
      default: []
    }
  },
  setup(props, _ctx) {
    return () => (
      <thead>
        <tr>
        {props.data.map((item, _index) => (
            <th scope="col">{item.label}</th>
          ))}
        </tr>
      </thead>
    )
  }
})

export default ShTableHead

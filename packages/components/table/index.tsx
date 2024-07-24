import { defineComponent, nextTick,ref } from "vue"
import ShTableHead from "./head"
import ShTableBody from "./body"
import ShTableFoot from "./foot"
import ShTableCaption from "./caption"
import style from "./index.module.scss"
import { ColumnProps } from "../../types/table-type"
import "./index.scss"

const ShTable = defineComponent({
  name: "ShTable",
  props: {
    columns: {
      type: Object as () => ColumnProps[],
      default: []
    },
    data: {
      type: Array,
      default: null
    }
  },
  setup(props, _ctx) {
    return () => (
      <div class="shTableBox">
        <table>
          <ShTableCaption />
          <ShTableHead data={props.columns} />
          <ShTableBody data={props.data}/>
          <ShTableFoot />
        </table>
      </div>
    )
  }
})

export default ShTable

import { defineComponent, nextTick } from "vue"
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
    data: {
      type: Object as () => ColumnProps[],
      default: []
    }
  },
  setup(props, ctx) {
    nextTick(() => {
      //收集表头信息
      if (props.data) {
        const headerData = props.data.map(item => item.label)
        console.log("data===>", headerData)
      }
    })
    return () => (
      <div class="shTableBox">
        <table>
          <ShTableCaption />
          <ShTableHead />
          <ShTableBody />
          <ShTableFoot />
        </table>
      </div>
    )
  }
})

export default ShTable

import { defineComponent, PropType, watch, ref } from "vue"
import ShTableHead from "./head"
import ShTableBody from "./body"
import ShTableFoot from "./foot"
import ShTableCaption from "./caption"
import style from "./index.module.scss"
import { ColumnProps } from "../../types/table-type"
import { useTable } from "../../hooks/useTable"

const ShTable = defineComponent({
  name: "ShTable",
  props: {
    // 列配置项
    columns: {
      type: Object as () => ColumnProps[],
      default: []
    },
    //静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
    data: {
      type: Array as PropType<any[]>,
      default: null,
      require: false
    },
    // 请求表格数据的 api ==> 非必传
    requestApi: {
      type: Function as PropType<(params: any) => Promise<any>>,
      default: () => { },
      require: false
    },
    // 初始化请求参数 ==> 非必传（默认为{}）
    initParam: {
      type: Object as () => any,
      default: {},
      require: false
    },
    // 是否带有纵向边框 ==> 非必传（默认为false）
    border: {
      type: Boolean,
      default: false,
      require: false
    },
    // 是否需要分页组件 ==> 非必传（默认为true）
    pagination: {
      type: Boolean,
      default: true,
      require: false
    },
    // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
    dataCallback: {
      type: Function as PropType<(data: any) => any>,
      default: () => { },
      require: false
    },
    // 表格 api 请求错误监听 ==> 非必传
    requestError: {
      type: Function as PropType<(params: any) => void>,
      default: () => { },
      require: false
    },
  },
  setup(props, _ctx) {
    const { tableData } = useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback, props.requestError)
    return () => (
      <div class={style.shTableBox}>
        <table class="shTable">
          <ShTableCaption />
          <ShTableHead data={props.data ?? tableData} columns={props.columns} />
          <ShTableBody data={props.data ?? tableData} columns={props.columns} />
          <ShTableFoot />
        </table>
      </div>
    )
  }
})

export default ShTable

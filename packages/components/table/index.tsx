import { defineComponent, PropType, watch, ref, computed } from "vue"
import ShTableHead from "./head"
import ShTableBody from "./body"
import ShTableFoot from "./foot"
import ShTableCaption from "./caption"
import { ColumnProps } from "../../types/table-type"
import style from "./style/index.cssr"
import {cssrAnchorMetaName} from "../../utils/common"
import { useSsrAdapter } from '@css-render/vue3-ssr'

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
    //自定义表格渲染的key
    rowKey: {
      type: String,
      default: "id"
    }
  },
  setup(props, _ctx) {
     // 挂载样式
     const ssrAdapter = useSsrAdapter()
     style.mount({
       id: 'sh-table',
       head: true,
       anchorMetaName: cssrAnchorMetaName,
       ssr: ssrAdapter
     })

     //渲染的数据列表
     let listData = ref<any>(props.data)
    return {
      listData,
      columns:props.columns
    }
  },
  render(){
    let {listData,columns} = this
    return(
     <div class="sh-table">
        <table>
           {/* 表描述 */}
          <ShTableCaption />
          {/* 表头 */}
          <ShTableHead v-model={listData} columns={columns} />
          {/* 表体 */}
          <ShTableBody data={listData} columns={columns} />
          {/* 表尾 */}
          <ShTableFoot />
        </table>
      </div>
    )
  }
})

export default ShTable

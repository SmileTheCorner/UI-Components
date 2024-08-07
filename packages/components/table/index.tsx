import { defineComponent, PropType, watch, ref, computed } from "vue"
import ShTableHead from "./head"
import ShTableBody from "./body"
import ShTableFoot from "./foot"
import ShTableCaption from "./caption"
import ShCheckbox from "../checkbox/index"
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
    //自定义表格渲染的key
    rowKey: {
      type: String,
      default: "id"
    }
  },
  setup(props, _ctx) {
    // const { tableData } = useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback, props.requestError)
    // 选中的数据
    let checkedListData = ref<any[]>([])
    // 是否全选
    let isCheckAll = ref<Boolean>(false)
    // 全选方法
    const checkAll = (event: Event) => {
      checkedListData.value = []
      const checkbox = event.target as HTMLInputElement
      isCheckAll.value = checkbox.checked
      if (isCheckAll.value) {
        props.data.forEach(item => checkedListData.value.push(item[props.rowKey]));
      }
    }
    //表体中的选中方法
    const toggleRowSelection = (event: Event, id: any) => {
      const checkboxElement = event.target as HTMLInputElement;
      const isChecked = checkboxElement.checked
      const isIdInArrayIndex = checkedListData.value.indexOf(id)
      if (isChecked && isIdInArrayIndex == -1) {
        checkedListData.value.push(id)
      } else if (!isChecked && isIdInArrayIndex != -1) {
        checkedListData.value.splice(isIdInArrayIndex, 1)
      }
    }
    //表中的数据是否全部选中
    const isCheckedBody = computed(() => {
      return checkedListData.value.length == props.data.length
    })
    const checkData = [
      {
        value: 1
      }
    ]
    return () => (
      <div class={style.shTableBox}>
        <table class="shTable">
          {/* 表描述 */}
          <caption>
            Front-end web developer course 2021
          </caption>
          {/* 表头 */}
          <thead>
            <tr>
              {props.columns.map((item) => {
                if (item.type && ['selection'].includes(item.type)) {
                  return <th class={[isCheckedBody.value ? style.allChecked : '']}><ShCheckbox></ShCheckbox></th>
                } else if (item.type && ['index'].includes(item.type)) {
                  return < th scope="col" > {item.label ? item.label : '#'} </th>
                } else {
                  return < th scope="col" > {item.label} </th>
                }
              })}
            </tr>
          </thead >
          {/* 表体 */}
          <tbody>
            {
              props.data.map((item, index) => (
                < tr key={index} >
                  {
                    props.columns.map((key) => {
                      if (key.type && ['selection'].includes(key.type)) {
                        //return <td><input type="checkbox" checked={checkedListData.value.includes(item[props.rowKey])} onChange={(event: Event) => toggleRowSelection(event, item[props.rowKey])} /></td>
                        return <td><ShCheckbox></ShCheckbox></td>
                      } else if (key.type && ['index'].includes(key.type)) {
                        return <td>{index + 1}</td>
                      } else {
                        return <td>{item[key.prop]}</td>
                      }
                    })
                  }
                </tr>
              ))
            }
          </tbody >
          {/* 表尾 */}
          <tfoot>
            <tr>
              <th scope="row" colspan="4">Average age</th>
              <td>33</td>
            </tr>
          </tfoot>
          {/* <ShTableCaption />
          <ShTableHead data={props.data ?? tableData} columns={props.columns} />
          <ShTableBody data={props.data ?? tableData} columns={props.columns} />
          <ShTableFoot /> */}
        </table>
      </div>
    )
  }
})

export default ShTable

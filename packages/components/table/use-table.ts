import { reactive, toRefs, computed } from "vue"
import { StateProps } from "../../types/table-type"
/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法 (必传)
 * @param {Object} initParam 获取数据初始化参数 (非必传，默认为{})
 * @param {Boolean} isPageAble 是否有分页 (非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法 (非必传)
 * */
export const useTable = (
  api?: (params: any) => Promise<any>,
  initParam: object = {},
  isPageAble: boolean = true,
  dataCallBack?: (data: any) => any,
  requestError?: (error: any) => void
) => {
  const state = reactive<StateProps>({
    // 表格数据
    tableData: [],
    // 分页数据
    pageAble: {
      // 当前页数
      pageNum: 1,
      // 每页显示条数
      pageSize: 10,
      // 总条数
      total: 0,
    },
    // 查询参数(只包括查询)
    searchParam: {},
    // 初始化默认的查询参数
    searchInitParam: {},
    // 总参数(包含分页和查询参数)
    totalParam: {},
  })
  /**
   * @description 表格数据查询
   * @return void
   * */
  const search = () => {
    //将要查询的页数设置为1
    state.pageAble.pageNum = 1
    //将每页展示的条数设置为 10
    state.pageAble.pageSize = 10
    //更新要查询的总参数列表
    updatedTotalParam();
    //重新获取表格数据
    getTableList();
  };
  /**
    * @description 表格数据重置
    * @return void
    * */
  const reset = () => {
    //将查询的页数重置为1
    state.pageAble.pageNum = 1
    state.pageAble.pageSize = 10
    //将查询参数设置为空对象
    state.searchParam = {};
    // 重置搜索表单的时，如果有默认搜索参数，则重置默认的搜索参数
    Object.keys(state.searchInitParam).forEach((key) => {
      state.searchParam[key] = state.searchInitParam[key];
    });
    //跟新总的查询参数
    updatedTotalParam();
    //重新获取表格数据
    getTableList();
  }
  /**
     * @description 更新查询参数
     * @return void
     * */
  const updatedTotalParam = () => {
    //将总的查询参数列表置为空
    state.totalParam = {};
    //获取查询参数
    for (let key in state.searchParam) {
      // * 某些情况下参数为 false/0 也应该携带参数
      if (
        state.searchParam[key] ||
        state.searchParam[key] === false ||
        state.searchParam[key] === 0
      ) {
        //将有的参数放到nowSearchParam里面
        state.totalParam[key] = state.searchParam[key];
      }
    }
  };
  /**
   * @description 分页查询参数(只包括分页和表格字段排序)
   * */
  const pageParam = computed(() => {
    return {
      pageNum: state.pageAble.pageNum,
      pageSize: state.pageAble.pageSize,
    };
  })
  /**
    * @description 获取表格数据
    * @return void
    * */
  const getTableList = async () => {
    //如果获取数据的Api没有传入则返回，否则根据Api获取数据
    if (!api) return
    //获取数据
    try {
      //请求参数
      const param = { ...state.totalParam, ...initParam }
      //将查询的参数和分页的参数添加到总的参数里面
      Object.assign(
        param,
        pageParam.value
      );
      //获取数据
      let data = api(param)
      //如果有回调函数则将数据返回
      dataCallBack && (data = dataCallBack(data));
      //给state中的数据列表赋值 如果是有分页则去data.list 否则取data
      state.tableData = isPageAble ? data.list : data
      // 解构后台返回的分页数据 (如果有分页更新分页信息)
      if (isPageAble) {
        const { total } = data;
        //更新表格参数
        updatePageAble({ total })
      }
    } catch (error) {
      requestError && requestError(error);
    }
  }
  /**
   * @description 更新分页信息
   * @param {Object} pageAble 后台返回的分页数据
   * @return void
   * */
  const updatePageAble = (total: Number) => {
    Object.assign(state.pageAble, total);
  };
  /**
     * @description 每页条数改变
     * @param {Number} val 当前条数
     * @return void
     * */
  const handleSizeChange = (val: number) => {
    state.pageAble.pageSize = val;
    getTableList();
  };
  /**
     * @description 当前页改变
     * @param {Number} val 当前页
     * @return void
     * */
  const handleCurrentChange = (val: number) => {
    state.pageAble.pageNum = val;
    getTableList();
  };
  return {
    ...toRefs(state),
    search,
    reset,
    getTableList,
    handleSizeChange,
    handleCurrentChange
  }
}

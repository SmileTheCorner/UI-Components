import { ref } from "vue";

/**
 * @description 表格多选数据操作
 * @param {String} rowKey 当表格可以多选时，所指定的id,默认是id属性
 * */
//将选中的数据放到外面以便于其他组件进行共享
let selectedList = ref<{ [key: string]: any }[]>([]);
//选中数据的id
let selectedRowKeys = ref<string[]>([]);
//存储数据
let listData = ref<any[]>([])

export const useSelection = (rowKey: string = "id", list?: any[]) => {
  if (list && list.length > 0) {
    listData.value = list
  }
  //是否全选数据
  const selectionChange = (checked: Boolean) => {
    selectedList.value = [];
    selectedRowKeys.value = []
    if (checked) {
      listData.value.forEach(item => selectedList.value.push(item))
      listData.value.forEach(item => selectedRowKeys.value.push(item[rowKey]));
    }
    return selectedRowKeys.value
  }
  // //单选某一项数据
  // const toggleRowSelection = (event: Event, item: any) => {
  //   const checkboxElement = event.target as HTMLInputElement;
  //   const isChecked = checkboxElement.checked

  //   //在选中的数组中寻找是否包含选中的值
  //   const id = item[rowKey]
  //   const isIdInArrayIndex = state.selectedList.indexOf(id)
  //   if (isChecked && isIdInArrayIndex == -1) {
  //     state.selectedList.push(id)
  //   } else if (!isChecked && isIdInArrayIndex != -1) {
  //     state.selectedList.splice(isIdInArrayIndex, 1)
  //   }
  // }
  return {
    selectedList,
    selectionChange,
    selectedRowKeys
  }
}

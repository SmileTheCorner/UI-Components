import { ref } from "vue";

/**
 * @description 表格多选数据操作
 * @param {String} rowKey 当表格可以多选时，所指定的id,默认是id属性
 * */
export const useSelection = (rowKey: string = "id", list: any[]) => {
  const selectedList = ref<{ [key: string]: any }[]>([]);
  //是否全选数据
  const selectionChange = (checked: Boolean) => {
    let ids: string[] = [];
    let items: { [key: string]: any }[] = [];
    if (checked) {
      list.forEach(item => items.push(item))
      list.forEach(item => ids.push(item[rowKey]));
    }
    //将选中的数据赋值给selectedList
    selectedList.value = items
    return ids
  }
  //单选某一项数据
  const toggleRowSelection = (event: Event, item: any) => {
    const checkboxElement = event.target as HTMLInputElement;
    const isChecked = checkboxElement.checked

    //在选中的数组中寻找是否包含选中的值
    const id = item[rowKey]
    const isIdInArrayIndex = state.selectedList.indexOf(id)
    if (isChecked && isIdInArrayIndex == -1) {
      state.selectedList.push(id)
    } else if (!isChecked && isIdInArrayIndex != -1) {
      state.selectedList.splice(isIdInArrayIndex, 1)
    }
  }
  return {
    selectedList,
    selectionChange,
    toggleRowSelection
  }
}
// export const useSelection = (rowKey: string = "id") => {
//   const isSelected = ref<boolean>(false);
//   const selectedList = ref<{ [key: string]: any }[]>([]);

//   // 当前选中的所有 ids 数组
//   const selectedListIds = computed((): string[] => {
//     let ids: string[] = [];
//     selectedList.value.forEach(item => ids.push(item[rowKey]));
//     return ids;
//   });

//   /**
//    * @description 多选操作
//    * @param {Array} rowArr 当前选择的所有数据
//    * @return void
//    */
//   const selectionChange = (rowArr: { [key: string]: any }[]) => {
//     rowArr.length ? (isSelected.value = true) : (isSelected.value = false);
//     selectedList.value = rowArr;
//   };

//   return {
//     isSelected,
//     selectedList,
//     selectedListIds,
//     selectionChange
//   };
// };

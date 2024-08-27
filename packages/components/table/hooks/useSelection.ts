import {reactive,toRefs} from "vue"

const state = reactive<{listData:any[],checkedRowKey:(string|number|Object)[],rowKey:string}>({
    listData:[],
    checkedRowKey:[],
    rowKey:"",
})

export const useSelection = ()=>{
    //初始化数据
    const initData = (listData:any[],checkedRowKey:(string|number|Object)[],rowKey:string)=>{
        state.listData = listData
        state.checkedRowKey = checkedRowKey
        state.rowKey = rowKey
    }
    //更新数据
    const updateData = (list:any[])=>{
        state.listData = list
    }
    //数据全选
    const selectionAll = ()=>{
      clearSelectionData()
      state.listData.map(item=>{
        const key = item[state.rowKey]
        state.checkedRowKey.push(key)
      })
      //修改数据的选中状态
      const data = state.listData.map(item=>{
        return {
            ...item,
            checked:true
        }
      })
      updateData(data)
    }
    //取消全选
    const cancelSelectionAll = ()=>{
      clearSelectionData()
         //修改数据的选中状态
     const data = state.listData.map(item=>{
        return {
            ...item,
            checked:false
        }
     })
     updateData(data)
    }
    //选中部分数据
    const selectionItem = (rowKey:string ='id',isChecked:boolean,item:any)=>{
        if(isChecked){
           state.checkedRowItems.push(item)
           state.checkedRowKey.push(item[rowKey])
        }else{
           const key = item[rowKey]
           const itemIndex = state.checkedRowItems.findIndex(obj=>{obj[rowKey] == key})
           if(itemIndex != -1){
            state.checkedRowItems.splice(itemIndex,1)
           }
           const keyIndex = state.checkedRowKey.findIndex(obj=>{obj == key})
           if(keyIndex != -1){
            state.checkedRowKey.slice(keyIndex,1)
           }
        }
    }
    //清空选中的数据key和数据项
    const clearSelectionData = ()=>{
        state.checkedRowKey = []
    }
    return {
        ...toRefs(state),
        initData,
        updateData,
        selectionAll,
        cancelSelectionAll,
        selectionItem
    }
}
import {reactive,toRefs} from "vue"

const state = reactive<{listData:any[],checkedRowKey:(string|number|object)[],rowKey:string}>({
    listData:[],
    checkedRowKey:[],
    rowKey:"",
})

export const useSelection = ()=>{
    //初始化数据
    const initData = (listData:any[],checkedRowKey:(string|number|object)[],rowKey:string)=>{
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
        const tempRowKey = state.checkedRowKey
        clearSelectionData()
        if(isChecked){
            tempRowKey.push(item[rowKey])
        }else{
           const key = item[rowKey]
           const keyIndex = tempRowKey.findIndex(obj=>obj == key)
           if(keyIndex != -1){
            tempRowKey.splice(keyIndex,1)
           }
        }
        state.checkedRowKey.push(...tempRowKey)
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
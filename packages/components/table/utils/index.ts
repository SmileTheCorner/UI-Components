import { Column } from "../type";

//存储最终表头数据
let data:Array<Column[]> = []
//当前列需要合并的中数
let sum = 0

//判断元素中是否还有子元素
function isHaveChildren(columns:Column[]){
   if(!columns) return false
   //深度遍历查找
   for (const item of columns){
       if(item.children && item.children.length > 0){
          return true
       }
   }
   return false
}
//获取合并的列数
function getColCount(column:Column):number{
   if(!column) return sum
   if(!column.children){
     return sum
   }else{
      column.children?.forEach(item=>{
         if(item.children && item.children.length>0){
            getColCount(item)
         }else{
            sum++
         }
      })
   }
   return sum
}
//计算合并的行和列
function calculateRowAndCol(columns:Column[]){
    // 是否拥有多级表头
    let rowData:Column[] = []
    const isHave = isHaveChildren(columns)
    if(isHave){
      columns.forEach((item:Column)=>{
          if(item.children && item.children.length>0){
            item.rowspan = 1
            item.colspan = getColCount(item)
            calculateRowAndCol(item.children)
          }else{
            item.rowspan = columns.length
            item.colspan = 1
          }
          rowData.push(item)
          sum = 0
      })
    }else{
      columns.forEach((item:Column)=>{
         item.rowspan = 1
         item.colspan = 1
         rowData.push(item)
      })
    }
    data.unshift(rowData)
}
//合并多级表头
function mergeHeaderRowAndCol(columns:Column[]){
   const column = JSON.parse(JSON.stringify(columns))
   if(!column) return []
   calculateRowAndCol(column)
   return data
}

export {mergeHeaderRowAndCol}
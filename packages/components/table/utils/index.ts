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
   mergeGroupHeader(column)
   return data
}

//表头分组合并
function mergeGroupHeader(columns:Column[]){
   // const column = JSON.parse(JSON.stringify(columns))
   // if(!column) return []
   // let data:Array<Column[]>= []
   // let depth = 0
   // //递归分组表头数据
   // getHeaderRow(column,data,depth)
   // console.log("data===>",data)
   console.log("data==1111=>",flattenTree(columns))
   return data
}

//递归分组表头分出有多少行表头
function getHeaderRow(columns:Column[],data:Array<Column[]>,depth:number){
   columns.forEach((item:Column)=>{
      if(item.children && item.children.length>0){
         getHeaderRow(item.children,data,depth+1)
      }else{
         item.level = depth
      }
   })
}

function flattenTree(tree:Column[], depth = 1, result:Array<Column[]> = []) {
   //如果当前行没有数据则初始化一个空数组
   if (!result[depth]) {
     result[depth] = []
   }
 
   tree.forEach(node => {
     node.level = depth
     result[depth].push(node)
     if (node.children && node.children.length > 0) {
       flattenTree(node.children, depth + 1, result)
     }
   })
   return result
 }

export {mergeHeaderRowAndCol}
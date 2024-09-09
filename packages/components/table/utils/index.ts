import { Column } from "../type";


//合并多级表头
function mergeHeaderRowAndCol(columns: Column[]) {
   const column = JSON.parse(JSON.stringify(columns))
   if (!column) return []
   let mergeColArray = mergeColTree(columns)
   let data = mergeRowTree(mergeColArray)
   console.log("data===>",data)
   return data
}

//计算列
function mergeColTree(tree: Column[], depth = 0, result: Array<Column[]> = []) {
   //如果当前行没有数据则初始化一个空数组
   if (!result[depth]) {
      result[depth] = []
   }
   tree.forEach(node => {
      node.level = depth
      if (node.children && node.children.length > 0) {
         node.colspan = getMergeColCount(node)
         mergeColTree(node.children, depth + 1, result)
      } else {
         node.colspan = 1
      }
      result[depth].push(node)
   })
   return result
}
// 计算行
function mergeRowTree(cols: Array<Column[]> = []) {
   if (!cols) return []
   cols.forEach(node => {
      if (node) {
         node.forEach(item => {
            if (item.children && item.children.length > 0) {
               item.rowspan = 1
            } else {
               item.rowspan = getMergeRowCount(node)
            }
         })
      }
   })
   return cols
}

//获取合并的列数
function getMergeColCount(data: Column): number {
   let sum = 0
   if (!data) {
      return sum
   }
   if (!data.children) {
      return sum
   }
   let fn = function (arr) {
      if (!arr) {
         return sum
      }
      arr.forEach(item => {
         if (item.children) {
            fn(item.children)
         } else {
            sum++
         }
      })
   }
   fn(data.children)
   return sum
}
//获取合并的行数--->如果没有孩子节点则获取同一行中有最深层孩子节点的行数，如果有孩子节点则合并的行数为 1.
function getMergeRowCount(node: Column[]): number {
   //统计node节点的最大孩子的深度
   let maxDepth = 1
   let depth = 1
   function fn(node: Column[]) {
      node.forEach(item => {
         if (item.children && item.children.length > 0) {
            depth++
            fn(item.children)
         } else {
            if (depth > maxDepth) {
               maxDepth = depth
            }
         }
      })
   }
   fn(node)
   return maxDepth
}







export { mergeHeaderRowAndCol }
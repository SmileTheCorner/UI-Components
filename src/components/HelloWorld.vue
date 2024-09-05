<template>
    <div class="zz-dynamic-table">
      <table class="customTable" border cellpadding="0" cellspacing="0">
        <thead>
          <tr v-for="(aitem, i) in newTheadData" :key="'a' + i">
            <th
              :width="bitem.width ? bitem.width : 'auto'"
              :style="{ width: bitem.width ? bitem.width : 'auto', 'text-align': bitem.align ? bitem.align : 'center' }"
              v-for="(bitem, j) in aitem"
              :key="'b' + j"
              :rowspan="bitem.rowspan"
              :colspan="bitem.colspan"
              v-html="bitem.label"
            ></th>
          </tr>
        </thead>
        <tr v-for="(item, index) in tableData" :key="index">
          <td
            v-for="(item1, key, index1) in item"
            :key="index1"
            :align="thArr[index1].align && key === thArr[index1].key ? thArr[index1].align : 'center'"
          >
            {{ item1 }}
          </td>
        </tr>
      </table>
    </div>
  </template>
  <script>
  import {mergeHeaderRowAndCol} from "../../packages/components/table/utils/index"
  export default {
    name: 'zz-dynamic-table',
    props: {
      theadData: {
        type: Array,
        default: () => [
          { key: 'date', label: '日期', align: 'left' },
          {
            label: '配送信息',
            children: [
              { key: 'name', label: '姓名' },
              {
                label: '地址',
                children: [
                  { key: 'province', label: '省份' },
                  { key: 'city', label: '市区' },
                  { key: 'address', label: '详细<br/>地址' }
                ]
              }
            ]
          },
          { key: 'zip', label: '编码' }
        ]
      }
    },
    data() {
      return {
        thArr: [],
        rows: 1,
        tableData: [
          {
            date: '323232',
            name: 'wang',
            province: 'province',
            city: 'city',
            address: 'address',
            zip: 333
          },
          {
            date: '32323221',
            name: 'wang1',
            province: 'province1',
            city: 'city11',
            address: 'address1',
            zip: 555
          }
        ],
        newTheadData: []
      }
    },
    created() {
        mergeHeaderRowAndCol
       let aa1 =  this.getTheadData(this.theadData)
       let aa =  mergeHeaderRowAndCol(this.theadData)
       console.log("aa==>",aa)
       console.log("aa111==>",aa1)
      this.newTheadData = aa
      // console.log('newTheadData=', this.newTheadData, this.rows)
      this.thArr = this.treeToFlat(this.theadData, [])
    },
    methods: {
      treeToFlat(arr, res) {
        let result = res
        arr.forEach(item => {
          if (item.children?.length) {
            this.treeToFlat(item.children, result)
          } else {
            result.push(item)
          }
        })
        return result
      },
      //获取最终结果返出去
      getTableData() {
        this.$nextTick(() => {
          let result = ''
          if (this.tableData && this.tableData.length) {
            result = JSON.stringify(this.tableData)
          }
          this.$emit('input', result)
        })
      },
      addRow() {
        this.tableData.push({})
      },
      //数组中是否有children字段
      isHaveChildren(arr) {
        if (!arr) {
          return false
        }
        for (let i = 0; i < arr.length; i++) {
          let item = arr[i]
          if (item.children && item.children.length) {
            return true
          }
        }
        return false
      },
      //获取该列合并的总数
      getColCount(data) {
        let sum = 0
        if (!data) {
          return sum
        }
        if (!data.children) {
          return sum
        }
        let _this = this
        let fn = function(arr) {
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
      },
      //重组thead数据
      getTheadData(p) {
        let params = JSON.parse(JSON.stringify(p))
        if (!params) {
          return []
        }
        let data = [],
          _this = this
        var fn = function(arr) {
          if (!arr) {
            return []
          }
          // 是否拥有多级表头
          let rowData = []
          if (_this.isHaveChildren(arr)) {
            arr.forEach(item => {
              if (item.children) {
                item.rowspan = 1
                item.colspan = _this.getColCount(item)
                fn(item.children)
              } else {
                item.rowspan = arr.length
                item.colspan = 1
              }
              rowData.push(item)
            })
            console.log("rowData=====___>",rowData)
          } else {
            arr.forEach(item => {
              item.rowspan = 1
              item.colspan = 1
              rowData.push(item)
            })
          }
          data.unshift(rowData)
        }
        if (this.isHaveChildren(params)) {
          //重组
          this.rows = params.length
          fn(params)
        } else {
          //不重组
          data.push(params)
        }
        return data
      }
    },
    watch: {
      theadData(value) {
        this.newTheadData = this.getTheadData(value)
      }
    }
  }
  </script>
  
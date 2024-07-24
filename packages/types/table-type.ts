export interface ColumnProps<T = any> {
  type?: string; //类型
  prop: string; //字段名
  label: string; //表头描述
  width?: string | number; //宽度
}

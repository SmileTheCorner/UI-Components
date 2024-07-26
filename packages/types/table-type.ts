export interface ColumnProps<T = any> {
  type?: string; //类型
  prop: string; //字段名
  label: string; //表头描述
  width?: string | number; //宽度
}

export interface PageAble {
  pageNum: number;
  pageSize: number;
  total: number;
}
export interface StateProps {
  tableData: any[];
  checkedList: any[];
  pageAble: PageAble;
  searchParam: {
    [key: string]: any;
  };
  searchInitParam: {
    [key: string]: any;
  };
  totalParam: {
    [key: string]: any;
  };
}

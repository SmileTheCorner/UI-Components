[
    {
      title: '日期',
      children: [
        { dataIndex: 'name', title: '农历' },
        {title: '公历',dataIndex: 'name'}
      ]
    },
    {
      title: '配送信息',
      children: [
        { dataIndex: 'name', title: '姓名' },
        {title: '地址',
          children: [
            { dataIndex: 'province', title: '省份' },
            { dataIndex: 'city', title: '市区' },
            { dataIndex: 'address', title: '详细地址' }
          ]
        }
      ]
    },
    { dataIndex: 'zip', title: '编码' }
  ]

  //第一步分行有一次往下分元素的
  //1行
  [
    {title: '日期'},[1,2]
    {title: '配送信息',}[1,4]
    { key: 'zip', title: '编码' }[3,1]
  ]

  //2行
  [
    { key: 'name', title: '农历' }[2,1]
    {title: '公历',key: 'name' }[2,1]
    { key: 'name', title: '姓名' }[2,1]
    { title: '地址'}[1,3]
  ]

  //3行
  [
    { key: 'province', title: '省份' }[1,1]
    { key: 'city', title: '市区' }[1,1]
    { key: 'address', title: '详细地址' }[1,1]
  ]
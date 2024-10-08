import {defineComponent,ref,watch} from "vue"
import { useSsrAdapter } from '@css-render/vue3-ssr'
import {CheckboxPropsType,type CheckboxItemType,type CheckeType} from "./type/index"
import style from "./styles/index.cssr"
import {checked,indeterminate} from "../../utils/constant"
import {cssrAnchorMetaName} from "../../utils/common"

const ShCheckbox = defineComponent({
  name:"ShCheckbox",
  props:CheckboxPropsType,
  components:{
    indeterminate,
    checked
  },
  emits:['change'],
  setup(props,ctx){
  
    let emit = ctx.emit
    // 挂载样式
    const ssrAdapter = useSsrAdapter()
    style.mount({
      id: 'sh-checkbox',
      head: true,
      anchorMetaName: cssrAnchorMetaName,
      ssr: ssrAdapter
    })
    //存储父亲组件传递过来的数据
    const checkboxList = ref<CheckboxItemType[]>(props.options)
    
    //监听数据的变化
    watch(() => props.options, (newValue) => {
      checkboxList.value = newValue;
    });

    //存储选中的的key
    const checkedRowKeys = ref<CheckeType>([])

    //存储选中的元素
    const checkedRowItems = ref<CheckboxItemType[]>([])

    //处理复选框点击事件
    const handleClick = (item:CheckboxItemType)=>{
      item.checked = !item.checked 
      if(item.checked){
        checkedRowKeys.value.push(item.value)
        checkedRowItems.value.push(item)
      }else{
        const index = checkedRowKeys.value.findIndex(obj=>obj == item.value )
        if(index !== -1){
          checkedRowKeys.value.splice(index,1)
        }
        const itemIndex = checkedRowItems.value.findIndex((obj: CheckboxItemType) => obj.value == item.value)
        if (itemIndex !== -1) {
          checkedRowItems.value.splice(itemIndex, 1)
        }
      }
      emit('change',item)
    }

    return {
     checkboxList,
     handleClick
    }
  },
  render(){
    const {handleClick,checkboxList} = this
    return(
      <div class="sh-checkbox">
        {checkboxList.map(item=>(
          <div class="sh-checkbox__container">
          <div class={["sh-checkbox__box",item.checked ? "sh-checkbox__box--is-checked" : ""]} onClick={()=>handleClick(item)}>
            {item.checked ? item.indeterminate ? <indeterminate /> : <checked /> : ''}
          </div>
          <span class="sh-checkbox__label">{item.label}</span>
        </div>
        ))}
      </div>
    )
  }
  
})

export default ShCheckbox
import {defineComponent,ref} from "vue"
import { useSsrAdapter } from '@css-render/vue3-ssr'
import {checkboxPropsType,type checkboxItemType,type checkeType} from "./type/index"
import style from "./styles/index.cssr"
import {checked,indeterminate} from "../../utils/constant"
import {cssrAnchorMetaName} from "../../utils/common"

const ShCheckbox = defineComponent({
  name:"ShCheckbox",
  props:checkboxPropsType,
  components:{
    indeterminate,
    checked
  },
  emits: ['update:modelValue', 'change'],
  setup(props,ctx){
     const emit = ctx.emit
    // 挂载样式
    const ssrAdapter = useSsrAdapter()
    style.mount({
      id: 'sh-checkbox',
      head: true,
      anchorMetaName: cssrAnchorMetaName,
      ssr: ssrAdapter
    })

    //获取props中options
    const checkeboxList = ref<checkboxItemType[]>(props.options)

    //存储选中的的key
    const checkedRowKeys = ref<checkeType>([])

    //存储选中的元素
    const checkedRowItems = ref<checkboxItemType[]>([])

    //处理复选框点击事件
    const handleClick = (item:checkboxItemType)=>{
      item.checked = !item.checked as unknown as { type: Boolean; default: false; }
      if(item.checked){
        checkedRowKeys.value.push(item.value)
        checkedRowItems.value.push(item)
      }else{
        const index = checkedRowKeys.value.findIndex(obj=>obj == item.value )
        if(index !== -1){
          checkedRowKeys.value.splice(index,1)
        }
        const itemIndex = checkedRowItems.value.findIndex((obj: checkboxItemType) => obj.value == item.value)
        if (itemIndex !== -1) {
          checkedRowItems.value.splice(itemIndex, 1)
        }
      }
      emit("update:modelValue",checkedRowKeys.value)
      emit("change",checkedRowItems.value)
    }

    return {
      checkeboxList,
      handleClick
    }
  },
  render(){
    const {checkeboxList,handleClick} = this
    console.log("checkeboxList===>",checkeboxList)
    return(
      <div class="sh-checkbox">
        {checkeboxList.map(item=>(
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
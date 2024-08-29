import { defineComponent ,PropType,ref} from "vue"


const aa = defineComponent({
  name: "aa",
  props:{
    options:{
        type: Object as PropType<{ value: string; checked: boolean }>,
        default:()=>{}
    }
  },
  setup(props, ctx) {
    return () => (
     <span>{props.options.checked ? '好':'不好'}</span>
    )
  }
})

export default aa
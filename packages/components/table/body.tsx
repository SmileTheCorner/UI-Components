import { defineComponent,PropType} from "vue"


const ShTableBody = defineComponent({
  name: "ShTableBody",
  props:{
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: null
    }
  },
  setup(props, _ctx) {
    return () => (
      <tbody>
        {props.data.map((item,index)=>(
          <tr key={index}>
           {Object.keys(item).map((key)=>(
            <td>{item[key]}</td>
          ))}
          </tr>
        ))}
      </tbody>
    )
  }
})

export default ShTableBody

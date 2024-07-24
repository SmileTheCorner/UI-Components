import { defineComponent } from "vue"


const ShTableHead = defineComponent({
  name: "ShTableHead",
  props: {
    data: {
      type: Array as () => string[],
      default: []
    }
  },
  setup(props, ctx) {
    return () => (
      <thead>
        <tr>
          {props.data.map((item, index) => {
            <th scope="col">{item}</th>
          })}
        </tr>
      </thead>
    )
  }
})

export default ShTableHead

import { defineComponent } from "vue"


const ShTableFoot = defineComponent({
  name: "ShTableFoot",
  setup(props, ctx) {
    return () => (
      <tfoot>
        <tr>
          <th scope="row" colspan="4">Average age</th>
          <td>33</td>
        </tr>
      </tfoot>
    )
  }
})

export default ShTableFoot

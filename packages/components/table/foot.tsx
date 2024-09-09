import { defineComponent } from "vue"


const ShTableFoot = defineComponent({
  name: "ShTableFoot",
  setup(props, ctx) {
    return () => (
      <tfoot>
        <tr>
          <th scope="row" colspan="8">Average age</th>
          <td colspan="4">33</td>
        </tr>
      </tfoot>
    )
  }
})

export default ShTableFoot

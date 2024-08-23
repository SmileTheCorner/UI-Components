import { defineComponent } from "vue"
import { checked, indeterminate } from "../../utils/constant"
const ShCheckboxButton = defineComponent({
  name: "ShCheckboxButton",
  components: { checked, indeterminate },
  setup(props, ctx) {

  },
  render() {
    return (
      <div class="sh-checkbox">
        <div class="sh-checkbox__container">
          <div class="sh-checkbox__box">
            {checked}
          </div>
          <span class="sh-checkbox__label"></span>
        </div>
      </div>
    )
  }
})
export default ShCheckboxButton

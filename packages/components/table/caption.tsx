import { defineComponent } from "vue"


const ShTableCaption = defineComponent({
  name: "ShTableCaption",
  setup(props, ctx) {
    return () => (
      <caption>
        Front-end web developer course 2021
      </caption>
    )
  }
})

export default ShTableCaption

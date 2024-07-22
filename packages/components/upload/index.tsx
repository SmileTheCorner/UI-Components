import { defineComponent } from "vue"
import style from "./index.module.scss"
const ShUpload = defineComponent({
  name: "ShUpload",
  props: {
    multiple: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, ctx) {
    //选择文件
    const changeFiles = (e: Event) => {
      //获取文件列表
      const fileElement = e.target as HTMLInputElement
      const files = fileElement.files
      // 确保至少有一个文件被选中
      if (files && files.length > 0) {
        for (const file of files) {
          console.log("file.size===>", file.size)
          console.log("file.type===>", file.type)
          console.log("file.name===>", file.name)
        }
      }
    }
    return () => (
      <div class={style.shUploadBox}>
        <div class={style.shUploadContent}>
          <sh-icon icon="upload"></sh-icon>
          <span class={style.textDescribe}>将文件拖至此处或点击上传</span>
          <input type="file" multiple={props.multiple} class={style.shInputFile} onChange={changeFiles}></input>
        </div>
      </div>
    )
  }
})

export default ShUpload

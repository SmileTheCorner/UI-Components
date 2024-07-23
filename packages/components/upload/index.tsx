import { defineComponent, nextTick } from "vue"
import { FileAndEntry, UploadSettledFileInfo } from "../../types/upload-type"
import { generateUUID } from "../../utils/rand"
import style from "./index.module.scss"
const ShUpload = defineComponent({
  name: "ShUpload",
  props: {
    //是否支持多选
    multiple: {
      type: Boolean,
      default: false,
    },
    //接受的类型
    accept: {
      type: String,
      default: '',
    },
    //是否限制文件上传的大小
    max: Number,
    //是否支持拖拽上传
    drag: {
      type: Boolean,
      default: true,
    }
  },
  setup(props, ctx) {
    const slot = ctx.slots
    nextTick(() => {
      const uploadInputElement = document.getElementById("uploadInput")
      //不支持拖拽上传
      if (!props.drag) {
        uploadInputElement?.addEventListener("dragover", (e) => {
          e.preventDefault();
          e.stopPropagation();
        })
        uploadInputElement?.addEventListener("drop", (e) => {
          e.preventDefault();
          e.stopPropagation();
        })
      }
    })
    //选择文件
    const changeFiles = (e: Event) => {
      //获取文件列表
      const target = e.target as HTMLInputElement
      handleFileAddition(target.files ? Array.from(target.files).map(file => ({ file, entry: null, source: 'input' })) : null, e)
    }
    const handleFileAddition = (fileAndEntries: FileAndEntry[] | null, e?: Event) => {
      if (!fileAndEntries || fileAndEntries.length === 0) {
        return
      }
      //判断是否为多选，如果为多选则直接返回fileAndEntries，否则取第一项返回
      fileAndEntries = props.multiple ? fileAndEntries : [fileAndEntries[0]]
      // TODO: 判断是否限制大小
      const fileInfo = fileAndEntries.map(({ file, entry }) => {
        const fileInfo: UploadSettledFileInfo = {
          id: generateUUID(),
          batchId: generateUUID(),
          name: file.name,
          status: 'pending',
          percentage: 0,
          file,
          url: null,
          type: file.type,
          thumbnailUrl: null,
          fullPath: entry?.fullPath ?? `/${file.webkitRelativePath || file.name}`
        }
        return fileInfo
      })
    }
    return () => (
      <div class={style.shUploadBox}>
        <div class={style.shUploadContent}>
          {slot.default ? slot.default() : <div class={style.iconUpload}>
            <sh-icon icon="upload"></sh-icon>
            <span class={style.textDescribe}>将文件拖至此处或点击上传</span>
          </div>}
          <input type="file" id="uploadInput" multiple={props.multiple} class={style.shInputFile} onChange={changeFiles}></input>
        </div>
      </div>
    )
  }
})

export default ShUpload

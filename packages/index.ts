import type { App } from "vue"
import ShInput from "./components/input/index.tsx"
import ShSelect from "./components/select/index.tsx"
import ShButton from "./components/button/index.tsx"
import ShIcon from "./components/icon/index.tsx"
import ShRadio from "./components/radio/index.tsx"
import ShRadioGroup from "./components/radio/radio-group.tsx"
import ShTag from "./components/tag/index.tsx"
import ShWitch from "./components/switch/index.tsx"
import ShUpload from "./components/upload/index.tsx"
import ShTable from "./components/table/index.tsx"
import ShCheckbox from "./components/checkbox/index.tsx"
import ShCheckboxButton from "./components/checkbox-button/index.tsx"
import "./static/css/globle.scss"
import "./components/icon/index.ts"
import { Selected, Options } from "./types/select-type.ts"

export type { Selected, Options }

//所有组件列表
const components = [
  ShUpload,
  ShInput,
  ShSelect,
  ShButton,
  ShIcon,
  ShRadio,
  ShRadioGroup,
  ShTag,
  ShWitch,
  ShTable,
  ShCheckbox,
  ShCheckboxButton
]

// 定义 install 方法
const install = (app: App): void => {
  // 遍历注册所有组件
  components.forEach(component => {
    app.component(component.name as string, component)
  })
}

export default install

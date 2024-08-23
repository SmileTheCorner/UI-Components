import CssRender from "css-render"
import bem from '@css-render/plugin-bem'
import variables from "../static/css/variables.module.scss";


const namespace = 'sh'
const prefix = `.${namespace}-`
const elementPrefix = '__'
const modifierPrefix = '--'

const cssr = CssRender()
const plugin = bem({
  blockPrefix: prefix,
  elementPrefix,
  modifierPrefix
})
//将插件与cssr实例绑定
cssr.use(plugin)

const { cB, cE, cM } = plugin
const { c, find } = cssr

const style = c([
  cB('checkbox', null,
    [cE('container', {
      width: 'fit-content',
      display: 'flex',
      alignItems: "center"
    }, [cE('box', {
      width: variables.shCheckboxWidth,
      height: variables.shCheckboxHeight,
      border: `2px solid ${variables.shBorderColor}`,
      borderRadius: variables.shRadius,
    }, [
      c(' > svg', {
        width: variables.shCheckboxWidth,
        height: variables.shCheckboxHeight,
        fill: variables.shMainColor
      })
    ]),
    cE('label', {
      marginLeft: "4px"
    })])]
  ),
])
console.log("style", style.render())
export { cB, cE, cM, c, find }

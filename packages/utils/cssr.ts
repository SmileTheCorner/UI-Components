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

const style = c('table',null,[
  c( 'table' ,{
    borderCollapse: 'collapse',
    border: `2px solid ${variables.shBorderColor}`,
    fontSize: variables.shFontSize,
    letterSpacing: '1px',
    width: '100%',
  }),
  c( 'thead,tfoot' ,{
      backgroundColor: variables.shBgColor,
      fontWeight: 'bold',
  }),
  c( 'tbody > tr:nth-of-type(even)' ,{
      backgroundColor: 'rgba(40, 44, 56, 0.4)',
  }),
  c( 'tbody > tr:nth-of-type(odd)' ,{
      backgroundColor: 'rgba(40, 44, 56, 0.6)',
  }),
  c( 'th,td' ,{
    border: `1px solid ${variables.shBorderColor}`,
    padding: '8px 10px',
    textAlign: 'center',
  }),
  c( 'caption' ,{
      captionSide: 'bottom',
      padding: '8px',
      fontWeight: 'bold',
  })
])
console.log(style.render())
export { cB, cE, cM, c, find }

import { c, cB, cE, cM } from "../../../utils/cssr"
import variables from "../../../static/css/variables.module.scss";

export default c([
  cB('checkbox', {
    width: 'fit-content',
    display: "flex",
    alignItems: "center"
  },
    [c(' > div', {
      marginRight: '8px'
    }),
    c(' > div:last-child', {
      marginRight: 0
    })
      , cE('container', {
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
          fill: variables.shMainColor,

        }, [c('> path', {
          stroke: variables.shMainColor,
        })]),
        cM('is-checked',{
          background:variables.shMaincolor1,
          borderColor :variables.shMainColor
       })
      ]),
      cE('label', {
        marginLeft: "4px"
      })])]
  ),
])

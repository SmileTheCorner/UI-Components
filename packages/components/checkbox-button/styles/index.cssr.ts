import { c, cB, cE, cM } from "../../../utils/cssr"
import variables from "../../../static/css/variables.module.scss";

export default c([
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

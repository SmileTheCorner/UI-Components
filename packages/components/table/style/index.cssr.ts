import { c, cB, cE, cM } from "../../../utils/cssr"
import variables from "../../../static/css/variables.module.scss";

export default c([
    cB('table',null,[
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
])
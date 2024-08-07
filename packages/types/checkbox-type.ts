export type checkboxPropsType = {
  label: {
    type: [String, Boolean, Number, Object],
    default: undefined,
  },
  value: {
    type: [String, Boolean, Number, Object],
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  checked: {
    type: Boolean,
    default: false
  },
  isCheckedAll: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
}

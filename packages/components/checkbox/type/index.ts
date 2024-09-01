export type CheckboxItemType = {
  label: String|Number,
  value: String|Boolean|Number|Object,
  disabled: Boolean,
  checked: Boolean,
  indeterminate: Boolean,
  border: Boolean
}

export type CheckeType = (String|Boolean|Number|Object)[]

export const CheckboxPropsType = {
  options: {
    type: Array as () => CheckboxItemType[],
    default: () => []
  },
  modelValue: {
    type: Array as () => CheckeType[],
    default: () => [],
  },
}

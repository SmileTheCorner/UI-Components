export type checkboxItemType = {
  label: {
    type: String|Boolean|Number|Object,
    default: undefined,
  },
  value: {
    type: String|Boolean|Number|Object,
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
  indeterminate: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  }
}

export type checkeType = (String|Boolean|Number|Object)[]

export const checkboxPropsType = {
  options: {
    type: Array as () => checkboxItemType[] | checkboxItemType,
    default: () => []
  },
  modelValue: {
    type: Array as () => checkeType[],
    default: () => [],
  },
}

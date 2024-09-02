export type CheckboxItemType = {
  label: string|number,
  value: string|boolean|number|object,
  disabled: boolean,
  checked: boolean,
  indeterminate: boolean,
  border: boolean
}

export type CheckeType = (string|boolean|number|object)[]

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

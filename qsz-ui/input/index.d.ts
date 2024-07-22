
declare const ShInput: import('vue').DefineComponent<{
    modelValue: StringConstructor;
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => any, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: StringConstructor;
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
}, {}>;
export default ShInput;

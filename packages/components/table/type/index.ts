export type Column = {
    title?: string
    type?: string
    rowspan?: number,
    colspan?: number,
    key?: string | number
    level?: number,
    children?: Array<Column>
}
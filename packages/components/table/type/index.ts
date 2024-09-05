export type Column = {
    title: string
    type?: string
    rowspan?: number,
    colspan?: number,
    key?: string | number
    children?: Array<Column>
}
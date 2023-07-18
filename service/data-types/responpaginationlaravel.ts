export interface ResponsePaginationLaravel<DataType> {
    data: DataType,
    links: { first: string, last: string, next: string, prev: string | null },
    meta: {
        count: number,
        current_page: string,
        total: number,
        total_page: number
    }
}
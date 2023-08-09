import { format } from "date-fns"

const COLUMNS = [
    {
        Header: 'PT',
        accessor: 'hasPt',
        Cell: ({ value }) => {
            return (
                <center>
                    <input type="checkbox" checked={value} readOnly placeholder="Có PT?"/>
                </center>
            )
        },
        disableGlobalFilter: true,
        disableSortBy: true,
        width: 30
    },
    {
        Header: 'NE',
        accessor: 'hasNe',
        Cell: ({ value }) => {
            return (
                <center>
                    <input type="checkbox" checked={value} readOnly placeholder="Có NE?"/>
                </center>
            )
        },
        disableGlobalFilter: true,
        disableSortBy: true,
        width: 30
    },
    {
        Header: 'Ngày Tạo',
        accessor: 'createDate',
        Cell: ({ value }) => {
            return format(new Date(value), 'dd/MM/yyyy')
        },
        disableGlobalFilter: true,
        width: 40
    },
    {
        Header: 'Tổng giá',
        accessor: 'price',
        Cell: ({ value }) => {
            return Number(value).toLocaleString() + ' đ'
        },
        width: 80
    }
]

export default COLUMNS;
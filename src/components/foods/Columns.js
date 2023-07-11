import {format} from 'date-fns'

const COLUMNS = [
    {
        Header: 'Tên',
        accessor: 'name'
    },
    {
        Header: 'Ngày Tạo',
        accessor: 'createDate',
        disableGlobalFilter: true,
        Cell: ({ value }) => {return format(new Date(value), 'dd/MM/yyyy')}
    }
]

export default COLUMNS;
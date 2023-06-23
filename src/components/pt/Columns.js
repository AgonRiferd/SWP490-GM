import { format } from 'date-fns'

const COLUMNS = [
    {
        Header: 'Họ và Tên',
        accessor: 'name',
        width: 200
    },
    {
        Header: 'Giới tính',
        accessor: 'gender',
        Cell: ({ value }) => {
            return value === 'M' ? 'Male' : value === 'F' ? 'Female' : 'Unknown'
        },
        width: 80
    },
    {
        Header: 'Số điện thoại',
        accessor: 'phone',
        width: 120
    },
    {
        Header: 'Ngày tham gia',
        accessor: 'dateJoin',
        Cell: ({ value }) => {return format(new Date(value), 'dd/MM/yyyy')}
    }
]

export default COLUMNS;
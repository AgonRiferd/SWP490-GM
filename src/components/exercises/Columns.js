import {format} from 'date-fns'

const COLUMNS = [
    {
        Header: 'Tên',
        accessor: 'name'
    },
    {
        Header: 'Video ID',
        accessor: 'videoId'
    },
    {
        Header: 'Ngày Tạo',
        accessor: 'time',
        Cell: ({ value }) => {return format(new Date(value), 'dd/MM/yyyy')}
    }
]

export default COLUMNS;
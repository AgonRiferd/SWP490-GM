import {format} from 'date-fns'

const COLUMNS = [
    {
        Header: 'Tên',
        accessor: 'name'
    },
    {
        Header: 'Ngày Tạo',
        accessor: 'time',
        Cell: ({ value }) => {return format(new Date(value), 'dd/MM/yyyy')}
    },
    {
        Header: 'Video Link',
        accessor: 'videoId',
        Cell: ({ value }) => (
            <a href={value} target="_blank" rel="noopener noreferrer">
                {value}
            </a>
        )
    }
]

export default COLUMNS;
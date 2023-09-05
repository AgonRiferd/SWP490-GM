import { format } from 'date-fns'

const COLUMNS = [
    {
        Header: 'Tên',
        accessor: 'name',
        width: 80
    },
    {
        Header: 'Ngày Tạo',
        accessor: 'createDate',
        disableGlobalFilter: true,
        Cell: ({ value }) => { 
            return format(new Date(value), 'dd/MM/yyyy') 
        },
        width: 60
    },
    {
        Header: 'Video Link',
        accessor: 'video',
        disableGlobalFilter: true,
        disableSortBy: true,
        Cell: ({ value }) => (
            <div className='row-link'>
                <a href={value} target="_blank" rel="noopener noreferrer">
                    <span>{value}</span>
                </a>
            </div>
        ),
        width: 100
    }
]

export default COLUMNS;
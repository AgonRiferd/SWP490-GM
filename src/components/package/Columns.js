import { format } from 'date-fns'

const COLUMNS = [
    {
        Header: 'Gymer',
        accessor: 'gymer.name'
    },
    {
        Header: 'PT',
        accessor: 'pt.name'
    },
    {
        Header: 'NE',
        accessor: 'ne.name'
    },
    {
        Header: 'Order Day',
        accessor: 'orderDay',
        Cell: ({ value }) => {return format(new Date(value), 'dd/MM/yyyy')}
    },
    {
        Header: 'Price',
        accessor: 'price'
    }
]

export default COLUMNS;
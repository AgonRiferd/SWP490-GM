const COLUMNS = [
    {
        Header: 'PT',
        accessor: 'hasPt',
        disableGlobalFilter: true,
        Cell: ({ value }) => {
            return <input type="radio" checked={value} readOnly placeholder="Có PT?"/>
        },
        width: 30
    },
    {
        Header: 'NE',
        accessor: 'hasNe',
        disableGlobalFilter: true,
        Cell: ({ value }) => {
            return <input type="radio" checked={value} readOnly placeholder="Có NE?"/>
        },
        width: 30
    },
    {
        Header: 'Tổng số buổi',
        accessor: 'numberOfsession'
    },
    {
        Header: 'Giá tiền',
        accessor: 'price'
    }
]

export default COLUMNS;
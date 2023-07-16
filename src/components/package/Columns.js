
const booleanSortFunction = (rowA, rowB, columnId) => {
    const valueA = rowA.values[columnId] ? 1 : 0;
    const valueB = rowB.values[columnId] ? 1 : 0;

    return valueA - valueB;
};

const COLUMNS = [
    {
        Header: 'Tên Dịch Vụ',
        accessor: 'name'
    },
    {
        Header: 'Tổng số buổi',
        accessor: 'numberOfsession',
        width: 80
    },
    {
        Header: 'PT',
        accessor: 'hasPt',
        disableGlobalFilter: true,
        Cell: ({ value }) => {
            return (
                <center>
                    <input type="checkbox" checked={value} readOnly placeholder="Có PT?"/>
                </center>
            )
        },
        sortType: booleanSortFunction,
        width: 30
    },
    {
        Header: 'NE',
        accessor: 'hasNe',
        disableGlobalFilter: true,
        Cell: ({ value }) => {
            return (
                <center>
                    <input type="checkbox" checked={value} readOnly placeholder="Có NE?"/>
                </center>
            )
        },
        sortType: booleanSortFunction,
        width: 30
    },
    {
        Header: 'Tổng giá',
        accessor: 'price',
        Cell: ({ value }) => {
            return Number(value).toLocaleString() + ' đ'
        },
    }
]

export default COLUMNS;
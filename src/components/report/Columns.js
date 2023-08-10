import { format } from "date-fns";

const COLUMNS = [
    {
        Header: 'Tên thành viên',
        accessor: 'gymerName'
    },
    {
        Header: 'Tên gói tập',
        accessor: 'packageName',
        disableGlobalFilter: true
    },
    {
        Header: 'Ngày mua',
        accessor: 'from',
        Cell: ({ value }) => {
            return format(new Date(value), 'dd/MM/yyyy')
        },
        disableGlobalFilter: true
    }
]

export default COLUMNS;
import { format } from "date-fns"

const COLUMNS = [
    {
        Header: 'Tên gói tập',
        accessor: 'name',
        disableSortBy: true,
    },
    {
        Header: 'Thời gian bắt đầu',
        accessor: 'from',
        Cell: ({ value }) => {
            return (
                <>
                    {value ?
                        format(new Date(value), 'dd/MM/yyyy') 
                        :
                        <span className="status-error">
                            Không có dữ liệu
                        </span>
                    }
                </>
            )
        },
        disableGlobalFilter: true,
        width: 50
    },
    {
        Header: 'Trạng thái',
        accessor: 'status',
        disableGlobalFilter: true,
        disableSortBy: true,
        width: 60
    }
]

export default COLUMNS;
import { formatPhoneNumber } from "../../utils/convert";

const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
        disableSortBy: true,
        disableGlobalFilter: true
    },
    {
        Header: 'Số điện thoại',
        accessor: 'phoneNo',
        width: 60,
        disableSortBy: true,
        Cell: ({value}) => {
            return formatPhoneNumber(value)
        }
    },
    {
        Header: 'Họ và Tên',
        accessor: 'fullname',
        width: 100,
    },
    {
        Header: 'Giới tính',
        accessor: 'gender',
        Cell: ({ value }) => {
            return value === 'M' ? 'Nam' : value === 'F' ? 'Nữ' : value
        },
        disableGlobalFilter: true, // Không cho phép tìm kiếm trong cột này
        width: 40
    },
    {
        Header: 'Trạng Thái',
        accessor: 'isDelete',
        Cell: ({ value }) => {
            return value ? <span className="status-lock">Bị khóa</span> : <span className="status-active">Hoạt động</span>
        },
        disableGlobalFilter: true, // Không cho phép tìm kiếm trong cột này
        width: 50
    }
]

export default COLUMNS;
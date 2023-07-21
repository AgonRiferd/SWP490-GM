import { format } from 'date-fns'
import { formatPhoneNumber } from '../../utils/convert'

const COLUMNS = [
    {
        Header: 'Số điện thoại',
        accessor: 'phoneNo',
        width: 120,
        disableSortBy: true,
        Cell: ({value}) => {
            return formatPhoneNumber(value)
        }
    },
    {
        Header: 'Họ và Tên',
        accessor: 'fullname',
        width: 200
    },
    {
        Header: 'Giới tính',
        accessor: 'gender',
        Cell: ({ value }) => {
            return value === 'M' ? 'Nam' : value === 'F' ? 'Nữ' : value
        },
        disableGlobalFilter: true, // Không cho phép tìm kiếm trong cột này
        width: 80
    },
    {
        Header: 'Ngày tham gia',
        accessor: 'createDate',
        Cell: ({ value }) => {
            return format(new Date(value), 'dd/MM/yyyy')
        },
        disableGlobalFilter: true,
        width: 100
    },
    {
        Header: 'Trạng Thái',
        accessor: 'isLock',
        Cell: ({ value }) => {
            return value ? <span className="status-lock">Bị khóa</span> : <span className="status-active">Hoạt động</span>
        },
        disableGlobalFilter: true, // Không cho phép tìm kiếm trong cột này
        width: 80
    }
]

export default COLUMNS;
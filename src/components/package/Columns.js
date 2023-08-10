import { format } from "date-fns"

const COLUMNS = [
    {
        Header: 'PT',
        accessor: 'hasPt',
        Cell: ({ value }) => {
            return (
                <center>
                    <input type="checkbox" checked={value} readOnly placeholder="Có PT?"/>
                </center>
            )
        },
        disableGlobalFilter: true,
        disableSortBy: true,
        width: 30
    },
    {
        Header: 'NE',
        accessor: 'hasNe',
        Cell: ({ value }) => {
            return (
                <center>
                    <input type="checkbox" checked={value} readOnly placeholder="Có NE?"/>
                </center>
            )
        },
        disableGlobalFilter: true,
        disableSortBy: true,
        width: 30
    },
    {
        Header: 'Ngày Tạo',
        accessor: 'createDate',
        Cell: ({ value }) => {
            return format(new Date(value), 'dd/MM/yyyy')
        },
        disableGlobalFilter: true,
        width: 40
    },
    {
        Header: (
            <div className="price-header">
                <span className="title">
                    Tổng giá
                </span>
                <i className="fa-solid fa-circle-exclamation" title="Đã tính giảm giá (nếu có)"/>
            </div>
        ),
        accessor: 'price',
        Cell: ({ row  }) => {
            const { price, discount } = row.original;
            return (
                <div className="package-price">
                    <div className="price">
                        {Number(price).toLocaleString()} đ
                    </div>
                    { discount && (
                        <div className="discount">
                            - {discount}%
                        </div>
                    )}
                </div>
            );
        },
        width: 80
    }
]

export default COLUMNS;
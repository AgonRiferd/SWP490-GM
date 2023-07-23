import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import Dialog from "./dialog";

/**
 * @param {JSON} data dữ liệu đầu vào dưới dạng json
 * @param {Array} columns một mảng xác định các cột của bảng
 * @param {Array} sortees một mảng chứa tên cột và giá trị boolean dùng để xác định cột sắp xếp mặc định.
 * @param {JSON} dialogs một mảng chứa các chức năng cho dialog: tạo: dialogCreate, 
 * sửa: dialogEdit, xóa: dialogDelete.
 * @returns bảng giá trị được sắp xếp và có các chức năng: tìm kiếm, phân trang và dialog cho CRUD.
 */

export const AdvanceTable = ({ data, columns: initialColumns, sortees, dialogs, viewData }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isShowAll, setIsShowAll] = useState(false);
    const [hasIsLocked, setHasIsLocked] = useState(false);
    const { dialogCreate, dialogView, dialogEdit, dialogDelete } = dialogs;

    const columns = useMemo(
        () => [
            ...initialColumns,
            {
                Header: 'Hoạt Động Quản Lý',
                disableSortBy: true,
                disableGlobalFilter: true,
                Cell: ({ row }) => (
                    <div className="table-actions">
                        {dialogView &&
                            <span onClick={() => handleAction(dialogView, row.original)} title={dialogView.title ? dialogView.title : 'View'}>
                                {dialogView.icon ? dialogView.icon : dialogView.title ? dialogView.title : 'View'}
                            </span>
                        }
                        {viewData &&
                            <span onClick={() => viewData.setDataView(row.original)} title={viewData.title ? viewData.title : 'View'}>
                                {viewData.icon ? viewData.icon : viewData.title ? viewData.title : 'View'}
                            </span>
                        }
                        {dialogEdit &&
                            <span onClick={() => handleAction(dialogEdit, row.original)} title={dialogEdit.title ? dialogEdit.title : 'Edit'}>
                                {dialogEdit.icon ? dialogEdit.icon : dialogEdit.title ? dialogEdit.title : 'Edit'}
                            </span>
                        }
                        {dialogDelete &&
                            <span onClick={() => handleAction(dialogDelete, row.original)} title={dialogDelete.title ? dialogDelete.title : 'Delete'}>
                                {dialogDelete.icon ? dialogDelete.icon : dialogDelete.title ? dialogDelete.title : 'Delete'}
                            </span>
                        }
                    </div>
                ),
                width: 170
            },
        ], [initialColumns, dialogView, viewData, dialogEdit, dialogDelete]
    );

    const handleAction = (mode, rowData) => {
        setDialogMode(mode);
        setSelectedRow(rowData);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleCreate = () => {
        setDialogMode(dialogCreate);
        setSelectedRow(null);
        setIsDialogOpen(true);
    };

    const booleanSortFunction = (rowA, rowB, columnId) => {
        const valueA = rowA.values[columnId] ? 1 : 0;
        const valueB = rowB.values[columnId] ? 1 : 0;

        return valueA - valueB;
    };

    const customColumns = useMemo(() => {
        return columns.map((column) => {
            if (column.accessor === 'isDelete') {
                setHasIsLocked(true);
                return {
                    ...column,
                    sortType: booleanSortFunction,
                    disableSortBy: !isShowAll// Sử dụng custom sort function cho cột kiểu boolean
                };
            }
            return column;
        });
    }, [columns, isShowAll]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        canNextPage,
        previousPage,
        canPreviousPage,
        gotoPage,
        pageCount,
        prepareRow,
        state,
        setGlobalFilter,
        setPageSize
    } = useTable(
        useMemo(() => ({
            columns: customColumns,
            data: isShowAll ? data : (data ? data.filter(row => !row.isDelete) : data),
            initialState: { sortBy: sortees },
        }), [customColumns, data, isShowAll, sortees]
        ), useGlobalFilter, useSortBy, usePagination
    );

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <>
            <div className="common-options">
                <div className="page-size">
                    <span>Hiển thị:{' '}</span>
                    <select value={pageSize} onChange={(e) => {
                        const newSize = Number(e.target.value);
                        if (newSize !== pageSize) {
                            setPageSize(newSize);
                        }
                    }} title="Page Size">
                        {
                            [10, 25, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="search-bar">
                    <span>
                        Tìm kiếm: {' '}
                        <input value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Tìm kiếm" />
                    </span>
                </div>
                {dialogCreate &&
                    <div className="button-create">
                        <button type="button" className="any-button" onClick={handleCreate}>
                            {dialogCreate.icon &&
                                <span className="icon-create">
                                    {dialogCreate.icon}
                                </span>
                            }
                            {dialogCreate.title}
                        </button>
                    </div>
                }

            </div>
            <table {...getTableProps()} className="custom-table table-exercise">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ width: column.width }}>
                                    <div className="flex">
                                        <span>{column.render("Header")}</span>
                                        {column.disableSortBy ? null : (
                                            <span className="sort-toggle">
                                                {column.isSorted ?
                                                    (column.isSortedDesc ?
                                                        <i className="fa-solid fa-sort-up" /> : <i className="fa-solid fa-sort-down" />
                                                    ) : <i className="fa-solid fa-sort" />
                                                }
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {data.length > 0 ? page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        )
                    }) : (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: "center" }}>
                                <span className="status-error">Không có dữ liệu</span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="common-options">
                {pageCount > 1 &&
                    <>
                        <div className="pagination-goto">
                            <span>Đến trang: {' '}</span>
                            <input type='number' defaultValue={pageIndex + 1} min="1"
                                onChange={(e) => {
                                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                    gotoPage(pageNumber);
                                }}
                            />
                        </div>
                        <div className="pagination-buttons">
                            <div className="pagination-previous-buttons">
                                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} type="button">{'<<'}</button>
                                <button onClick={() => previousPage()} disabled={!canPreviousPage} type="button">Trước</button>
                            </div>
                            <span className="current-page">{(pageIndex + 1) + ' / ' + pageCount}</span>
                            <div className="pagination-next-buttons">
                                <button onClick={() => nextPage()} disabled={!canNextPage} type="button">Sau</button>
                                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} type="button">{'>>'}</button>
                            </div>
                        </div>
                    </>
                }
                {hasIsLocked &&
                    <div className="show-all-checkbox">
                        <label>
                            Trạng Thái:
                            <input
                                type="checkbox"
                                checked={isShowAll}
                                onChange={() => setIsShowAll(!isShowAll)}
                            />
                            Hiển thị tất cả
                        </label>
                    </div>
                }
            </div>
            {isDialogOpen && (
                <Dialog mode={dialogMode} rowData={selectedRow} onClose={handleCloseDialog} />
            )}
        </>
    )
};
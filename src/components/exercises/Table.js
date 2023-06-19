import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import COLUMNS from "./Columns";
import DATA from "./DATA.json";
import SearchBar from "./SearchBar";
import {default as DialogCreate} from "./dialog/create";

const Table = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => DATA, []);
    const [dialogCreateIsOpen, setDialogCreateIsOpen] = useState(false);

    const handleDialogCreate = () => {
        setDialogCreateIsOpen(!dialogCreateIsOpen);
    };

    const defaultSortColumn = 'name';
    const defaultSortOrder = 'asc';

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
    } = useTable({ columns, data , 
        initialState: {sortBy:[{ id: defaultSortColumn, desc: defaultSortOrder === 'desc' }]}
    }, useGlobalFilter, useSortBy, usePagination);

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <>
            <div className="common-options">
                <div className="page-size">
                    <span>Hiển thị:{' '}</span>
                    <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} title="Page Size">
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
                    <SearchBar filter={globalFilter} setFilter={setGlobalFilter} />
                </div>
                <div className="button-create">
                    <button type="button" onClick={handleDialogCreate}>Thêm mới</button>
                </div>
            </div>
            <table {...getTableProps()} className="custom-table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    <div className="flex">
                                        <span>{column.render("Header")}</span>
                                        <span className="sort-toggle">
                                            {column.isSorted ?
                                                (column.isSortedDesc ?
                                                    <i className="fa-solid fa-sort-up" /> : <i className="fa-solid fa-sort-down" />
                                                ) : <i className="fa-solid fa-sort" />
                                            }
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
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
                    })}
                </tbody>
            </table>
            {pageCount > 1 ?
                <div className="common-options">
                    <div className="pagination-buttons">
                        <div className="pagination-previous-buttons">
                            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} type="button">{'<<'}</button>
                            <button onClick={() => previousPage()} disabled={!canPreviousPage} type="button">Trước</button>
                        </div>
                        <span className="current-page">{(pageIndex + 1) + ' / ' + pageCount }</span>
                        <div className="pagination-next-buttons">
                            <button onClick={() => nextPage()} disabled={!canNextPage} type="button">Sau</button>
                            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} type="button">{'>>'}</button>
                        </div>
                    </div>
                    <div className="pagination-goto">
                        <span>Đến trang: {' '}</span>
                        <input type='number' defaultValue={pageIndex + 1} min="1"
                            onChange={(e) => {
                                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(pageNumber);
                            }}
                        />
                    </div>
                </div>
                : ''}
            {dialogCreateIsOpen && <DialogCreate onClose={handleDialogCreate} />}
        </>
    )
};

export default Table;
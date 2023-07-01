import React from "react"

export const LoadingTable = () => {
    return (
        <div className="loading-table">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Array(5).fill(null).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array(6).fill(null).map((_, cellIndex) => (
                                <td key={cellIndex}></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="loading-overlay">
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                <span>Đang tải dữ liệu...</span>
            </div>
        </div>
    )
}
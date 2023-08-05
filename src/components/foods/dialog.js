import React from 'react';

export const Create = ({ onClose }) => {
    return (
        <>
        </>
    );
};

export const View = ({ data, onClose }) => {
    return (
        <>
            <div>
                <table className='dialog-field'>
                    <tbody>
                        <tr>
                            <td>
                                <label>Tên thực phẩm</label>
                            </td>
                            <td>
                                <span>{data.name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Số lượng</label>
                            </td>
                            <td>
                                <span>{data.ammount} {data.unitOfMesuament}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Năng lượng (Cal)</label>
                            </td>
                            <td>
                                <span>{data.calories}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="dialog-button-tray">
                <button type="button" className="any-button button-cancel" onClick={onClose}>
                    Hủy bỏ
                </button>
            </div>
        </>
    );
};

export const Edit = ({ data, onClose }) => {
};

export const Delete = ({ data, onClose }) => {
};
import React, { useState } from "react";
import { format } from 'date-fns';
import axios from "axios";

export const Create = ({ onClose }) => {
    return (
        <>
        </>
    )
};

export const View = ({ data, onClose }) => {
    const [initialData] = useState(data);

    return (
        <>
            <div className='dialog-fields'>
                <table className='dialog-field'>
                    <tbody>
                        <tr>
                            <td>
                                <label>Số điện thoại</label>
                            </td>
                            <td>
                                <span>{initialData.phoneNo}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Họ và tên</label>
                            </td>
                            <td>
                                <span>{initialData.fullname}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Giới tính</label>
                            </td>
                            <td>
                                <span>{initialData.gender === 'M' ? 'Nam' : initialData.gender === 'F' ? 'Nữ' : initialData.gender}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Ngày tham gia</label>
                            </td>
                            <td>
                                <span>
                                    {format(new Date(initialData.createDate), 'dd/MM/yyyy')}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='dialog-button-tray'>
                <button type='button' className='any-button' onClick={onClose}>Trở lại</button>
            </div>
        </>
    )
}

export const Edit = ({ data, onClose }) => {

    return (
        <>
        </>
    )
};

export const Delete = ({ data, onClose, ...props }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const api = axios.create({
        baseURL: 'https://egts.azurewebsites.net/api',
    });

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            const response = await api.delete(`/Accounts/DeleteAccount/${data.id}`);
            if (response.status === 200 || response.status === 204) {
                props.fetchData();
            } else {
                setErrorMessage('Xóa không thành công');
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
            setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {errorMessage ? (
                <>
                    <span className="status-error">{errorMessage}</span>
                    <div className="dialog-button-tray">
                        <button type="button" className="any-button button-cancel" onClick={onClose}>
                            Trở về
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p>Bạn có chắc chắn muốn xóa?</p>
                    <div className="dialog-button-tray">
                        <button type="button" className="any-button button-submit" onClick={handleDelete} disabled={isLoading}>
                            Xác nhận
                        </button>
                        <button type="button" className="any-button button-cancel" onClick={onClose}>
                            Hủy bỏ
                        </button>
                    </div>
                </>
            )}

        </>
    );
};
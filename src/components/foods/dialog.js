import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import Success from '../../utils/successAnimation';

export const Create = ({ onClose }) => {
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

export const Delete = ({ data, isLoading, onLoading, onClose, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            onLoading(true);
            const response = await axiosInstance.delete(`/FoodAndSuppliments/DeleteFoodAndSuppliment/${data.id}`);
            if (response) {
                setIsSuccess(true);
            }
            onLoading(false);
        } catch (error) {
            // Xử lý lỗi nếu có
            if (error.response) {
                setErrorMessage(<>
                    <p>Đã có lỗi từ máy chủ.</p>
                    <p>Xóa không thành công.</p>
                </>);
            } else {
                setErrorMessage(<>
                    <p>Đã xảy ra lỗi.</p>
                    <p>Vui lòng thử lại sau.</p>
                </>);
            }
            onLoading(false);
        }
    };

    const handleOnClose = () => {
        onClose();
        props.fetchData();
    }

    return (
        <>
            {isSuccess ? (
                <Success onClose={handleOnClose}>
                    <span>Đã xóa thành công</span>
                </Success>
            ) : (
                <div className="content-delete">
                    {errorMessage ? (
                        <>
                            <center>
                                <span className="status-error">{errorMessage}</span>
                            </center>
                            <div className="dialog-button-tray">
                                <button type="button" className="any-button button-cancel" onClick={onClose}>
                                    Trở về
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <center>
                                <p>Tên thực phẩm : <span className='status-error'>{data.name}</span></p>
                                <p>Bạn có chắc chắn muốn xóa?</p>
                            </center>
                            <div className="dialog-button-tray">
                                <button type="button" className="any-button" onClick={handleDelete} disabled={isLoading}>
                                    Xác nhận
                                </button>
                                <button type="button" className="any-button button-cancel button-remarquable" onClick={onClose}>
                                    Hủy bỏ
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};
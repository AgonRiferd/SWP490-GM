import React, { useState } from 'react';
import axios from '../../utils/axiosConfig';

export const Create = ({ onClose, isLoading, onLoading, ...props}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        numberOfsession: '',
        price: '',
        hasPt: false,
        hasNe: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!formData.numberOfsession || !formData.price) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        try {
            onLoading(true);
            const response = await axios.post('/Packages/CreatePackage', formData);
            if (response.status === 200) {
                alert('Tạo mới thành công');
                props.fetchData();
            } else {
                setErrorMessage(<>
                    <p>Tạo không thành công</p>
                    <p>Status: {response.status}</p>
                </>
                );
                onLoading(false);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            if (error.response) {
                setErrorMessage(
                    <>
                        <p>Tạo không thành công</p>
                        <p>Mã lỗi: {error.response.status}</p>
                    </>
                );
            } else {
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                        <p>Mã lỗi: {error.code}</p>
                    </>
                );
            }
            onLoading(false);
        }
    };

    return (
        <>
            {errorMessage && <span className="status-error">{errorMessage}</span>}
            <form onSubmit={handleCreate}>
                <div className='dialog-fields'>
                    <table className='dialog-field'>
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="name">Tên</label>
                                    <label className='status-lock'>*</label>
                                </td>
                                <td>
                                    <input
                                        type='text'
                                        id="name"
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="numberOfsession">Tổng số buổi</label>
                                    <label className='status-lock'>*</label>
                                </td>
                                <td>
                                    <input
                                        type='number'
                                        id="numberOfsession"
                                        name='numberOfsession'
                                        value={formData.numberOfsession}
                                        onChange={handleChange}
                                        min={1}
                                        required
                                        placeholder='16'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="price">Giá tiền</label>
                                    <label className='status-lock'>*</label>
                                </td>
                                <td>
                                    <input
                                        type='number'
                                        id="price"
                                        name='price'
                                        value={formData.price}
                                        onChange={handleChange}
                                        min={0}
                                        required
                                        placeholder='0'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Tùy chọn</label>
                                </td>
                                <td className="radio-field">
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="hasPt"
                                            checked={formData.hasPt}
                                            onChange={handleChange}
                                        />
                                        Có PT
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="hasNe"
                                            checked={formData.hasNe}
                                            onChange={handleChange}
                                        />
                                        Có NE
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='dialog-button-tray'>
                    <button type='submit' className='any-button button-submit' disabled={isLoading}>Xác nhận</button>
                    <button type='button' className='any-button button-cancel' onClick={onClose}>Hủy bỏ</button>
                </div>
            </form>
        </>
    );
};

export const View = ({ data, onClose }) => {
    return (
        <>
        </>
    );
};

export const Edit = ({ data, onClose }) => {
    return (
        <>
        </>
    );
};

export const Delete = ({ data, isLoading, onLoading, onClose, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        
        try {
            onLoading(true);
            const response = await axios.delete(`/Packages/DeletePackage/${data.id}`);
            if (response.status === 200 || response.status === 204) {
                alert('Package đã được xóa.');
                props.fetchData();
            } else {
                setErrorMessage(<>
                        <p>Xóa không thành công</p>
                        <p>Status: {response.status}</p>
                    </>
                );
                onLoading(false);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            if (error.response) {
                setErrorMessage(<>
                    <p>Xóa không thành công</p>
                    <p>Mã lỗi: {error.response.status}</p>
                </>);
            } else {
                setErrorMessage(<>
                    <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                    <p>Mã lỗi: {error.code}</p>
                </>);
            }
            onLoading(false);
        }
    };

    return (
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
                        <p>Bạn có chắc chắn muốn xóa?</p>
                    </center>
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
        </div>
    );
};
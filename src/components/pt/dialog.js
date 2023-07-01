import React, { useState } from "react";
import { format } from 'date-fns'
import axios from "axios";

// const MAX_FILE_SIZE = 10 * 1024 * 1024;
// const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const GENDER_MALE = 'M';
const GENDER_FEMALE = 'F';
const api = axios.create({
    baseURL: 'https://egts.azurewebsites.net/api',
});

export const Create = ({ onClose, isLoading, onLoading, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        phoneNo: '',
        password: '',
        fullname: '',
        gender: GENDER_MALE,
        role: 'PT'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!formData.phoneNo || !formData.password || !formData.fullname) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        try {
            onLoading(true);
            const response = await api.post('/Accounts/CreateAccount', formData);
            if (response.status === 200 || response.status === 201) {
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
                                    <label htmlFor="phone">Số điện thoại</label>
                                    <label className='status-lock'>*</label>
                                </td>
                                <td>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        name="phoneNo" 
                                        pattern="[0-9]{9,10}"
                                        value={formData.phoneNo}
                                        onChange={handleChange}
                                        required
                                        placeholder="xxxx xxx xxx"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="password">Mật khẩu</label>
                                    <label className='status-lock'>*</label>
                                </td>
                                <td>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="name">Họ và tên</label>
                                    <label className='status-lock'>*</label>
                                </td>
                                <td>
                                    <input 
                                        type='text' 
                                        id="name" 
                                        name='fullname'
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Giới tính</label>
                                </td>
                                <td className="radio-gender">
                                    <label className="radio-gender">
                                        <input 
                                            type="radio" 
                                            id="male" 
                                            name="gender" 
                                            value={GENDER_MALE}
                                            checked={formData.gender === GENDER_MALE}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="male">Nam</label>
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            id="female" 
                                            name="gender" 
                                            value={GENDER_FEMALE}
                                            checked={formData.gender === GENDER_FEMALE}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="female">Nữ</label>
                                    </label>
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
    const [initialData] = useState(data);

    return (
        <>
            <div className='dialog-fields'>
                <table className='dialog-field'>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="phone">Số điện thoại</label>
                            </td>
                            <td>
                                <span>{initialData.phoneNo}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="name">Họ và tên</label>
                            </td>
                            <td>
                                <span>{initialData.fullname}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Giới tính</label>
                            </td>
                            <td className="radio-gender">
                                <span>{initialData.gender === GENDER_MALE ? 'Nam' : 'Nữ'}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="name">Ngày tham gia</label>
                            </td>
                            <td>
                                <span>{format(new Date(initialData.createDate), 'dd/MM/yyyy')}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='dialog-button-tray'>
                <button type='button' className='any-button' onClick={onClose}>Đóng</button>
            </div>
        </>
    )
}

export const Edit = ({ data, onClose }) => {
    
};

export const Delete = ({ data, onClose }) => {
    
};
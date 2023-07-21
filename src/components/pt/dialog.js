import React, { useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
// import { ImageToByteConverter } from "../../utils/imageConvert";
import { formatPhoneNumber } from "../../utils/convert";

const GENDER_MALE = 'M';
const GENDER_FEMALE = 'F';

export const Create = ({ onClose, isLoading, onLoading, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');
    // const [imageByteData, setImageByteData] = useState(null);
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

    const handleKeyDown = (e) => {
        const { key } = e;

        if (!/[0-9]/.test(key) && key !== "Backspace") {
            e.preventDefault();
        }
    };

    const handlePhoneChange = (e) => {
        const { name, value } = e.target;
        const phoneNumber = value.replace(/\D/g, "");
        // Định dạng số tiền và cập nhật state
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: phoneNumber,
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

            // Thêm trường 'avatar' vào data chứa dữ liệu hình ảnh
            // setFormData((prevData) => ({
            //     ...prevData,
            //     avatar: imageByteData,
            // }));

            const response = await axiosInstance.post('/Accounts/CreateAccount', formData);
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
                                        pattern="\d{4}-\d{3}-\d{3}|\d{4}-\d{3}-\d{4}"
                                        value={formatPhoneNumber(formData.phoneNo)}
                                        onChange={handlePhoneChange}
                                        onKeyDown={handleKeyDown}
                                        required
                                        placeholder="xxxx-xxx-xxxx"
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
                            {/* <tr>
                                <td>
                                    <label htmlFor="certificate">Chứng chỉ</label>
                                    <label className='status-lock'>*</label>
                                </td>
                                <td className="normal-file-input">
                                    <ImageToByteConverter setImageByteData={setImageByteData} />
                                </td>
                            </tr> */}
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
}

export const Edit = ({ data, isLoading, onLoading, onClose, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData] = useState({
        phoneNo: '',
        password: '',
        fullname: '',
        gender: '',
        role: '',
        isLock: !data.isLock
    });

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            onLoading(true);
            const response = await axiosInstance.put(`/Accounts/UpdateAccount/${data.id}`, formData);
            if (response.status === 200 || response.status === 204) {
                alert('Trạng thái đã được cập nhật.');
                props.fetchData();
            } else {
                setErrorMessage(
                    <>
                        <p>Cập nhật không thành công</p>
                        <p>Status: {response.status}</p>
                    </>
                );
                onLoading(false);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            if (error.response) {
                setErrorMessage(<>
                    <p>Cập nhật không thành công</p>
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
        <div className="content-status">
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
                        {data.isLock ?
                            <p>Cho phép user Hoạt động trở lại?</p> : <p>Bạn có chắc muốn khóa user?</p>
                        }
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

export const Delete = ({ data, onClose }) => {

};
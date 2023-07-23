import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { formatPhoneNumber } from "../../utils/convert";
import { ImageInput } from "../../utils/imageConvert";
// import { storageRef } from '../../utils/firebaseConfig';

const GENDER_MALE = 'M';
const GENDER_FEMALE = 'F';

export const Create = ({ onClose, isLoading, onLoading, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [id, setId] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [formData, setFormData] = useState({
        phoneNo: '',
        password: '',
        fullname: '',
        gender: GENDER_MALE,
        role: 'PT'
    });

    const [certData , setCertData] = useState({
        experience: 0
    });

    useEffect(() => {
        // Thêm trường 'certification' và 'expertId' vào data chứa dữ liệu hình ảnh
        setCertData((prevData) => ({
            ...prevData,
            expertId: id,
            certificate: imageUrl
        }));
    }, [id, imageUrl])

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

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: phoneNumber,
        }));
    };

    const handleExpChange = (e) => {
        const { name, value } = e.target;

        setCertData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!formData.phoneNo || !formData.password || !formData.fullname) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        try {
            onLoading(true);
            const response = await axiosInstance.post('/Accounts/CreateAccount', formData);
            if (response.status === 200 || response.status === 201) {
                setId(response.data);
                onLoading(false);
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
                        <p>{error.response.data.message}</p>
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

    const handleCreateCertificate = async (e) => {
        e.preventDefault();

        if (!imageUrl) {
            alert('Ảnh chứng chỉ hiện chưa có!');
            return;
        }

        try {
            onLoading(true);
            const response = await axiosInstance.post('/Qualifications/CreateQualification', certData);
            if (response.status === 200 || response.status === 201 || response.status === 204) {
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
            console.log('Certification: ' + certData.experience);
            if (error.response) {
                console.log(error);
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
    }

    const handleCertOnClose = () => {
        props.fetchData();
    }

    return (
        <>
            {id ?
                <>
                    <ol className="dialog-steps breadcrumb">
                        <li>Tạo Tài Khoản</li>
                        <li className="active">Thêm Chứng Chỉ</li>
                    </ol>
                    <div className="sep-container">
                        <div className="sep-text"></div>
                    </div>
                    {errorMessage && <span className="status-error">{errorMessage}</span>}
                    <form onSubmit={handleCreateCertificate}>
                        <div className='dialog-fields'>
                            <table className='dialog-field'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label>Chứng Chỉ</label>
                                            <label className='status-lock'>*</label>
                                        </td>
                                        <td className="normal-file-input">
                                            <ImageInput userId={id} setImageUrl={setImageUrl} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="experience">Số năm kinh nghiệm</label>
                                            <label className='status-lock'>*</label>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="experience"
                                                name="experience"
                                                pattern="\d+"
                                                value={certData.experience}
                                                onChange={handleExpChange}
                                                onKeyDown={handleKeyDown}
                                                required
                                                placeholder="0"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='dialog-button-tray'>
                            <button type='submit' className='any-button button-submit' disabled={isLoading || !imageUrl}>Xác nhận</button>
                            <button type='button' className='any-button button-cancel' onClick={handleCertOnClose}>Bỏ qua</button>
                        </div>
                    </form>
                </> : <>
                    <ol className="dialog-steps breadcrumb">
                        <li className="active">Tạo Tài Khoản</li>
                        <li>Thêm Chứng Chỉ</li>
                    </ol>
                    <div className="sep-container">
                        <div className="sep-text"></div>
                    </div>
                    {errorMessage && <span className="status-error">{errorMessage}</span>}
                    <form onSubmit={handleCreateAccount}>
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
                                </tbody>
                            </table>
                        </div>
                        <div className='dialog-button-tray'>
                            <button type='submit' className='any-button button-submit' disabled={isLoading}>Xác nhận</button>
                            <button type='button' className='any-button button-cancel' onClick={onClose}>Hủy bỏ</button>
                        </div>
                    </form>
                </>
            }
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
        image: '',
        gender: '',
        role: '',
        isDelete: !data.isDelete
    });

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            onLoading(true);
            const response = await axiosInstance.put(`/Accounts/UpdateAccount?id=${data.id}`, formData);
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
                        {data.isDelete ?
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

export const Delete = ({ data, onClose }) => { };
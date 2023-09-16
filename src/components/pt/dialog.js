import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { formatPhoneNumber } from "../../utils/convert";
import { ImageInput } from "../../utils/imageConvert";
import { format } from "date-fns";
import Success from "../../utils/successAnimation";
// import { storageRef } from '../../utils/firebaseConfig';

const GENDER_MALE = 'M';
const GENDER_FEMALE = 'F';

const formatTime = (date) => {
    return format(new Date(date), "HH:mm");
}

export const Create = ({ onClose, isLoading, onLoading, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [id, setId] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [formData, setFormData] = useState({
        phoneNo: '',
        password: '',
        fullname: '',
        gender: GENDER_MALE,
        role: 'PT'
    });
    const [retypePw, setRetypePw] = useState('');

    const [certData, setCertData] = useState({
        experience: 1
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

    const handleRePasswordChange = (e) => {
        const { value } = e.target;
        setRetypePw(value);
    }

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

    const checkValid = () => {
        if (!formData.phoneNo || !formData.password || !formData.fullname) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin!');
            return false;
        }
        if (formData.password !== retypePw) {
            setErrorMessage('Mật khẩu và mật khẩu nhập lại không khớp.');
            return false;
        }
        return true;
    }

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!checkValid()) {
            return;
        }

        try {
            onLoading(true);
            const response = await axiosInstance.post('/Accounts/CreateAccount', formData);
            if (response) {
                setId(response.data);
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
        } finally {
            onLoading(false);
        }
    };

    const handleCreateCertificate = async (e) => {
        e.preventDefault();

        if (!imageUrl) {
            setErrorMessage('Ảnh chứng chỉ hiện chưa có!');
            return;
        }

        try {
            onLoading(true);
            const response = await axiosInstance.post('/Qualifications/CreateQualification', certData);
            if (response) {
                setIsSuccess(true);
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
        } finally {
            onLoading(false);
        }
    }

    const handleOnClose = () => {
        onClose();
        props.fetchData();
    }

    return (
        <>
            {isSuccess ? (
                <Success onClose={handleOnClose}>
                    <span>Tạo người dùng thành công</span>
                </Success>
            ) : id ?
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
                            <button type='button' className='any-button button-cancel' onClick={handleOnClose}>Bỏ qua</button>
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
                                                title="Số điện thoại có dạng xxxx-xxx-xxx hoặc xxxx-xxx-xxxx"
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
                                            <label htmlFor="retypePw">Nhập lại mật khẩu</label>
                                            <label className='status-lock'>*</label>
                                        </td>
                                        <td>
                                            <input
                                                type="password"
                                                id="retypePw"
                                                name="retypePw"
                                                value={retypePw}
                                                onChange={handleRePasswordChange}
                                                required
                                            />
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
    const [isSuccess, setIsSuccess] = useState(false);
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
            if (response) {
                onLoading(false);
                setIsSuccess(true);
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

    const handleOnClose = () => {
        onClose();
        props.fetchData();
    }

    return (
        <>
            {isSuccess ? (
                <Success onClose={handleOnClose}>
                    <span>Cập nhật thành công</span>
                </Success>
            ) : (
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
            )}
        </>
    );
};

export const Delete = ({ data, onLoading, isLoading, onClose, ...props }) => {
};

export const ScheduleDetail = ({ data, onClose, isLoading, onLoading, ...props }) => {
    const [initialData,] = useState(data);
    const exerciseData = initialData.sort((a, b) => {
        const dateA = new Date(a.from);
        const dateB = new Date(b.from);
        return dateA - dateB;
    });

    return (
        <>
            <div className="schedule-content">
                {exerciseData.length > 0 &&
                    <div className="exercise-container">
                        <div className="title">
                            Bài tập
                        </div>
                        <div className="exercise-content">
                            {exerciseData.map((item, index) => (
                                <ExerciseSchedule data={item} key={index} />
                            ))}
                        </div>
                    </div>
                }
            </div>
            <div className="dialog-button-tray">
                <button type="button" className="any-button button-cancel" onClick={onClose}>
                    Đóng
                </button>
            </div>
        </>
    );
}

const ExerciseSchedule = ({ data }) => {
    const [initialData,] = useState(data);

    return (
        <details className="item">
            <summary className="title" >
                <span>
                    {formatTime(initialData.from)} - {formatTime(initialData.to)}
                </span>
                <span className="fa fa-angle-down pull-right"></span>
            </summary>
            <div className="details">
                <table className='dialog-field'>
                    <tbody>
                        <tr>
                            <td>
                                <label>Thành viên</label>
                            </td>
                            <td>
                                <span>{initialData.gymerName}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Danh sách bài tập:</label>
                            </td>
                            <td>
                                {!initialData.excercises || initialData.excercises.length === 0 ? (
                                    <span className="status-error">Không có bài tập</span>
                                ) : initialData.excercises.map((item) => (
                                    <li key={item.id}>
                                        {item.name}
                                    </li>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </details>
    )
}
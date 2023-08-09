import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { formatPhoneNumber } from "../../utils/convert";
import { ImageInput } from "../../utils/imageConvert";

// const MAX_FILE_SIZE = 10 * 1024 * 1024;
// const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const GENDER_MALE = 'M';
const GENDER_FEMALE = 'F';

export const Create = ({ onClose, isLoading, onLoading, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [id, setId] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        phoneNo: '',
        password: '',
        fullname: '',
        gender: GENDER_MALE,
        role: 'NE'
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

    const handleRePasswordChange = (e) => {
        const { value } = e.target;
        setRetypePw(value);
    }

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
            onLoading(false);
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

    const handleOnClose = () => {
        onClose();
        props.fetchData();
    }

    return (
        <>
            {isSuccess ? (
                <Success onClose={handleOnClose}>
                    <span>Tạo tài khoản thành công</span>
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

export const View = ({ data, onClose }) => { }

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
                setIsSuccess(true);
            }
            onLoading(false);
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
                    <span>Đã cập nhật</span>
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

export const Delete = ({ data, onClose }) => {
    // const [isDeleted, setIsDeleted] = useState(false);

    // const handleDelete = () => {
    //     // Xử lý logic xóa dữ liệu
    //     // ...
    //     setIsDeleted(true);
    // };

    // return (
    //     <>
    //         {isDeleted ? (
    //             <p>Task failed successfully!</p>
    //         ) : (
    //             <p>Bạn có chắc chắn muốn xóa?</p>
    //         )}

    //         <div className="dialog-button-tray">
    //             {isDeleted ? (
    //                 <button type="button" className="any-button" onClick={onClose}>
    //                     Đóng
    //                 </button>
    //             ) : (
    //                 <>
    //                     <button type="button" className="any-button button-submit" onClick={handleDelete}>
    //                         Xác nhận
    //                     </button>
    //                     <button type="button" className="any-button button-cancel" onClick={onClose}>
    //                         Hủy bỏ
    //                     </button>
    //                 </>
    //             )}
    //         </div>
    //     </>
    // );
};

const SUCCESS_COUNTDOWN = 5;

const Success = ({ onClose, children }) => {
    const [autoCloseCountdown, setAutoCloseCountdown] = useState(SUCCESS_COUNTDOWN + 1);
    const [autoCloseTimeout, setAutoCloseTimeout] = useState(null);

    useEffect(() => {
        if (autoCloseCountdown > 0) {
            const timeoutId = setTimeout(() => {
                setAutoCloseCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            setAutoCloseTimeout(timeoutId);
        } else if (autoCloseCountdown === 0) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoCloseCountdown]);

    const handleOnClose = () => {
        if (autoCloseTimeout) {
            clearTimeout(autoCloseTimeout);
        }
        onClose();
    }

    return (
        <>
            <div className="success-checkmark">
                <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                </div>
            </div>
            {children}
            <div>
                {`Cửa sổ sẽ tự động đóng sau ${autoCloseCountdown === SUCCESS_COUNTDOWN + 1 ? autoCloseCountdown - 1 : autoCloseCountdown} giây`}
            </div>
            <div className='dialog-button-tray'>
                <button type='button' className='any-button button-cancel' onClick={handleOnClose}>Đóng</button>
            </div>
        </>
    )
}
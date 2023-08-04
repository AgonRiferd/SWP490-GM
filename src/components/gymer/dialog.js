import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
import axiosInstance from "../../utils/axiosConfig";

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
                                    <p>Cho phép Hoạt động trở lại?</p> : <p>Bạn có chắc muốn khóa người dùng này?</p>
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

export const Delete = ({ data, onClose, isLoading, onLoading, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            onLoading(true);
            const response = await axiosInstance.delete(`/Accounts/DeleteAccount/${data.id}`);
            if (response) {
                onLoading(false);
                setIsSuccess(true);
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

    const handleOnClose = () => {
        onClose();
        props.fetchData();
    }

    return (
        <>
            {isSuccess ? (
                <Success onClose={handleOnClose}>
                    <span>Xóa bỏ thành công</span>
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
            )}
        </>
    );
};

export const ScheduleDetail = ({ data, onClose, isLoading, onLoading, ...props }) => {
    const [initialData,] = useState(data);
    const nutritionData = initialData.filter((item) => item.nutritionScheduleId).sort((a, b) => a.mealTime - b.mealTime);
    const exerciseData = initialData.filter((item) => item.scheduleId).sort((a, b) => a.dateAndTime - b.dateAndTime);
    const formatMealTime = (mealTime) => {
        switch (mealTime) {
            case 1:
                return "Sáng";
            case 2:
                return "Trưa";
            case 3:
                return "Tối";
            case 4:
                return "Trước tập";
            default:
                return "";
        }
    };

    const formatTime = (date) => {
        return format(new Date(date), "HH:mm:ss");
    }

    const [nutritionItemExpands, setNutritionItemExpands] = useState([]);
    const [exerciseItemExpands, setExerciseItemExpands] = useState([]);

    const handleNutritionItemClick = (index) => {
        if (nutritionItemExpands.includes(index)) {
            setNutritionItemExpands(nutritionItemExpands.filter((i) => i !== index));
        } else {
            setNutritionItemExpands([...nutritionItemExpands, index]);
        }
    };

    const handleExerciseItemClick = (index) => {
        if (exerciseItemExpands.includes(index)) {
            setExerciseItemExpands(exerciseItemExpands.filter((i) => i !== index));
        } else {
            setExerciseItemExpands([...exerciseItemExpands, index]);
        }
    };

    return (
        <div className="schedule-content">
            {exerciseData.length > 0 &&
                <div className="exercise-container">
                    <div className="title">
                        Bài tập
                    </div>
                    <div className="exercise-content">
                        {exerciseData.map((item, index) => (
                            <div key={index} className={`item ${exerciseItemExpands.includes(index) ? 'show' : ''}`}>
                                <div className="title" onClick={() => handleExerciseItemClick(index)} >
                                    <span>
                                        {formatTime(item.dateAndTime)}
                                    </span>
                                    <span className="fa fa-angle-down pull-right"></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {nutritionData.length > 0 &&
                <div className="nutrition-container">
                    <div className="title">
                        Thực đơn
                    </div>
                    <div className="nutrition-content">
                        {nutritionData.map((item, index) => (
                            <div key={index} className={`item ${nutritionItemExpands.includes(index) ? 'show' : ''}`}>
                                <div className="title" onClick={() => handleNutritionItemClick(index)} >
                                    <span>
                                        {formatMealTime(item.mealTime)}
                                    </span>
                                    <span className="fa fa-angle-down pull-right"></span>
                                </div>
                                <div className="details">
                                    <table className="schedule-table">
                                        <thead>
                                            <tr>
                                                <th>Tên</th>
                                                <th>Số lượng</th>
                                                <th>Đơn vị</th>
                                                <th>Năng lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.foodAndSuppliment.map((fas) => (
                                                <tr key={fas.id}>
                                                    <td>
                                                        <span>{fas.name}</span>
                                                    </td>
                                                    <td>
                                                        <span>{fas.ammount}</span>
                                                    </td>
                                                    <td>
                                                        <span>{fas.unitOfMesuament}</span>
                                                    </td>
                                                    <td>
                                                        <span>{fas.calories}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            { }
            <div className="dialog-button-tray">
                <button type="button" className="any-button button-cancel" onClick={onClose}>
                    Đóng
                </button>
            </div>
        </div>
    );
}

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
import React, { useEffect, useMemo, useState } from 'react';
import axios from '../../utils/axiosConfig';
import { formatMoney } from '../../utils/convert';

const SUCCESS_COUNTDOWN = 5;

export const Create = ({ onClose, isLoading, onLoading, ...props }) => {
    const type = props.packageType;
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        numberOfsession: (type === 2) || (type === 4) ? 1 : null,
        numberOfMonth: (type === 1 || type === 3) ? 1 : null,
        centerCost: type === 1 ? 0 : null,
        hasPt: (type === 2) || (type === 4),
        ptCost: (type === 2) || (type === 4) ? 0 : null,
        hasNe: (type === 3) || (type === 4),
        neCost: (type === 3) || (type === 4) ? 0 : null,
        price: 0,
        discount: null,
    });
    const [hasDiscount, setHasDiscount] = useState(false);

    // Cập nhật giá trị của price khi các thành phần thay đổi
    useEffect(() => {   
        let total = 0;
        if (type === 1) {
            total = formData.centerCost * formData.numberOfMonth;
        } else if (type === 2) {
            total = formData.ptCost * formData.numberOfsession;
        } else if (type === 3) {
            total = formData.neCost * formData.numberOfMonth;
        } else if (type === 4) {
            total = formData.ptCost * formData.numberOfsession + formData.neCost;
        } else {
            total = 0;
        }

        if (formData.discount)
            total -= total * formData.discount / 100;
        setFormData((prevFormData) => ({
            ...prevFormData,
            price: total,
        }));
        // eslint-disable-next-line
    }, [formData.discount, formData.centerCost, formData.numberOfMonth, formData.ptCost, formData.hasPt, formData.neCost, formData.hasNe, formData.numberOfsession]);

    const handleKeyDown = (e) => {
        const { key } = e;

        if (!/[0-9]/.test(key) && key !== "Backspace") {
            e.preventDefault();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleHasDiscountChange = (e) => {
        const { checked } = e.target;
        if (checked) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                discount: 0,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                discount: null,
            }));
        }
        setHasDiscount(checked);
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const numericValue = value.replace(/\D/g, "");
        // Định dạng số tiền và cập nhật state
        const numericPrice = Number(numericValue);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: numericPrice,
        }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (formData.name.trim().length === 0) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin!');
            return;
        }
        try {
            onLoading(true);
            const response = await axios.post('/Packages/CreatePackage', formData);
            if (response) {
                onLoading(false);
                setIsSuccess(true);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            if (error.response) {
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi từ máy chủ</p>
                        <p>Tạo không thành công</p>
                    </>
                );
            } else {
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                    </>
                );
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
                    <span>Tạo mới thành công</span>
                </Success>
            ) : (
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
                                    {(type === 1) &&
                                        <>
                                            <tr>
                                                <td>
                                                    <label>Số tháng</label>
                                                </td>
                                                <td>
                                                    <input
                                                        type='number'
                                                        name="numberOfMonth"
                                                        value={formData.numberOfMonth}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="0"
                                                        min={1}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Phí phòng tập</label>
                                                </td>
                                                <td>
                                                    <input
                                                        type='text'
                                                        id="price"
                                                        name='centerCost'
                                                        value={formatMoney(formData.centerCost)}
                                                        onChange={handlePriceChange}
                                                        onKeyDown={handleKeyDown}
                                                        required
                                                        placeholder='0đ'
                                                    />
                                                </td>
                                            </tr>
                                        </>
                                    }
                                    {formData.hasPt &&
                                        <>
                                            <tr>
                                                <td colSpan={2}>
                                                    <div className="sep-container">
                                                        <div className="sep-text">Huấn luyện viên</div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="numberOfsession">Tổng buổi tập</label>
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
                                                        placeholder='0'
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="ptCost">Chi phí / buổi</label>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="ptCost"
                                                        name="ptCost"
                                                        value={formatMoney(formData.ptCost)}
                                                        onChange={handlePriceChange}
                                                        onKeyDown={handleKeyDown}
                                                        required
                                                        placeholder="0đ"
                                                    />
                                                </td>
                                            </tr>
                                        </>
                                    }
                                    {formData.hasNe &&
                                        <>
                                            <tr>
                                                <td colSpan={2}>
                                                    <div className="sep-container">
                                                        <div className="sep-text">Bác sỹ dinh dưỡng</div>
                                                    </div>
                                                </td>
                                            </tr>
                                            {(type === 3) &&
                                                <tr>
                                                    <td>
                                                        <label>Số tháng</label>
                                                    </td>
                                                    <td>
                                                        <input
                                                            type='text'
                                                            name="numberOfMonth"
                                                            value={formData.numberOfMonth}
                                                            onChange={handleChange}
                                                            onKeyDown={handleKeyDown}
                                                            required
                                                            placeholder="0"
                                                        />
                                                    </td>
                                                </tr>
                                            }
                                            <tr>
                                                <td>
                                                    <label htmlFor="neCost">Chi phí {type === 3 && "/ tháng"}</label>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="neCost"
                                                        name="neCost"
                                                        value={formatMoney(formData.neCost)}
                                                        onChange={handlePriceChange}
                                                        onKeyDown={handleKeyDown}
                                                        required
                                                        placeholder="0đ"
                                                    />
                                                </td>
                                            </tr>
                                        </>
                                    }
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="sep-container">
                                                <div className="sep-text">Tùy Chọn</div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input
                                                type='checkbox'
                                                checked={hasDiscount}
                                                onChange={handleHasDiscountChange}
                                            />
                                            Giảm giá
                                        </td>
                                        {hasDiscount &&
                                            <td>
                                                <input
                                                    type="number"
                                                    id="discount"
                                                    name="discount"
                                                    value={formData.discount}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="0"
                                                    min={0}
                                                    max={100}
                                                />
                                                %
                                            </td>
                                        }
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="sep-container">
                                                <div className="sep-text"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Tổng cộng :
                                        </td>
                                        <td>
                                            {formatMoney(formData.price)} đ
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
            )}
        </>
    );
};

export const View = ({ data, onClose, ...props }) => {
    const type = props.packageType;
    const beforePrice = useMemo(() => {
        let total = 0;
        if (type === 1) {
            total = data.centerCost * data.numberOfMonth;
        } else if (type === 2) {
            total = data.ptcost * data.numberOfsession;
        } else if (type === 3) {
            total = data.necost * data.numberOfMonth;
        } else if (type === 4) {
            total = data.ptcost * data.numberOfsession + data.necost * data.numberOfMonth;
        }

        return total;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    return (
        <>
            <div className='dialog-fields'>
                <table className='dialog-field'>
                    <tbody>
                        <tr>
                            <td>
                                <span>Tên Dịch Vụ</span>
                            </td>
                            <td>
                                <span>{data.name}</span>
                            </td>
                        </tr>
                        {type === 1 &&
                            <>
                                <tr>
                                    <td>
                                        <span>Số tháng</span>
                                    </td>
                                    <td>
                                        <span>{data.numberOfMonth}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>Phí phòng tập</span>
                                    </td>
                                    <td>
                                        <span>{formatMoney(data.centerCost)} đ</span>
                                    </td>
                                </tr>
                            </>
                        }
                        {data.hasPt && (
                            <>
                                <tr>
                                    <td colSpan={2}>
                                        <div className="sep-container">
                                            <div className="sep-text">Huấn luyện viên</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>Tổng buổi tập</span>
                                    </td>
                                    <td>
                                        <span>{data.numberOfsession}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>Chi phí / buổi</span>
                                    </td>
                                    <td>
                                        <span>{formatMoney(data.ptcost)} đ</span>
                                    </td>
                                </tr>
                            </>
                        )}
                        {data.hasNe && (
                            <>
                                <tr>
                                    <td colSpan={2}>
                                        <div className="sep-container">
                                            <div className="sep-text">Bác Sỹ dinh dưỡng</div>
                                        </div>
                                    </td>
                                </tr>
                                {type === 3 &&
                                    <tr>
                                        <td>
                                            <span>Số tháng</span>
                                        </td>
                                        <td>
                                            <span>{data.numberOfMonth}</span>
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <td>
                                        <span>Chi phí {type === 3 && "/ tháng"}</span>
                                    </td>
                                    <td>
                                        <span>{formatMoney(data.necost)} đ</span>
                                    </td>
                                </tr>
                            </>
                        )}
                        <tr>
                            <td colSpan={2}>
                                <div className="sep-container">
                                    <div className="sep-text"></div>
                                </div>
                            </td>
                        </tr>
                        {data.discount && (
                            <>
                                <tr>
                                    <td>
                                        Tống
                                    </td>
                                    <td>
                                        {formatMoney(beforePrice)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Giảm giá
                                    </td>
                                    <td>
                                        {data.discount} %
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <div className="sep-container">
                                            <div className="sep-text"></div>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )}
                        <tr>
                            <td>
                                Tổng cộng
                            </td>
                            <td>
                                {formatMoney(data.price)} đ
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='dialog-button-tray'>
                <button type='button' className='any-button button-cancel' onClick={onClose}>Đóng</button>
            </div>
        </>
    );
};

export const Edit = ({ data, onClose, isLoading, onLoading, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState(data);
    const [isSuccess, setIsSuccess] = useState(false);
    const type = props.packageType;

    useEffect(() => {
        const total = (formData.centerCost * formData.numberOfMonth) + (formData.hasPt ? formData.ptcost * formData.numberOfsession : 0) + (formData.hasNe ? formData.necost : 0);
        setFormData((prevFormData) => ({
            ...prevFormData,
            price: total,
        }));
    }, [formData.centerCost, formData.numberOfMonth, formData.ptcost, formData.hasPt, formData.necost, formData.hasNe, formData.numberOfsession]);

    const handleKeyDown = (e) => {
        const { key } = e;

        if (!/[0-9]/.test(key) && key !== "Backspace") {
            e.preventDefault();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const numericValue = value.replace(/\D/g, "");
        // Định dạng số tiền và cập nhật state
        const numericPrice = Number(numericValue);
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: numericPrice,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (formData.name.trim().length === 0) {
            setErrorMessage('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        try {
            onLoading(true);
            const response = await axios.put('/Packages/UpdatePackage', formData);
            if (response) {
                onLoading(false);
                setIsSuccess(true);
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            if (error.response) {
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi từ máy chủ</p>
                        <p>Cập nhật không thành công</p>
                    </>
                );
            } else {
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                    </>
                );
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
                <>
                    {errorMessage && <span className="status-error">{errorMessage}</span>}
                    <form onSubmit={handleUpdate}>
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
                                    {type === 1 &&
                                        <>
                                            <tr>
                                                <td>
                                                    <label>Số tháng</label>
                                                </td>
                                                <td>
                                                    <input
                                                        type='text'
                                                        name="numberOfMonth"
                                                        value={formData.numberOfMonth}
                                                        onChange={handleChange}
                                                        onKeyDown={handleKeyDown}
                                                        required
                                                        placeholder="0"
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="price">Phí phòng tập</label>
                                                </td>
                                                <td>
                                                    <input
                                                        type='text'
                                                        id="price"
                                                        name='centerCost'
                                                        value={formatMoney(formData.centerCost)}
                                                        onChange={handlePriceChange}
                                                        onKeyDown={handleKeyDown}
                                                        required
                                                        placeholder='0đ'
                                                    />
                                                </td>
                                            </tr>
                                        </>
                                    }
                                    {formData.hasPt &&
                                        <>
                                            <tr>
                                                <td colSpan={2}>
                                                    <div className="sep-container">
                                                        <div className="sep-text">Huấn luyện viên</div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="numberOfsession">Tổng số buổi</label>
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
                                                        placeholder='1'
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="ptCost">Chi phí / buổi</label>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="ptCost"
                                                        name="ptcost"
                                                        value={formatMoney(formData.ptcost)}
                                                        onChange={handlePriceChange}
                                                        onKeyDown={handleKeyDown}
                                                        required
                                                        placeholder="0đ"
                                                    />
                                                </td>
                                            </tr>
                                        </>
                                    }
                                    {formData.hasNe &&
                                        <>
                                            <tr>
                                                <td colSpan={2}>
                                                    <div className="sep-container">
                                                        <div className="sep-text">Bác sỹ dinh dưỡng</div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label htmlFor="neCost">Chi phí </label>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="neCost"
                                                        name="necost"
                                                        value={formatMoney(formData.necost)}
                                                        onChange={handlePriceChange}
                                                        onKeyDown={handleKeyDown}
                                                        required
                                                        placeholder="0đ"
                                                    />
                                                </td>
                                            </tr>
                                        </>
                                    }
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="sep-container">
                                                <div className="sep-text"></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Tổng cộng :
                                        </td>
                                        <td>
                                            {formatMoney(formData.price)} đ
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='dialog-button-tray'>
                            <button type='submit' className='any-button button-submit' disabled={isLoading}>Cập nhật</button>
                            <button type='button' className='any-button button-cancel' onClick={onClose}>Hủy bỏ</button>
                        </div>
                    </form>
                </>
            )};
        </>
    );
};

export const Delete = ({ data, isLoading, onLoading, onClose, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            onLoading(true);
            const response = await axios.delete(`/Packages/DeletePackage/${data.id}`);
            if (response) {
                setIsSuccess(true);
            }
            onLoading(false);
        } catch (error) {
            // Xử lý lỗi nếu có
            if (error.response) {
                setErrorMessage(<>
                    <p>Đã xảy ra lỗi từ máy chủ</p>
                    <p>Xóa không thành công</p>
                </>);
            } else {
                setErrorMessage(<>
                    <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
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
                                <p>Tên Dịch vụ : <span className='status-error'>{data.name}</span></p>
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
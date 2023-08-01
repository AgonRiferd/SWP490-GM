import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig';
import { formatMoney } from '../../utils/convert';

export const Create = ({ onClose, isLoading, onLoading, ...props }) => {
    const [type,] = useState(props.packageType);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        numberOfsession: 1,
        numberOfMonth: 1,
        centerCost: 0,
        hasPt: (type === 2) || (type === 4),
        ptCost: 0,
        hasNe: (type === 3) || (type === 4),
        neCost: 0,
        price: 0,
    });

    // Cập nhật giá trị của price khi các thành phần thay đổi
    useEffect(() => {
        const total = (formData.centerCost * formData.numberOfMonth) + (formData.hasPt ? formData.ptCost * formData.numberOfsession : 0) + (formData.hasNe ? formData.neCost : 0);
        setFormData((prevFormData) => ({
            ...prevFormData,
            price: total,
        }));
    }, [formData.centerCost, formData.numberOfMonth, formData.ptCost, formData.hasPt, formData.neCost, formData.hasNe, formData.numberOfsession]);

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

    const handleCreate = async (e) => {
        e.preventDefault();

        if (formData.name.trim().length === 0) {
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
                            {(type === 1) &&
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
                                    <tr>
                                        <td>
                                            <label htmlFor="neCost">Chi phí </label>
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
    );
};

export const View = ({ data, onClose, ...props }) => {
    const type = props.packageType;
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
                                <tr>
                                    <td>
                                        <span>Chi phí</span>
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
                        <tr>
                            <td>
                                Tổng cộng :
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
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        try {
            onLoading(true);
            const response = await axios.put('/Packages/UpdatePackage', formData);
            if (response.status === 200) {
                alert('Cập nhật thành công');
                props.fetchData();
            } else {
                setErrorMessage(<>
                    <p>Cập nhật không thành công</p>
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
                        <p>Cập nhật không thành công</p>
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
    );
};
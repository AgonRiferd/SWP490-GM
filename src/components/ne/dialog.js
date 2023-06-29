import React, { useRef, useState } from "react";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const Create = ({ onClose }) => {
    const ref = useRef();
    const [isCreated, setIsCreated] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleCreate = () => {
        // Xử lý logic xóa dữ liệu
        // ...
        setIsCreated(true);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        // Xử lý khi không có file được chọn
        if (file && file instanceof File) {
            if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
                // Xử lý khi định dạng file không hợp lệ
                return;
            }
            if (file.size > MAX_FILE_SIZE) {
                // Xử lý khi vượt quá kích thước file cho phép
                return;
            }
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveFile = () => {
        setSelectedImage(null);
        resetInputFile();
    };

    const resetInputFile = () => {
        ref.current.value = "";
    };

    return (
        <>
            {isCreated ? (
                <>
                    <p>Task failed successfully!</p>
                    <div className='dialog-button-tray'>
                        <button type="button" className="any-button" onClick={onClose}>
                            Đóng
                        </button>
                    </div>
                </>
            ) : (
                <form onSubmit={handleCreate}>
                    <div className='dialog-fields'>
                        <table className='dialog-field'>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="phone">Số điện thoại</label>
                                    </td>
                                    <td>
                                        <input type="tel" id="phone" name="phone" pattern="[0-9]{9,10}" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="password">Mật khẩu</label>
                                    </td>
                                    <td>
                                        <input type="password" id="password" name="password" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="name">Họ và tên</label>
                                    </td>
                                    <td>
                                        <input type='text' id="name" name='name' />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Giới tính</label>
                                    </td>
                                    <td className="radio-gender">
                                        <label className="radio-gender">
                                            <input type="radio" id="male" name="gender" value="M" />
                                            Male
                                        </label>
                                        <label>
                                            <input type="radio" id="female" name="gender" value="F" />
                                            Female
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Chứng chỉ</label>
                                    </td>
                                    <td>
                                        {selectedImage &&
                                            <div>
                                                <input type="text" value={selectedImage} readOnly />
                                                <span>&nbsp;&nbsp;</span>
                                                <button type='button' onClick={() => handleRemoveFile()} className='button-refresh' title='Xóa'>
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        }
                                        <input type="file" accept="image/*" onChange={handleImageChange} ref={ref} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="address">Địa chỉ</label>
                                    </td>
                                    <td>
                                        <input type='text' id="address" name='address' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='dialog-button-tray'>
                        <button type='submit' className='any-button button-submit'>Xác nhận</button>
                        <button type='button' className='any-button button-cancel' onClick={onClose}>Hủy bỏ</button>
                    </div>
                </form>
            )}
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
                                <span>{initialData.phone}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="name">Họ và tên</label>
                            </td>
                            <td>
                                <span>{initialData.name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Giới tính</label>
                            </td>
                            <td className="radio-gender">
                                <span>{initialData.gender}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Chứng chỉ</label>
                            </td>
                            <td>
                                <span>
                                    <a href={initialData.certificate} target="_blank" rel="noopener noreferrer">
                                        {initialData.certificate}
                                    </a>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="address">Địa chỉ</label>
                            </td>
                            <td>
                                <span>{initialData.address}</span>
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
    const [formData, setFormData] = useState(data);
    const [initialData] = useState(data);
    const [isEdited, setIsEdited] = useState(false);
    const [selectedImage, setSelectedImage] = useState(initialData.certificate);
    const ref = useRef();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // // Perform the API call to update the record
            // await fetch(`api/${id}`, {
            //   method: 'PUT',
            //   body: JSON.stringify({ name, description, videoId }),
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            // });

            // // Invoke the callback to notify the parent about the successful edit
            // onEditSuccess();
            setIsEdited(true);
        } catch (error) {
            console.log('Error editing record:', error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        // Xử lý khi không có file được chọn
        if (file && file instanceof File) {
            if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
                // Xử lý khi định dạng file không hợp lệ
                return;
            }
            if (file.size > MAX_FILE_SIZE) {
                // Xử lý khi vượt quá kích thước file cho phép
                return;
            }
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleResetField = (field) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: initialData[field],
        }));
    };

    const handleResetFile = () => {
        setSelectedImage(initialData.certificate);
        resetInputFile();
    };

    const resetInputFile = () => {
        ref.current.value = "";
    };

    return (
        <>
            {isEdited ? (
                <>
                    <p>Task failed successfully!</p>
                    <div className='dialog-button-tray'>
                        <button type="button" className="any-button" onClick={onClose}>
                            Đóng
                        </button>
                    </div>
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className='dialog-fields'>
                        <table className='dialog-field'>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="name">Họ và tên</label>
                                    </td>
                                    <td>
                                        <input type='text' name='name' value={formData.name} onChange={handleChange} />
                                    </td>
                                    <td>
                                        <button type='button' onClick={() => handleResetField("name")} className='button-refresh' title='Trở lại ban đầu'>
                                            <i className="fa-solid fa-rotate-left"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Giới tính</label>
                                    </td>
                                    <td className="radio-gender">
                                        <label className="radio-gender">
                                            <input type="radio" id="male" name="gender" value="M" checked={formData.gender === 'M'} onChange={handleChange} />
                                            Male
                                        </label>
                                        <label>
                                            <input type="radio" id="female" name="gender" value="F" checked={formData.gender === 'F'} onChange={handleChange} />
                                            Female
                                        </label>
                                    </td>
                                    <td>
                                        <button type='button' onClick={() => handleResetField("gender")} className='button-refresh' title='Trở lại ban đầu'>
                                            <i className="fa-solid fa-rotate-left"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Chứng chỉ</label>
                                    </td>
                                    <td>
                                        {selectedImage && (
                                            <div>
                                                <input type="text" value={selectedImage} readOnly />
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" onChange={handleImageChange} ref={ref} />
                                    </td>
                                    <td>
                                        <button type='button' onClick={() => handleResetFile()} className='button-refresh' title='Trở lại ban đầu'>
                                            <i className="fa-solid fa-rotate-left"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="address">Địa chỉ</label>
                                    </td>
                                    <td>
                                        <input type='text' id="address" name='address' value={formData.address} onChange={handleChange} />
                                    </td>
                                    <td>
                                        <button type='button' onClick={() => handleResetField("address")} className='button-refresh' title='Trở lại ban đầu'>
                                            <i className="fa-solid fa-rotate-left"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='dialog-button-tray'>
                        <button type='submit' className='any-button button-submit'>Xác nhận</button>
                        <button type='button' className='any-button button-cancel' onClick={onClose}>Hủy bỏ</button>
                    </div>
                </form>
            )}
        </>
    );
};

export const Delete = ({ data, onClose }) => {
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = () => {
        // Xử lý logic xóa dữ liệu
        // ...
        setIsDeleted(true);
    };

    return (
        <>
            {isDeleted ? (
                <p>Task failed successfully!</p>
            ) : (
                <p>Bạn có chắc chắn muốn xóa?</p>
            )}

            <div className="dialog-button-tray">
                {isDeleted ? (
                    <button type="button" className="any-button" onClick={onClose}>
                        Đóng
                    </button>
                ) : (
                    <>
                        <button type="button" className="any-button button-submit" onClick={handleDelete}>
                            Xác nhận
                        </button>
                        <button type="button" className="any-button button-cancel" onClick={onClose}>
                            Hủy bỏ
                        </button>
                    </>
                )}
            </div>
        </>
    );
};
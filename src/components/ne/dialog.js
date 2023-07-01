import axios from "axios";
import { format } from "date-fns";
import React, { useState } from "react";

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
        role: 'NE'
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
    // const [formData, setFormData] = useState(data);
    // const [initialData] = useState(data);
    // const [isEdited, setIsEdited] = useState(false);
    // const [selectedImage, setSelectedImage] = useState(initialData.certificate);
    // const ref = useRef();

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: value,
    //     }));
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // // Perform the API call to update the record
    //         // await fetch(`api/${id}`, {
    //         //   method: 'PUT',
    //         //   body: JSON.stringify({ name, description, videoId }),
    //         //   headers: {
    //         //     'Content-Type': 'application/json',
    //         //   },
    //         // });

    //         // // Invoke the callback to notify the parent about the successful edit
    //         // onEditSuccess();
    //         setIsEdited(true);
    //     } catch (error) {
    //         console.log('Error editing record:', error);
    //     }
    // };

    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     // Xử lý khi không có file được chọn
    //     if (file && file instanceof File) {
    //         if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    //             // Xử lý khi định dạng file không hợp lệ
    //             return;
    //         }
    //         if (file.size > MAX_FILE_SIZE) {
    //             // Xử lý khi vượt quá kích thước file cho phép
    //             return;
    //         }
    //         setSelectedImage(URL.createObjectURL(file));
    //     }
    // };

    // const handleResetField = (field) => {
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [field]: initialData[field],
    //     }));
    // };

    // const handleResetFile = () => {
    //     setSelectedImage(initialData.certificate);
    //     resetInputFile();
    // };

    // const resetInputFile = () => {
    //     ref.current.value = "";
    // };

    // return (
    //     <>
    //         {isEdited ? (
    //             <>
    //                 <p>Task failed successfully!</p>
    //                 <div className='dialog-button-tray'>
    //                     <button type="button" className="any-button" onClick={onClose}>
    //                         Đóng
    //                     </button>
    //                 </div>
    //             </>
    //         ) : (
    //             <form onSubmit={handleSubmit}>
    //                 <div className='dialog-fields'>
    //                     <table className='dialog-field'>
    //                         <tbody>
    //                             <tr>
    //                                 <td>
    //                                     <label htmlFor="name">Họ và tên</label>
    //                                 </td>
    //                                 <td>
    //                                     <input type='text' name='name' value={formData.name} onChange={handleChange} />
    //                                 </td>
    //                                 <td>
    //                                     <button type='button' onClick={() => handleResetField("name")} className='button-refresh' title='Trở lại ban đầu'>
    //                                         <i className="fa-solid fa-rotate-left"></i>
    //                                     </button>
    //                                 </td>
    //                             </tr>
    //                             <tr>
    //                                 <td>
    //                                     <label>Giới tính</label>
    //                                 </td>
    //                                 <td className="radio-gender">
    //                                     <label className="radio-gender">
    //                                         <input type="radio" id="male" name="gender" value="M" checked={formData.gender === 'M'} onChange={handleChange} />
    //                                         Male
    //                                     </label>
    //                                     <label>
    //                                         <input type="radio" id="female" name="gender" value="F" checked={formData.gender === 'F'} onChange={handleChange} />
    //                                         Female
    //                                     </label>
    //                                 </td>
    //                                 <td>
    //                                     <button type='button' onClick={() => handleResetField("gender")} className='button-refresh' title='Trở lại ban đầu'>
    //                                         <i className="fa-solid fa-rotate-left"></i>
    //                                     </button>
    //                                 </td>
    //                             </tr>
    //                             <tr>
    //                                 <td>
    //                                     <label>Chứng chỉ</label>
    //                                 </td>
    //                                 <td>
    //                                     {selectedImage && (
    //                                         <div>
    //                                             <input type="text" value={selectedImage} readOnly />
    //                                         </div>
    //                                     )}
    //                                     <input type="file" accept="image/*" onChange={handleImageChange} ref={ref} />
    //                                 </td>
    //                                 <td>
    //                                     <button type='button' onClick={() => handleResetFile()} className='button-refresh' title='Trở lại ban đầu'>
    //                                         <i className="fa-solid fa-rotate-left"></i>
    //                                     </button>
    //                                 </td>
    //                             </tr>
    //                             <tr>
    //                                 <td>
    //                                     <label htmlFor="address">Địa chỉ</label>
    //                                 </td>
    //                                 <td>
    //                                     <input type='text' id="address" name='address' value={formData.address} onChange={handleChange} />
    //                                 </td>
    //                                 <td>
    //                                     <button type='button' onClick={() => handleResetField("address")} className='button-refresh' title='Trở lại ban đầu'>
    //                                         <i className="fa-solid fa-rotate-left"></i>
    //                                     </button>
    //                                 </td>
    //                             </tr>
    //                         </tbody>
    //                     </table>
    //                 </div>
    //                 <div className='dialog-button-tray'>
    //                     <button type='submit' className='any-button button-submit'>Xác nhận</button>
    //                     <button type='button' className='any-button button-cancel' onClick={onClose}>Hủy bỏ</button>
    //                 </div>
    //             </form>
    //         )}
    //     </>
    // );
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
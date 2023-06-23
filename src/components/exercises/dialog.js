import React, { useState } from 'react';

export const Create = ({ onClose }) => {
    const [isCreated, setIsCreated] = useState(false);

    const handleCreate = () => {
        // Xử lý logic xóa dữ liệu
        // ...
        setIsCreated(true);
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
                                        <span>Tên bài tập</span>
                                    </td>
                                    <td>
                                        <input type='text' name='name' />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>Video Link</span>
                                    </td>
                                    <td>
                                        <input type='text' name='name' />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='dialog-field textarea-field'>
                            <label>Mô tả</label>
                            <textarea name='description' />
                        </div>
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

export const Edit = ({ data, onClose }) => {
    const [formData, setFormData] = useState(data);
    const [initialData] = useState(data);
    const [isEdited, setIsEdited] = useState(false);

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


    const handleResetField = (field) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: initialData[field],
        }));
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
                                        <span>Tên bài tập</span>
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
                                        <span>Video Link</span>
                                    </td>
                                    <td>
                                        <input type='text' name='videoId' value={formData.videoId} onChange={handleChange} />
                                    </td>
                                    <td>
                                        <button type='button' onClick={() => handleResetField("videoId")} className='button-refresh' title='Trở lại ban đầu'>
                                            <i className="fa-solid fa-rotate-left"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='dialog-field textarea-field'>
                            <label>
                                Mô tả
                                <button type='button' onClick={() => handleResetField("description")} className='button-refresh' title='Trở lại ban đầu'>
                                    <i className="fa-solid fa-rotate-left"></i>
                                </button>
                            </label>
                            <textarea name='description' value={formData.description} onChange={handleChange} />
                        </div>
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
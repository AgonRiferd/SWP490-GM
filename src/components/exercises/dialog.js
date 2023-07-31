import { format } from 'date-fns';
import React, { useState } from 'react';

function getVideoIdFromUrl(url) {
    const regex = /(?:\?v=|\/embed\/|\.be\/)([\w-]+)(?:&.*|$)/;
    const match = url.match(regex);
    return match ? match[1] : 'dQw4w9WgXcQ';
}

export const Create = ({ onClose }) => {
};

export const View = ({ data, onClose }) => {
    const [initialData] = useState(data);
    const videoId = getVideoIdFromUrl(data.video);
    return (
        <>
            <div className='dialog-fields flex-column'>
                <div className='iframe-video'>
                    <iframe
                        width="400"
                        height="200"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                        title="Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
                <table className='dialog-field'>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="name">Tên bài tập</label>
                            </td>
                            <td>
                                <span>{initialData.name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="name">Ngày tạo</label>
                            </td>
                            <td>
                                <span>{format(new Date(initialData.createDate), 'dd/MM/yyyy')}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="name">Miêu tả</label>
                            </td>
                            <td>
                                <span>{initialData.description}</span>
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
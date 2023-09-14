import { format } from 'date-fns';
import React, { useState } from 'react';
import Success from '../../utils/successAnimation';
import axiosInstance from '../../utils/axiosConfig';

function getVideoIdFromUrl(url) {
    const regex = /(?:\?v=|\/embed\/|\.be\/)([\w-]+)(?:&.*|$)/;
    const match = url.match(regex);
    return match ? match[1] : 'dQw4w9WgXcQ';
}

const Create = ({ onClose }) => {
};

const View = ({ data, onClose }) => {
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
                            <td width={100}>
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

const Edit = ({ data, onClose }) => {
};

const Delete = ({ data, isLoading, onLoading, onClose, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            onLoading(true);
            const response = await axiosInstance.delete(`/Excercises/DeleteExcercise/${data.id}`);
            if (response) {
                setIsSuccess(true);
            }
            onLoading(false);
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
                                <p>Tên bài tập : <span className='status-error'>{data.name}</span></p>
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

const ExerciseDialog = {Create, View, Edit, Delete};

export default ExerciseDialog;
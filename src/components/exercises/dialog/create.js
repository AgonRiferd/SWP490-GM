import React, { useState } from 'react';

const Create = ({ onClose }) => {
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

export default Create;
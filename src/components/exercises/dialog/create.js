import React from 'react';

const Create = ({ onClose }) => {
    return (
        <>
            <div className='ui-dialog ui-overlay'>
                <div className='dialog-container ui-corner-all'>
                    <div className='dialog-title-bar ui-corner-all dialog-header'>
                        <span className='dialog-title'>Tạo mới</span>
                        <button type='button' className='dialog-title-bar-close' onClick={onClose}>&times;</button>
                    </div>
                    <div className='dialog-content'>
                        <form>
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
                                <button type='submit' className='any-button'>Xác nhận</button>
                                <button type='button' className='any-button button-cancel' onClick={onClose}>Hủy bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Create;
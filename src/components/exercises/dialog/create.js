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
                            <label htmlFor='name'>Tên bài tập</label>
                            <input type='text' id='name' name='name'/>

                            <label htmlFor='description'>Mô tả</label>
                            <textarea id='description' name='description'/>
                        </div>
                        <div className='dialog-button-tray'>
                            <button type='submit' className='any-button'>Xác nhận</button>
                            <button type='button' className='any-button' onClick={onClose}>Hủy bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  );
};

export default Create;
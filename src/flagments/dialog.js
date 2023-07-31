import React from 'react';
import { useState } from 'react';

const Dialog = ({ mode, rowData, onClose , children}) => {
    const { title, component: Component, ...props } = mode;
    const [isLoading, setIsLoading] = useState(false);

    return (
        <BasicDialog title={title} onClose={onClose} isLoading={isLoading} >
            {children}
            <Component data={rowData} onClose={onClose} {...props} isLoading={isLoading} onLoading={setIsLoading} />
        </BasicDialog>
    );
};

const BasicDialog = ({ title, onClose, isLoading, children }) => {
    return (
        <div className='ui-dialog ui-overlay'>
            <div className={`dialog-container ui-corner-all ${isLoading ? 'on-load' : ''}`}>
                {isLoading && 
                    <div className='dialog-loading'>
                        <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                        <span>Đang xử lý yêu cầu.</span>
                        <span>Xin vui lòng chờ đợi.</span>
                    </div>
                }
                <div className='dialog-title-bar ui-corner-all dialog-header'>
                    <span className='dialog-title'>{title}</span>
                    {/* <button type='button' className='dialog-title-bar-close' onClick={onClose}>&times;</button> */}
                </div>
                <div className='dialog-content'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Dialog;
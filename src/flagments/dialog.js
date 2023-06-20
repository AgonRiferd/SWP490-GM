import React from 'react';

const BasicDialog = ({ title, onClose, children }) => {
    return (
        <div className='ui-dialog ui-overlay'>
            <div className='dialog-container ui-corner-all'>
                <div className='dialog-title-bar ui-corner-all dialog-header'>
                    <span className='dialog-title'>{title}</span>
                    <button type='button' className='dialog-title-bar-close' onClick={onClose}>&times;</button>
                </div>
                <div className='dialog-content'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default BasicDialog;
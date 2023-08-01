import React from 'react';

export const Create = ({ onClose }) => {
    return (
        <>
        </>
    );
};

export const View = ({ data, onClose }) => {
    return (
        <>
            <div className="dialog-button-tray">
                <button type="button" className="any-button button-cancel" onClick={onClose}>
                    Hủy bỏ
                </button>
            </div>
        </>
    );
};

export const Edit = ({ data, onClose }) => {
};

export const Delete = ({ data, onClose }) => {
};
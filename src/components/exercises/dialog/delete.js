import React, { useState } from 'react';

const Delete = ({ data, onClose }) => {
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

export default Delete;
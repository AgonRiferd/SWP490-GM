import { useEffect, useState } from "react";

const SUCCESS_COUNTDOWN = 5;

const Success = ({ onClose, children }) => {
    const [autoCloseCountdown, setAutoCloseCountdown] = useState(SUCCESS_COUNTDOWN + 1);
    const [autoCloseTimeout, setAutoCloseTimeout] = useState(null);

    useEffect(() => {
        if (autoCloseCountdown > 0) {
            const timeoutId = setTimeout(() => {
                setAutoCloseCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            setAutoCloseTimeout(timeoutId);
        } else if (autoCloseCountdown === 0) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoCloseCountdown]);

    const handleOnClose = () => {
        if (autoCloseTimeout) {
            clearTimeout(autoCloseTimeout);
        }
        onClose();
    }

    return (
        <>
            <div className="success-checkmark">
                <div className="check-icon">
                    <span className="icon-line line-tip"></span>
                    <span className="icon-line line-long"></span>
                    <div className="icon-circle"></div>
                    <div className="icon-fix"></div>
                </div>
            </div>
            {children}
            <div>
                {`Cửa sổ sẽ tự động đóng sau ${autoCloseCountdown === SUCCESS_COUNTDOWN + 1 ? autoCloseCountdown - 1 : autoCloseCountdown} giây`}
            </div>
            <div className='dialog-button-tray'>
                <button type='button' className='any-button button-cancel' onClick={handleOnClose}>Đóng</button>
            </div>
        </>
    )
}

export default Success;
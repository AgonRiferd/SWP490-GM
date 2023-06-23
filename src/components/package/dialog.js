import React, { useEffect, useMemo, useState } from 'react';
import DATA_TRAINER from '../pt/DATA.json'
import LazySelect from './DataSelect';

export const Create = ({ onClose }) => {
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

export const Edit = ({ data, onClose }) => {
    const [isEdited, setIsEdited] = useState(false);
    const trainer = useMemo(() => ({value: data.pt.id, label: data.pt.name}),[data.pt.id, data.pt.name]);
    const [trainerList, setTrainerList] = useState([]);

    const dataTrainer = useMemo(() => DATA_TRAINER, []);
    
    useEffect(() => {
        // Lấy dữ liệu từ API và gán vào options
        const fetchData = async () => {
          try {
            // const response = await fetch("YOUR_API_ENDPOINT");
            // const data = await response.json();
            
            const formattedOptions = dataTrainer.map(item => ({
              value: item.id,
              label: item.name
            }));
            setTrainerList(formattedOptions);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    }, [dataTrainer]);

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
                                        <span>Huấn luyện viên:</span>
                                    </td>
                                    <td>
                                        <LazySelect options={trainerList} defaultSearch={trainer}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
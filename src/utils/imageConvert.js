import React, { useEffect, useState } from 'react';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];

export const ImageInput = ({ setImageFile }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const isImageValid = (file) => {
        // Kiểm tra kích thước ảnh
        if (file.size > MAX_FILE_SIZE) {
            setErrorMessage('Kích thước ảnh vượt quá giới hạn cho phép (10 MB).');
            return false;
        }

        // Kiểm tra loại ảnh
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            setErrorMessage('Loại ảnh không được hỗ trợ. Chỉ chấp nhận định dạng JPEG và PNG.');
            return false;
        }

        return true;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (isImageValid(file)) {
                setImageFile(file);
            };
        }
    };

    return (
        <>
            <input type="file" id="file-input" onChange={handleImageChange} accept="image/jpeg, image/png" />
            <label id="file-input-label" className="any-button" htmlFor="file-input">
                Chọn ảnh
            </label>
            {errorMessage && <div>{errorMessage}</div>}
        </>
    );
}

export const ImageToBase64Converter = ({ setImage }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const isImageValid = (file) => {
        // Kiểm tra kích thước ảnh
        if (file.size > MAX_FILE_SIZE) {
            setErrorMessage('Kích thước ảnh vượt quá giới hạn cho phép (10 MB).');
            return false;
        }

        // Kiểm tra loại ảnh
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            setErrorMessage('Loại ảnh không được hỗ trợ. Chỉ chấp nhận định dạng JPEG và PNG.');
            return false;
        }

        return true;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (isImageValid(file)) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    const base64WithoutHeader = reader.result.split(',')[1];
                    setImage(base64WithoutHeader);
                };

                reader.readAsDataURL(file);
            }
        }
    };

    return (
        <>
            <input type="file" id="file-input" onChange={handleImageChange} accept="image/jpeg, image/png" />
            <label id="file-input-label" className="any-button" htmlFor="file-input">
                Chọn ảnh
            </label>
            {errorMessage && <div>{errorMessage}</div>}
        </>
    );
};

export const BytesToImageConvert = ({ imageByteData }) => {
    const [imageUrl, setImageUrl] = useState('');

    // Chuyển đổi byte thành Data URL khi byteData thay đổi
    useEffect(() => {
        const convertBytesToImageUrl = (bytes) => {
            const imageUrl = `data:image/jpeg;base64,${imageByteData}`;
            setImageUrl(imageUrl);
        };

        if (imageByteData) {
            convertBytesToImageUrl(imageByteData);
        }
    }, [imageByteData]);

    return (
        <div>
            {imageUrl ? <img src={imageUrl} alt="Hình ảnh" style={{ width: '100px' }} /> : <p>Không có ảnh</p>}
        </div>
    );
};
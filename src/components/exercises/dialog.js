import { format } from 'date-fns';
import React, { useState } from 'react';

function getVideoIdFromUrl(url) {
    const regex = /(?:\?v=|\/embed\/|\.be\/)([\w-]+)(?:&.*|$)/;
    const match = url.match(regex);
    return match ? match[1] : 'dQw4w9WgXcQ';
}

export const Create = ({ onClose }) => {
};

export const View = ({ data, onClose }) => {
    const [initialData] = useState(data);
    const videoId = getVideoIdFromUrl(data.video);
    return (
        <>
            <div className='dialog-fields flex-column'>
                <div className='iframe-video'>
                    <iframe
                        width="400"
                        height="200"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                        title="Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
                <table className='dialog-field'>
                    <tbody>
                        <tr>
                            <td width={100}>
                                <label htmlFor="name">Tên bài tập</label>
                            </td>
                            <td>
                                <span>{initialData.name}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="name">Ngày tạo</label>
                            </td>
                            <td>
                                <span>{format(new Date(initialData.createDate), 'dd/MM/yyyy')}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="name">Miêu tả</label>
                            </td>
                            <td>
                                <span>{initialData.description}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='dialog-button-tray'>
                <button type='button' className='any-button' onClick={onClose}>Đóng</button>
            </div>
        </>
    )
};

export const Edit = ({ data, onClose }) => {
};

export const Delete = ({ data, onClose }) => {
};
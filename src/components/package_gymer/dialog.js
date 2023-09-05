import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { format } from 'date-fns';
import { formatMoney } from '../../utils/convert';

export const Create = ({ onClose }) => {
    return (
        <>
        </>
    );
};

export const View = ({ data, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pgData, setPgData] = useState({
        packageGymerId: data.id,
        ptId: data.ptid,
        neId: data.neid,
        from: data.from,
        to: data.to,
        status: data.status
    });

    useEffect(() => {
        const fetchScheduleData = async () => {
            let ptName, neName, packageData = null;

            if (!isLoading)
                setIsLoading(true);
            try {
                let response = await axiosInstance.get(`/PackageGymers/GetPackageGymer/${pgData.packageGymerId}`);
                const { packageId } = response.data;
                const pId = packageId;
                if (pId) {
                    response = await axiosInstance.get(`/Packages/GetPackage/${pId}`);
                    const { data } = response.data;
                    packageData = data ? data : null;
                    if (data) {
                        if (data.hasPt && pgData.ptId) {
                            response = await axiosInstance.get(`/Accounts/GetAccountByID/${pgData.ptId}`);
                            const { data } = response;
                            ptName = data ? data.fullname : null;
                        }
                        if (data.hasNe && pgData.neId) {
                            response = await axiosInstance.get(`/Accounts/GetAccountByID/${pgData.neId}`);
                            const { data } = response;
                            neName = data ? data.fullname : null;
                        }
                    }
                }
            } catch (error) {
                console.error('Xảy ra lỗi khi lấy PackageGymer: ', error);
            } finally {
                setPgData((prevData) => ({
                    ...prevData,
                    ptName: ptName,
                    neName: neName,
                    packageData: packageData
                }))
                setIsLoading(false);
            }
        };

        fetchScheduleData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <>
            {isLoading ? (
                <>
                    <div className="loading-overlay">
                        <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                        <span>Đang tải dữ liệu...</span>
                    </div>
                </>
            ) : (
                <div className='dialog-fields pg-dialog'>
                    <table className='dialog-field'>
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <div className="sep-container">
                                        <div className="sep-text">Gói tập</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Tên gói</span>
                                </td>
                                <td>
                                    <span>{pgData.packageData.name}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Trạng thái</span>
                                </td>
                                <td>
                                    <span><b>{pgData.status}</b></span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Ngày bắt đầu</span>
                                </td>
                                <td>
                                    {format(new Date(pgData.from), 'dd/MM/yyyy')}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Ngày kết thúc</span>
                                </td>
                                <td>
                                    {pgData.to ?
                                        <span>
                                            {format(new Date(pgData.to), 'dd/MM/yyyy')}
                                        </span>
                                        :
                                        <span className='status-error'>
                                            Chưa xác định
                                        </span>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Tổng chi phí</span>
                                </td>
                                <td>
                                    <span>{formatMoney(pgData.packageData.price)} đ</span>
                                </td>
                            </tr>
                            {pgData.packageData.hasPt && (
                                <>
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="sep-container">
                                                <div className="sep-text">Huấn luyện viên</div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>Tổng buổi tập</span>
                                        </td>
                                        <td>
                                            <span>{pgData.packageData.numberOfsession}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>Tên nhân viên</span>
                                        </td>
                                        <td>
                                            {pgData.ptName ?
                                                <span>{pgData.ptName}</span>
                                                :
                                                <span className='status-error'>Chưa được chọn</span>
                                            }
                                        </td>
                                    </tr>
                                </>
                            )}
                            {pgData.packageData.hasNe && (
                                <>
                                    <tr>
                                        <td colSpan={2}>
                                            <div className="sep-container">
                                                <div className="sep-text">Bác Sỹ dinh dưỡng</div>
                                            </div>
                                        </td>
                                    </tr>
                                    {pgData.packageData.numberOfMonth &&
                                        <tr>
                                            <td>
                                                <span>Số tháng</span>
                                            </td>
                                            <td>
                                                <span>{pgData.packageData.numberOfMonth}</span>
                                            </td>
                                        </tr>
                                    }
                                    <tr>
                                        <td>
                                            <span>Tên nhân viên</span>
                                        </td>
                                        <td>
                                            {pgData.neName ?
                                                <span>{pgData.neName}</span>
                                                :
                                                <span className='status-error'>Chưa được chọn</span>
                                            }
                                        </td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="dialog-button-tray">
                <button type="button" className="any-button button-cancel" onClick={onClose}>
                    Đóng
                </button>
            </div>
        </>
    );
};

export const Edit = ({ data, onClose }) => {
};

export const Delete = ({ data, onClose }) => {
};
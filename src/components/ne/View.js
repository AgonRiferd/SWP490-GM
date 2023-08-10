import React, { useMemo, useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { format } from 'date-fns'
import FOOD_COLUMNS from "../foods/Columns";
import PACKAGE_GYMER_COLUMNS from "../package_gymer/Columns";
import { Delete, View } from "../foods/dialog";
import { AdvanceTable, LoadingTable } from "../../flagments/advance-table";
import { formatPhoneNumber } from "../../utils/convert";
import Dialog from "../../flagments/dialog";
import { ImageInput } from "../../utils/imageConvert";

const CustomView = ({ dataUser, isMainLoading }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [activeTabItem, setActiveTabItem] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!isLoading)
                    setIsLoading(true);
                // Fetch data from the API and update the state
                const response = await axiosInstance.get(`/Accounts/GetAccountByID/${dataUser.id}`);
                //Fetch thành công
                const { data } = response;
                setUser(data);
                setIsLoading(false); // Kết thúc quá trình fetch
            } catch (error) {
                if (error.response) {
                    // Lỗi được trả về từ phía server
                    setErrorMessage(error.response.data.message);
                } else {
                    // Lỗi không có phản hồi từ server
                    setErrorMessage(
                        <>
                            <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                            <span>Mã lỗi: {error.code}</span>
                        </>
                    );
                }
                setIsLoading(false); // Kết thúc quá trình fetch
            }
        };
        if (!isMainLoading) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUser, isMainLoading])

    const handleTabClick = (tabItem) => {
        activeTabItem !== tabItem && setActiveTabItem(tabItem);
    };

    const isTabActive = (tabItem) => {
        return activeTabItem === tabItem ? true : false;
    };

    return (
        <div className="data-view">
            <hr className="view-divider" />
            <div className="sep-container">
                <div className="sep-text">Thông tin</div>
            </div>
            {isLoading ? (
                <div className="loading-overlay">
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    <span>Đang tải dữ liệu...</span>
                </div>
            ) : (
                <>
                    <div className="profile-container">
                        {errorMessage ? (
                            <span className="status-error">{errorMessage}</span>
                        ) : (
                            <>
                                <div className="profile-avatar">
                                    {user.fullname.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <table className='dialog-field'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <label>Tên</label>
                                                </td>
                                                <td>
                                                    <span>{user.fullname}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Số Điện Thoại</label>
                                                </td>
                                                <td>
                                                    <span>{formatPhoneNumber(user.phoneNo)}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label>Trạng Thái</label>
                                                </td>
                                                <td>
                                                    {user.isDelete ?
                                                        <span className="status-lock">
                                                            Bị khóa
                                                        </span>
                                                        :
                                                        <span className="status-active">
                                                            Hoạt động
                                                        </span>
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="common-tabs">
                        <div className={`common-tab ${isTabActive(1) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(1)}>
                            <div className="common-tab-container">
                                <span className="common-tab-name">
                                    Tổng quan
                                </span>
                            </div>
                        </div>
                        <div className={`common-tab ${isTabActive(2) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(2)}>
                            <div className="common-tab-container">
                                <span className="common-tab-name">
                                    Thực phẩm
                                </span>
                            </div>
                        </div>
                        <div className={`common-tab ${isTabActive(3) ? 'common-tab-selected' : ''}`} onClick={() => handleTabClick(3)}>
                            <div className="common-tab-container">
                                <span className="common-tab-name">
                                    Công việc
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="common-plain">
                        {isTabActive(1) &&
                            <OtherProfile user={user} />
                        }
                        {isTabActive(2) &&
                            <FoodAndSuppliments userId={user.id} />
                        }
                        {isTabActive(3) &&
                            <WorkingPackages userId={user.id} />
                        }
                    </div>
                </>
            )}
        </div>
    )
}

const OtherProfile = ({ user }) => {
    const [qualification, setQualification] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const fetchData = async () => {
        try {
            if (!isLoading)
                setIsLoading(true);
            // Fetch data from the API and update the state
            const response = await axiosInstance.get(`/Qualifications/GetQualificationByAccountId/${user.id}`);
            //Fetch thành công
            const { data } = response;
            setQualification(data);
            setIsLoading(false); // Kết thúc quá trình fetch
        } catch (error) {
            if (error.response) {
                // Lỗi được trả về từ phía server
                setErrorMessage(error.response.data.message);
            } else {
                // Lỗi không có phản hồi từ server
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                        <span>Mã lỗi: {error.code}</span>
                    </>
                );
            }
            setIsLoading(false); // Kết thúc quá trình fetch
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const dialogMode = {
        title: "Chứng chỉ",
        icon: <i className="fa-solid fa-user-lock"></i>,
        component: CertificationEdit,
        userId: user.id,
        fetchData: fetchData
    };

    return (
        <>
            {isLoading ? (
                <div className="loading-overlay">
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                    <span>Đang tải dữ liệu...</span>
                </div>
            ) : errorMessage ? (
                <span className="status-error">{errorMessage}</span>
            ) : (
                <>
                    {isDialogOpen && (
                        <Dialog mode={dialogMode} rowData={qualification} onClose={handleCloseDialog} />
                    )}
                    <div className="profile-overview">
                        <div className="certificate">
                            <div className="sep-container">
                                <div className="sep-text">Chứng chỉ</div>
                            </div>
                            {qualification ?
                                <>
                                    <img src={qualification.certificate} alt="certificate" />
                                    <button className="any-button" onClick={handleOpenDialog}>Chỉnh sửa</button>
                                </> : <>
                                    <button className="any-button" onClick={handleOpenDialog}>Chỉnh sửa</button>
                                </>
                            }
                        </div>
                        <div className="strip">
                            <div className="sep-text"></div>
                        </div>
                        <div className="user-info">
                            <div className="sep-container">
                                <div className="sep-text">Thông tin</div>
                            </div>
                            <table className='dialog-field'>
                                <tbody>
                                    <tr>
                                        <td width={200}>
                                            <label>Giới Tính</label>
                                        </td>
                                        <td>
                                            <span>{user.gender === 'M' ? 'Nam' : user.gender === 'F' ? 'Nữ' : user.gender}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Ngày tham gia</label>
                                        </td>
                                        <td>
                                            <span>{format(new Date(user.createDate), 'dd/MM/yyyy')}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Số năm kinh nghiệm</label>
                                        </td>
                                        <td>
                                            {qualification ?
                                                <span>
                                                    {qualification.experience}
                                                </span> : <span className="status-error">
                                                    Chưa có
                                                </span>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Giới thiệu</label>
                                        </td>
                                        <td>
                                            <span>
                                                {qualification && qualification.descrition}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

const WorkingPackages = ({ userId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [packageData, setPackageData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const columns = useMemo(() => [
        {
            Header: 'Tên thành viên',
            accessor: 'gymerName'
        },
        ...PACKAGE_GYMER_COLUMNS
    ], []);
    const initialState =  useMemo (() => ({ 
        hiddenColumns: ['name', 'status'],
        sortBy: [
            {
                id: "from",
                desc: true
            }
        ]
    }), []);

    useEffect(() => {
        const fetchData = async () => {
            if (!isLoading) setIsLoading(true);
            try {
                const response = await axiosInstance.get('/PackageGymers/GetGymerPackageActiveByNE', {
                    params: {
                        NEID: userId
                    }
                });
                const { data } = response.data;
                if (data)
                    setPackageData(data);
            } catch (error) {
                if (error.response) {
                    // Lỗi được trả về từ phía server
                    setErrorMessage(error.response.data.message);
                } else {
                    // Lỗi không có phản hồi từ server
                    setErrorMessage(
                        <>
                            <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                            <span>Mã lỗi: {error.code}</span>
                        </>
                    );
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return (
        <>
            {isLoading ? (
                <LoadingTable />
            ) : errorMessage ? (
                <span className="status-error">{errorMessage}</span>
            ) : (
                <>
                    <h1>Danh sách công việc đang hoạt động</h1>
                    <div className="list-content">
                        <AdvanceTable data={packageData} columns={columns} initialState={initialState} />
                    </div>
                </>
            )}
        </>
    )
}

const FoodAndSuppliments = ({ userId }) => {
    const columns = useMemo(() => FOOD_COLUMNS, []);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const initialState = useMemo(() => ({
        sortBy: [
            {
                id: "name",
                desc: false
            }
        ]
    }), []);

    const fetchData = async (UID) => {
        try {
            setIsLoading(true);
            // Fetch data from the API and update the state
            const response = await axiosInstance.get(`/FoodAndSuppliments/GetFoodAndSupplimentsBYNE/${UID}`);
            //Fetch thành công
            const { data } = response.data;
            if (data)
                setData(data);
        } catch (error) {
            if (error.response) {
                // Lỗi được trả về từ phía server
                setErrorMessage(
                    <>
                        <span>Mã lỗi: {error.response.status}</span>
                    </>
                );
            } else {
                // Lỗi không có phản hồi từ server
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                        <span>Mã lỗi: {error.code}</span>
                    </>
                );
            }
        } finally {
            setIsLoading(false); // Kết thúc quá trình fetch
        }
    };

    useEffect(() => {
        fetchData(userId);
    }, [userId]);

    const dialogs = useMemo(() => ({
        dialogView: {
            title: "Thông tin",
            icon: <i className="fa-solid fa-eye"></i>,
            component: View
        },
        dialogDelete: {
            title: "Loại bỏ",
            icon: <i className="fa-solid fa-trash"></i>,
            component: Delete,
            fetchData: fetchData
        }
    }), []);

    return (
        <>
            {isLoading ? (
                <LoadingTable />
            ) : (
                <>
                    {errorMessage &&
                        <span className="status-error">{errorMessage}</span>
                    }
                    <div className="list-content">
                        <AdvanceTable data={data} columns={columns} initialState={initialState} dialogs={dialogs} />
                    </div>
                </>
            )}
        </>
    )
}

const CertificationEdit = ({ data, onClose, isLoading, onLoading, ...props }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const id = data ? data.expertId : props.userId;
    const [imageUrl, setImageUrl] = useState(data ? data.certificate : "");
    const [certData, setCertData] = useState({
        experience: data ? data.experience : 0,
        expertId: id,
        certificate: imageUrl,
        descrition: data ? data.descrition : ""
    });

    const handleExpChange = (e) => {
        const { name, value } = e.target;

        setCertData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    useEffect(() => {
        setCertData((prevData) => ({
            ...prevData,
            certificate: imageUrl
        }));
    }, [imageUrl])

    const handleCreateCertificate = async (e) => {
        e.preventDefault();

        if (!certData.certificate || certData.certificate.length === 0) {
            alert('Ảnh chứng chỉ hiện chưa có!');
            return;
        }
        try {
            onLoading(true);
            const response = data ? await axiosInstance.put('/Qualifications/UpdateQualification', certData)
                : await axiosInstance.post('/Qualifications/CreateQualification', certData);
            if (response.status === 200 || response.status === 201 || response.status === 204) {
                alert('Cập nhật thành công');
                props.fetchData();
                onClose();
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            if (error.response) {
                setErrorMessage(
                    <>
                        <p>Cập nhật thành công</p>
                        <p>Mã lỗi: {error.response.status}</p>
                    </>
                );
            } else {
                setErrorMessage(
                    <>
                        <p>Đã xảy ra lỗi. Vui lòng thử lại sau.</p>
                        <p>Mã lỗi: {error.code}</p>
                    </>
                );
            }
            onLoading(false);
        }
    }

    const handleKeyDown = (e) => {
        const { key } = e;

        if (!/[0-9]/.test(key) && key !== "Backspace") {
            e.preventDefault();
        }
    };

    return (
        <>
            {id ?
                <>
                    {errorMessage && <span className="status-error">{errorMessage}</span>}
                    <form onSubmit={handleCreateCertificate}>
                        <div className='dialog-fields'>
                            <table className='dialog-field'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label>Chứng Chỉ</label>
                                            <label className='status-lock'>*</label>
                                        </td>
                                        <td className="normal-file-input">
                                            <ImageInput userId={id} setImageUrl={setImageUrl} imageUrl={imageUrl} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="experience">Số năm kinh nghiệm</label>
                                            <label className='status-lock'>*</label>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="experience"
                                                name="experience"
                                                pattern="\d+"
                                                value={certData.experience}
                                                onChange={handleExpChange}
                                                onKeyDown={handleKeyDown}
                                                required
                                                placeholder="0"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='dialog-button-tray'>
                            <button type='submit' className='any-button button-submit' disabled={isLoading || !imageUrl}>Xác nhận</button>
                            <button type='button' className='any-button button-cancel' onClick={onClose}>Bỏ qua</button>
                        </div>
                    </form>
                </> : <>
                    <span className="status-error">ID người dùng không xác định</span>
                    <div className='dialog-button-tray'>
                        <button type='button' className='any-button button-cancel' onClick={onClose}>Đóng</button>
                    </div>
                </>
            }
        </>
    );
};

export default CustomView;